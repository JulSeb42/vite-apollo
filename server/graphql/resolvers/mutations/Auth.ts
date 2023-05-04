/*=============================================== Auth mutations ===============================================*/

import { GraphQLError } from "graphql"

export const AuthMutation = {
    signup: (_: null, { signupInput }: any, { signup }: any) =>
        signup(signupInput)
            .then((res: any) => res)
            .catch((err: GraphQLError) => err),

    login: async (_: null, { loginInput }: any, { login }: any) =>
        await login(loginInput)
            .then((res: any) => res)
            .catch((err: GraphQLError) => err),

    verifyUser: async (_: null, { verifyInput }: any, { verifyUser }: any) =>
        await verifyUser(verifyInput)
            .then((res: any) => res)
            .catch((err: GraphQLError) => err),

    forgotPassword: async (
        _: null,
        { forgotInput }: any,
        { forgotPassword }: any
    ) =>
        await forgotPassword(forgotInput)
            .then((res: any) => res)
            .catch((err: GraphQLError) => err),

    resetPassword: async (
        _: null,
        { resetInput }: any,
        { resetPassword }: any
    ) =>
        await resetPassword(resetInput)
            .then((res: any) => res)
            .catch((err: GraphQLError) => err),
}
