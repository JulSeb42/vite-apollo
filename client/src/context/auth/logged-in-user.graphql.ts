/*=============================================== Get user by token ===============================================*/

import { gql } from "@apollo/client"

export const LOGGED_IN_USER = gql`
    query LoggedInUser($token: String!) {
        loggedInUser(token: $token) {
            _id
            token
            verified
            verifyToken
        }
    }
`
