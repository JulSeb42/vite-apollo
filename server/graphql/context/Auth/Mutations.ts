/*=============================================== Auth context mutations ===============================================*/

import { GraphQLError } from "graphql"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import {
    getRandomString,
    emailRegex,
    passwordRegex,
    getRandomAvatar,
} from "ts-utils-julseb"

import { UserModel } from "../../../models"
import type { UserType } from "../../../types"
import { SALT_ROUNDS, TOKEN_SECRET, sendMail, JWT_CONFIG } from "../../../utils"

export const AuthContextMutations = {
    signup: async ({ fullName, email, password }: UserType) => {
        const foundUser = await UserModel.findOne({ email })
        const verifyToken = getRandomString(20)

        if (!emailRegex.test(email)) {
            throw new GraphQLError("Email is not valid.", {
                extensions: {
                    code: "EMAIL_NOT_VALID",
                },
            })
        }

        if (!passwordRegex.test(password)) {
            throw new GraphQLError(
                "Password needs to have at least 6 chars and must contain at least one number, one lowercase and one uppercase letter.",
                {
                    extensions: {
                        code: "PASSWORD_NOT_VALID",
                    },
                }
            )
        }

        if (!foundUser) {
            const salt = bcrypt.genSaltSync(SALT_ROUNDS)
            const hashedPassword = bcrypt.hashSync(password, salt)

            const newUser: any = new UserModel({
                fullName,
                email,
                password: hashedPassword,
                verified: false,
                verifyToken,
                avatar: getRandomAvatar("other"),
            })

            // @ts-expect-error
            const token = jwt.sign(newUser._doc, TOKEN_SECRET, JWT_CONFIG)

            newUser.token = token

            const res = await newUser.save().then((res: UserType) => {
                sendMail(
                    email,
                    "Verify your account on our app",
                    `Hello,<br /><br />Thank you for creating your account on our app! <a href="${process.env.ORIGIN}/verify/${verifyToken}/${res._id}">Click here to verify your account</a>.`
                )

                return res
            })

            return res
        } else {
            throw new GraphQLError(
                `A user already exists with the email ${email}`,
                {
                    extensions: {
                        code: "USER_ALREADY_EXISTS",
                    },
                }
            )
        }
    },

    login: async ({ email, password }: UserType) => {
        if (!email) {
            throw new GraphQLError("Email is required", {
                extensions: {
                    code: "EMAIL_REQUIRED",
                },
            })
        }

        if (!password) {
            throw new GraphQLError("Password is required", {
                extensions: {
                    code: "PASSWORD_REQUIRED",
                },
            })
        }

        const foundUser: any = await UserModel.findOne({ email })

        if (foundUser) {
            if (await bcrypt.compare(password, foundUser.password)) {
                // @ts-expect-error
                const token = jwt.sign(foundUser._doc, TOKEN_SECRET, JWT_CONFIG)

                foundUser.token = token

                await UserModel.findByIdAndUpdate(
                    foundUser._id,
                    { token: token },
                    { new: true }
                )

                return foundUser._doc
            } else {
                throw new GraphQLError("Incorrect password", {
                    extensions: {
                        code: "INCORRECT_PASSWORD",
                    },
                })
            }
        } else {
            throw new GraphQLError("This user does not exist.", {
                extensions: {
                    code: "USER_DOES_NOT_EXIST",
                },
            })
        }
    },

    verifyUser: async ({ _id, verifyToken }: UserType) => {
        const foundUser = await UserModel.findById(_id)

        if (foundUser) {
            if (foundUser.verifyToken === verifyToken) {
                return UserModel.findByIdAndUpdate(
                    _id,
                    { verified: true },
                    { new: true }
                )
            } else {
                throw new GraphQLError(
                    "An error occured with your verify token.",
                    {
                        extensions: {
                            code: "TOKEN_NOT_MATCHING",
                        },
                    }
                )
            }
        } else {
            throw new GraphQLError("User not found.", {
                extensions: {
                    code: "USER_NOT_FOUND",
                },
            })
        }
    },

    forgotPassword: async ({ email }: UserType) => {
        const foundUser = await UserModel.findOne({ email })

        if (foundUser) {
            const resetToken = getRandomString(20)

            const res = await UserModel.findOneAndUpdate(
                { email },
                { resetToken: resetToken },
                { new: true }
            ).then((res: any) => {
                sendMail(
                    email,
                    "Reset your password on our app",
                    `Hello,<br /><br />To reset your password, <a href="${process.env.ORIGIN}/reset-password/${resetToken}/${res._id}">click here</a>.`
                )

                return res
            })

            return res
        } else {
            throw new GraphQLError("User not found.", {
                extensions: {
                    code: "USER_NOT_FOUND",
                },
            })
        }
    },

    resetPassword: async ({ _id, resetToken, password }: UserType) => {
        const foundUser = await UserModel.findById(_id)

        if (foundUser) {
            if (foundUser.resetToken === resetToken) {
                const updatedUser: any = {}

                if (password) {
                    if (!passwordRegex.test(password)) {
                        throw new GraphQLError(
                            "Password needs to have at least 6 chars and must contain at least one number, one lowercase and one uppercase letter.",
                            {
                                extensions: {
                                    code: "PASSWORD_NOT_VALID",
                                },
                            }
                        )
                    }

                    const salt = bcrypt.genSaltSync(SALT_ROUNDS)
                    const hashedPassword = bcrypt.hashSync(password, salt)

                    updatedUser.password = hashedPassword

                    return UserModel.findByIdAndUpdate(_id, updatedUser, {
                        new: true,
                    })
                } else {
                    throw new GraphQLError("Password is required", {
                        extensions: {
                            code: "PASSWORD_REQUIRED",
                        },
                    })
                }
            } else {
                throw new GraphQLError("Wrong reset token.", {
                    extensions: {
                        code: "WRONG_TOKEN",
                    },
                })
            }
        } else {
            throw new GraphQLError("User not found.", {
                extensions: {
                    code: "USER_NOT_FOUND",
                },
            })
        }
    },
}
