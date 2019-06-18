import { GraphQLServer } from 'graphql-yoga'

// User Data
const users = [
	{
		id: 1,
		name: 'Lwin Moe Paing',
		age: 23
	},
	{
		id: 2,
		name: 'Htet N Linn',
		age: 23
	},
	{
		id: 3,
		name: 'Min Arkar Soe',
		age: 23
	}
]

// Post Data
const posts = [
	{
		id: 11011,
		title: 'Title 1',
		published: true,
		body: 'Title 1',
		author: 2
	},
	{
		id: 11012,
		title: 'Title 2',
		published: true,
		body: 'Title 2',
		author: 1
	},
	{
		id: 11013,
		title: 'Title 3',
		published: false,
		body: 'Title 3',
		author: 3
	}
]

const comments = [
	{
		id: 1,
		text: 'textField1',
		author: 1,
		post: 11011
	},
	{
		id: 2,
		text: 'textField2',
		author: 2,
		post: 11011
	},
	{
		id: 3,
		text: 'textField3',
		author: 1,
		post: 11012
	},
	{
		id: 4,
		text: 'textField4',
		author: 3,
		post: 11011
	}
]

// 5 Scalar ,,, String , Float , Int , ID, Boolean
// Type Definitions
const typeDefs = `
    type Query {
        me: User!
				post(id: String): Post
				users(query: String): [User!]!
				posts(query: String): [Post!]!
				comments: [Comment!]!
    }

    type User {
        id: ID!
        name: String!
        age: Int!
				isStudent: Boolean
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
// Defined Resolvers
const resolvers = {
	Query: {
		me: () => users.find(user => user.id === 1),
		post: (parent, args, ctx, info) => posts.find(post => post.id === args.id) || null,
		users: (parent, args, ctx, info) =>
			args.query ? users.filter(user => user.name.toLowerCase().includes(args.query.toLowerCase())) : users,
		posts: (parent, args, ctx, info) =>
			args.query ? posts.filter(post => post.body.toLowerCase().includes(args.query.toLowerCase())) : posts,
		comments: (parent, args, ctx, info) => comments
	},
	Post: {
		author: (parent, args, ctx, info) => {
			return users.find(user => user.id === parent.author)
		},
		comments: (parent, args, ctx, info) => {
			return comments.filter(comment => comment.post === parent.id)
		}
	},
	User: {
		posts: (parent, args, ctx, info) => {
			return posts.filter(post => post.author === parent.id)
		},
		comments: (parent, args, ctx, info) => {
			return comments.filter(comment => comment.author === parent.id)
		}
	},
	Comment: {
		author: (parent, args, ctx, info) => {
			return users.find(user => user.id === parent.author)
		},
		post: (parent, args, ctx, info) => {
			console.log('parent', parent)
			return posts.find(post => post.id === parent.post)
		}
	}
}

// Server Start
const server = new GraphQLServer({
	typeDefs,
	resolvers
})

server.start(e => console.log(`Server Start At 4000 `))
