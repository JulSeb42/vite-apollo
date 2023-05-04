/*=============================================== UserHeader component ===============================================*/

import { useQuery, gql } from "@apollo/client"
import {
    Flexbox,
    Text,
    Avatar,
    SkeletonCard,
    Skeleton,
    SkeletonShine,
} from "tsx-library-julseb"

import type { UserHeaderProps } from "components/user/UserHeader/types"
import type { UserType } from "types"

export const UserHeader = ({ _id }: UserHeaderProps) => {
    const { data, error, loading } = useQuery(GET_USER, {
        variables: {
            _id,
        },
    })
    const user: UserType = data?.user

    if (loading)
        return (
            <SkeletonCard flexDirection="row" gap="xs" alignItems="center">
                <Skeleton width={48} height={48} borderRadius="circle" />
                <Skeleton width="40%" height={60} borderRadius="s" />
                <SkeletonShine />
            </SkeletonCard>
        )

    if (error)
        return <Text>Error while fetching user's header: {error?.message}</Text>

    return (
        <Flexbox alignItems="center" gap="xs">
            <Avatar img={user?.avatar} alt={`Avatar ${user?.fullName}`} />
            <Text tag="h1">{user?.fullName}</Text>
        </Flexbox>
    )
}

const GET_USER = gql`
    query GetUserHeader($_id: ID!) {
        user(_id: $_id) {
            _id
            fullName
            avatar
        }
    }
`
