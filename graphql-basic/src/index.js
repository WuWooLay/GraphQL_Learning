import { GraphQLServer } from 'graphql-yoga'

// 5 Scalar ,,, String , Float , Int , ID, Boolean

// Type Definitions
const typeDefs = `
    type Query {
        title: String!,
        price: Float!,
        releaseYear: Int,
        rating: Float,
        inStock: Boolean!
    }
`

// Defined Resolvers
const resolvers = {
	Query: {
		title: () => 'Punch Up Kicks',
		price: () => 1.4,
		releaseYear: () => 2008,
		rating: () => 4.3,
		inStock: () => true
	}
}

const server = new GraphQLServer({
	typeDefs,
	resolvers
})

server.start(e => console.log(`Server Start At 4000 `))
