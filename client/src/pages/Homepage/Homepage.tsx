/*=============================================== Homepage ===============================================*/

import { useContext } from "react"
import { useQuery, gql } from "@apollo/client"
import { Text, Skeleton } from "tsx-library-julseb"

import { AuthContext } from "context"
import type { AuthContextType } from "context/types"

import { Page } from "components"

export const Homepage = () => {
    const { isLoggedIn, user } = useContext(AuthContext) as AuthContextType

    const { data, error, loading } = useQuery(GET_USER, {
        variables: { _id: user?._id },
        skip: !user,
    })

    return (
        <Page title="Homepage">
            <Text tag="h1">Hello World!</Text>

            {isLoggedIn &&
                (loading ? (
                    <Skeleton
                        height={24}
                        borderRadius="s"
                        width="40%"
                        animation="shine"
                    />
                ) : error ? (
                    <Text>Error while fetching user: {error?.message}</Text>
                ) : (
                    <Text>
                        Hello {data?.user?.fullName}, you are logged in!
                    </Text>
                ))}
        </Page>
    )
}

const GET_USER = gql`
    query GetUser($_id: ID!) {
        user(_id: $_id) {
            _id
            fullName
        }
    }
`
