/*=============================================== User mutations ===============================================*/

import { GraphQLError } from "graphql"

export const UserMutation = {
    editUser: async (_: null, { editUserInput }: any, { editUser }: any) =>
        await editUser(editUserInput)
            .then((res: any) => res)
            .catch((err: GraphQLError) => err),

    editPassword: async (
        _: null,
        { editPasswordInput }: any,
        { editPassword }: any
    ) =>
        await editPassword(editPasswordInput)
            .then((res: any) => res)
            .catch((err: GraphQLError) => err),

    deleteUser: async (_: null, { _id }: any, { deleteUser }: any) =>
        await deleteUser({ _id })
            .then((res: any) => res)
            .catch((err: GraphQLError) => err),
}
