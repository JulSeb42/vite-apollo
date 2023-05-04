/*=============================================== ContactUser ===============================================*/

import { useQuery, gql } from "@apollo/client"
import { Text, Skeleton, getFirstName } from "tsx-library-julseb"

import type { UserType } from "types"

export const ContactUser = ({ _id }: ContactUserProps) => {
    const { data, error, loading } = useQuery(GET_USER, {
        variables: {
            _id,
        },
    })
    const user: UserType = data?.user

    if (loading)
        return (
            <Skeleton
                width="40%"
                height={24}
                animation="shine"
                borderRadius="s"
            />
        )

    if (error)
        return (
            <Text>
                Error while fetching user's contact information:{" "}
                {error?.message}
            </Text>
        )

    return (
        <Text>
            Contact {getFirstName(user?.fullName || "")}:{" "}
            <a href={`mailto:${user?.email}`}>{user?.email}</a>
        </Text>
    )
}

interface ContactUserProps {
    _id: string
}

const GET_USER = gql`
    query GetUserContact($_id: ID!) {
        user(_id: $_id) {
            _id
            fullName
            email
        }
    }
`
