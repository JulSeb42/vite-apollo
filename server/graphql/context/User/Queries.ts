/*=============================================== User context queries ===============================================*/

import { GraphQLError } from "graphql"

import { UserModel } from "../../../models"
import type { UserType } from "../../../types"

export const UserContextQueries = {
    users: async () =>
        await UserModel.find()
            .then(foundUsers => foundUsers)
            .catch(
                () =>
                    new GraphQLError("Users not found", {
                        extensions: { code: "USERS_NOT_FOUND" },
                    })
            ),

    user: async ({ _id }: UserType) =>
        await UserModel.findById(_id)
            .then(foundUser => foundUser)
            .catch(
                () =>
                    new GraphQLError("User not found", {
                        extensions: { code: "USER_NOT_FOUND" },
                    })
            ),
}
