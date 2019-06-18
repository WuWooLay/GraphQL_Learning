import { GraphQLServer } from 'graphql-yoga'
import uuidv4 from 'uuid/v4'

import usr from '../data/users.json'
import pst from '../data/posts.json'
import cmt from '../data/comments.json'

import Fs from 'fs'

let Users = usr
let Posts = pst
let Comments = cmt

const typeDefs = `
	type Query {
		me: User
		users: [User!]!
		posts: [Post!]!
		comments: [Comment!]!
	}
	type Mutation {
		createUser(data: CreateUserInput): User!
		deleteUser(id: ID!): User!
		createPost(data: CreatePostInput): Post!
		deletePost(id: ID!): Post!
		createComment(data: CreateCommentInput): Comment!
		deleteComment(id: ID!): Comment!
	}

	input CreateUserInput {
		name: String!
		email: String!
		age: Int
	}

	input CreatePostInput {
		author: ID!
		title: String!
		body: String
		published: Boolean!
	}

	input CreateCommentInput {
		author: ID!
		post: ID!
		text: String!
	}

	type User {
		id: ID!
		name: String!
		email: String!
		age: Int
		posts: [Post!]!
		comments: [Comment!]!
	}
	type Post {
		id: ID!
		title: String!
		body: String!
		published: Boolean!
		author: User!
		comments: [Comment!]!
	}
	type Comment {
		id: ID!
		text: String!
		author: User!
		post: Post!
	}
`

const resolvers = {
	Query: {
		me: () => {
			return Users.find(user => user.id === '1')
		},
		users: () => Users,
		posts: () => Posts,
		comments: () => Comments
	},
	Mutation: {
		createUser: (parent, args, ctx, info) => {
			const emailExist = Users.some(user => user.email === args.data.email)

			if (emailExist) {
				throw new Error('Email Exists')
			}

			const user = {
				id: uuidv4(),
				...args.data
			}

			Users.push(user)

			// Fs.writeFile(`${__dirname}/../data/users.json`, JSON.stringify(Users, null, '\t'), err => {
			// 	if (err) {
			// 		console.log(err)
			// 	}
			// })

			return user
		},
		deleteUser(parent, args, ctx, info) {
			const userIndex = Users.findIndex(user => user.id === args.id)

			if (userIndex === -1) {
				throw new Error('User Not Found Bro!!')
			}

			Posts = Posts.filter(post => {
				const match = post.author === args.id
				if (match) {
					Comments = Comments.filter(comment => comment.post !== post.id)
				}

				return !match
			})

			Comments = Comments.filter(comment => comment.author !== args.id)

			const delUser = Users.splice(userIndex, 1)

			return delUser[0]
		},

		createPost: (parent, args, ctx, info) => {
			// if Author Exists
			const userExist = Users.some(user => user.id === args.data.author)
			if (!userExist) throw new Error(' User Not Exist ')

			const post = {
				id: uuidv4(),
				...args.data
			}

			Posts.push(post)

			// Fs.writeFile(`${__dirname}/../data/posts.json`, JSON.stringify(Posts, null, '\t'), err => {
			// 	if (err) console.log(err)
			// })

			return post
		},
		deletePost(parent, args, ctx, info) {
			const postIndex = Posts.findIndex(post => post.id === args.id)

			// console.log('Get id => ', args.id)
			if (postIndex === -1) {
				throw new Error(' Post Not Found !! ')
			}

			Comments = Comments.filter(comment => comment.post !== args.id)

			const delPost = Posts.splice(postIndex, 1)

			return delPost[0]
		},

		createComment: (parent, args, ctx, info) => {
			const userExist = Users.some(user => user.id === args.data.author)
			if (!userExist) throw new Error('User Not Found')

			// Shortand for Post
			// const postExist = Posts.some(post => post.id === args.data.post && post.published )

			const postExist = Posts.some(post => post.id === args.data.post)
			if (!postExist) throw new Error('Post Not Found')

			const { published } = Posts.find(post => post.id === args.data.post)
			if (!published) throw new Error('Post is not published')

			const comment = {
				id: uuidv4(),
				...args.data
			}

			Comments.push(comment)

			// Fs.writeFile(`${__dirname}/../data/comments.json`, JSON.stringify(Comments, null, '\t'), err => {
			// 	if (err) console.log(err)
			// })

			return comment
		},
		deleteComment(parent, args, ctx, info) {
			const commentIndex = Comments.findIndex(comment => comment.id === args.id)

			if (-1 === commentIndex) {
				throw new Error('Comment Not Found!!')
			}

			const delComment = Comments.splice(commentIndex, 1)

			return delComment[0]
		}
	},
	User: {
		posts: (parent, args, ctx, info) => Posts.filter(post => post.author === parent.id),
		comments: (parent, args, ctx, info) => Comments.filter(comment => comment.author === parent.id)
	},
	Post: {
		author: (parent, args, ctx, info) => Users.find(user => user.id === parent.author),
		comments: (parent, args, ctx, info) => Comments.filter(comment => comment.post === parent.id)
	},
	Comment: {
		author: (parent, args, ctx, info) => Users.find(user => user.id === parent.author),
		post: (parent, args, ctx, info) => Posts.find(post => post.id === parent.post)
	}
}

const server = new GraphQLServer({
	typeDefs,
	resolvers
})

server.start(e => console.log(`Server Start 4000 `))
