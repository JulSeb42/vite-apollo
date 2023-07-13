/*=============================================== EditAccount ===============================================*/

import { useContext } from "react"
import { gql, useQuery } from "@apollo/client"
import { Flexbox, Skeleton, SkeletonCard, Text } from "tsx-library-julseb"
import { Link } from "react-router-dom"

import { AuthContext } from "context"
import type { AuthContextType } from "context/types"

import { Page } from "components"
import { EditAccountForm } from "pages/account/EditAccount/EditAccountForm"
import { DeleteUser } from "pages/account/EditAccount/DeleteUser"

import { PATHS } from "data"

export const EditAccount = () => {
    const { user } = useContext(AuthContext) as AuthContextType

    const { data, error, loading } = useQuery(GET_USER, {
        variables: { _id: user?._id },
    })

    return (
        <Page title="Edit your account" mainWidth="form">
            <Text tag="h1">Edit your account</Text>

            {loading ? (
                <EditAccountSkeleton />
            ) : error ? (
                <Text>Error while fetching user: {error?.message}</Text>
            ) : (
                <EditAccountForm user={data?.user} />
            )}

            <Text>
                <Link to={PATHS.EDIT_PASSWORD}>Edit your password.</Link>
            </Text>

            <DeleteUser _id={user?._id || ""} />
        </Page>
    )
}

const EditAccountSkeleton = () => {
    return (
        <Flexbox flexDirection="column" gap="m">
            <SkeletonCard gap="xxs" flexDirection="column">
                <Text>Full name</Text>
                <Skeleton
                    width="100%"
                    height={32}
                    borderRadius="s"
                    animation="shine"
                />
            </SkeletonCard>

            <SkeletonCard gap="xxs" flexDirection="column">
                <Text>Email</Text>
                <Skeleton
                    width="100%"
                    height={32}
                    borderRadius="s"
                    animation="shine"
                />
            </SkeletonCard>

            <SkeletonCard gap="xxs" flexDirection="column">
                <Text>Avatar</Text>
                <Skeleton
                    width={64}
                    height={64}
                    borderRadius="m"
                    animation="shine"
                />
            </SkeletonCard>
        </Flexbox>
    )
}

const GET_USER = gql`
    query GetUser($_id: ID!) {
        user(_id: $_id) {
            _id
            fullName
            avatar
            email
        }
    }
`
