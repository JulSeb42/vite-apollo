/*=============================================== Auth context queries ===============================================*/

import { GraphQLError } from "graphql"

import { UserModel } from "../../../models"
import type { UserType } from "../../../types"

export const AuthContextQueries = {
    loggedInUser: async ({ token }: UserType) =>
        await UserModel.findOne({ token })
            .then(foundUser => foundUser)
            .catch(
                () =>
                    new GraphQLError("User not found", {
                        extensions: { code: "USER_NOT_FOUND" },
                    })
            ),
}
