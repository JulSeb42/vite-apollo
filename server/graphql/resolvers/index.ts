/*=============================================== Resolvers ===============================================*/

import { Query } from "./queries"
import { AuthMutation, UserMutation } from "./mutations"

export const resolvers = {
    // Queries
    Query,

    // Mutations
    Mutation: {
        ...AuthMutation,
        ...UserMutation,
    },
}
