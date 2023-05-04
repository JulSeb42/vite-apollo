/*=============================================== Server ===============================================*/

import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from "@apollo/server/standalone"

import { typeDefs, context, resolvers } from "./graphql"

import "./routes/uploader"

import "./db"

import { PORT } from "./utils/consts"

const initServer = async () => {
    const server = new ApolloServer({
        typeDefs,
        resolvers,
    })

    const { url } = await startStandaloneServer(server, {
        context: async () => context,
        listen: { port: PORT },
    })

    console.log(`🚀  Server ready at: ${url}`)
}

initServer()
