import { GraphQLServer } from 'graphql-yoga'

// Type Definitions
const typeDefs = `
    type Query {
        hello: String!,
        location: String!,
        bio: String!
    }
`

//  Resolvers
const resolvers = {
	Query: {
		hello: () => 'SOrry this is Hello',
		location: () => ' No 522(A) South Dagon 19 ward Ygn',
		bio: () => ' My Bio is Not Biology '
	}
}

// GraphQl Server Start
const server = new GraphQLServer({
	typeDefs,
	resolvers
})

server.start(() => console.log(`Server Start Port 4000`))
