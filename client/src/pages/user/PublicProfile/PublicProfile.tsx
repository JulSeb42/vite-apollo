/*=============================================== PublicProfile ===============================================*/

import { useParams } from "react-router-dom"
import { useQuery, gql } from "@apollo/client"

import { Page, UserHeader } from "components"
import { ContactUser } from "pages/user/PublicProfile/ContactUser"

import type { UserType } from "types"

export const PublicProfile = () => {
    const { id } = useParams<{ id: string }>()

    const { data, loading, error } = useQuery(GET_USER, {
        variables: {
            _id: id,
        },
    })

    const user: UserType = data?.user

    return (
        <Page title={loading ? "User" : error ? "Error" : user?.fullName}>
            <UserHeader _id={id || ""} />
            <ContactUser _id={id || ""} />
        </Page>
    )
}

const GET_USER = gql`
    query GetUserProfile($_id: ID!) {
        user(_id: $_id) {
            _id
            fullName
        }
    }
`
