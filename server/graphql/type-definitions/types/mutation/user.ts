/*=============================================== User mutation ===============================================*/

export const MutationUser = `#graphql
    type Mutation {
        editUser(editUserInput: EditUserInput): User!
        editPassword(editPasswordInput: EditPasswordInput): User!
        deleteUser(_id: ID!): String
    }
`
