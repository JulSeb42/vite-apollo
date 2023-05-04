/*=============================================== User query ===============================================*/

export const QueryUser = `#graphql
    type Query {
        users: [User]
        user(_id: ID!): User
        loggedInUser(token: String!): User!
    }
`
