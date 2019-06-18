import { GraphQLServer } from 'graphql-yoga'
import Users from './data/users.json'
import Posts from './data/posts.json'
import Comments from './data/comments.json'

const typeDefs = `
	type Query {
		me: User
		users: [User!]!
		posts: [Post!]!
		comments: [Comment!]!
	}
	type User {
		id: ID!
		name: String!
		age: Int
		posts: [Post!]!
		comments: [Comment!]!
	}
	type Post {
		id: ID!
		title: String!
		body: String!
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
		me: () => Users.find(user => user.id === 1),
		users: () => Users,
		posts: () => Posts,
		comments: () => Comments
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
