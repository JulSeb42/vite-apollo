/*=============================================== User context mutations ===============================================*/

import { GraphQLError } from "graphql"
import bcrypt from "bcryptjs"

import { passwordRegex } from "ts-utils-julseb"

import { UserModel } from "../../../models"
import type { UserType } from "../../../types"

import { SALT_ROUNDS } from "../../../utils"

export const UserContextMutations = {
    editUser: async ({ _id, fullName, avatar }: UserType) => {
        if (!fullName) {
            throw new GraphQLError("Your full name is required", {
                extensions: { code: "FULL_NAME_REQUIRED" },
            })
        }

        return await UserModel.findByIdAndUpdate(
            _id,
            { fullName, avatar },
            {
                new: true,
            }
        )
    },

    editPassword: async ({
        _id,
        oldPassword,
        newPassword,
    }: EditPasswordType) => {
        const user: UserType | null = await UserModel.findById(_id)

        if (user) {
            if (await bcrypt.compare(oldPassword, user.password)) {
                if (passwordRegex.test(newPassword)) {
                    const salt = bcrypt.genSaltSync(SALT_ROUNDS)
                    const hashedPassword = bcrypt.hashSync(newPassword, salt)

                    return await UserModel.findByIdAndUpdate(
                        _id,
                        { password: hashedPassword },
                        {
                            new: true,
                        }
                    )
                } else {
                    throw new GraphQLError(
                        "Password needs to have at least 6 chars and must contain at least one number, one lowercase and one uppercase letter.",
                        { extensions: { code: "PASSWORD_NOT_VALID" } }
                    )
                }
            } else {
                throw new GraphQLError("The old password does not match", {
                    extensions: { code: "PASSWORD_NOT_MATCHING" },
                })
            }
        } else {
            throw new GraphQLError("User not found", {
                extensions: { code: "USER_NOT_FOUND" },
            })
        }
    },

    deleteUser: async ({ _id }: UserType) => {
        if (!_id) {
            throw new GraphQLError("ID is missing", {
                extensions: { code: "ID_MISSING" },
            })
        }

        await UserModel.findByIdAndDelete(_id)
        return `User ${_id} was deleted successfully`
    },
}

type EditPasswordType = {
    _id: string
    oldPassword: string
    newPassword: string
}
