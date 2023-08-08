/*=============================================== Apollo client ===============================================*/

import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client"
import { setContext } from "@apollo/client/link/context"

const GRAPHQL_URI = "/graphql"

const authLink = setContext((_, { headers }) => {
    return {
        headers: {
            ...headers,
            authorization: localStorage.getItem("authToken") || "",
        },
        fetchOptions: {
            mode: "no-cors",
        },
    }
})

export const client = new ApolloClient({
    uri: GRAPHQL_URI,
    link: new HttpLink({
        ...authLink,
        uri: GRAPHQL_URI,
    }),
    cache: new InMemoryCache(),
})
