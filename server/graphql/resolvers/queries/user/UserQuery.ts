/*=============================================== User query ===============================================*/

import { GraphQLError } from "graphql"

import type { UserType } from "../../../../types"

export const UserQuery = {
    loggedInUser: async (_: null, { token }: any, { loggedInUser }: any) =>
        await loggedInUser({ token })
            .then((foundUser: UserType) => foundUser)
            .catch(
                () =>
                    new GraphQLError("User not found", {
                        extensions: { code: "USER_NOT_FOUND" },
                    })
            ),

    users: async (_: null, __: null, { users }: any) =>
        await users()
            .then((foundUsers: UserType[]) => foundUsers)
            .catch(
                () =>
                    new GraphQLError("Users not found", {
                        extensions: { code: "USERS_NOT_FOUND" },
                    })
            ),

    user: async (_: null, { _id }: any, { user }: any) =>
        await user({ _id })
            .then((foundUser: UserType) => foundUser)
            .catch(
                () =>
                    new GraphQLError("User not found", {
                        extensions: { code: "USER_NOT_FOUND" },
                    })
            ),
}
