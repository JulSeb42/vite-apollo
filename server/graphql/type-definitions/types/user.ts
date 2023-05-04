/*=============================================== User ===============================================*/

export const User = `#graphql
    type User {
        _id: ID!
        fullName: String
        email: String
        password: String
        verified: Boolean
        verifyToken: String
        resetToken: String
        token: String
        avatar: String
    }
`
