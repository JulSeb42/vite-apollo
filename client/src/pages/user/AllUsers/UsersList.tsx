/*=============================================== UsersList ===============================================*/

import { useQuery, gql } from "@apollo/client"
import {
    Text,
    uuid,
    Skeleton,
    generateNumbers,
    Grid,
    SkeletonCard,
    SkeletonShine,
} from "tsx-library-julseb"

import { UserCard } from "components"

import type { UserType } from "types"

export const UsersList = () => {
    const { data, loading, error } = useQuery(ALL_USERS)
    const allUsers: UserType[] = data?.users

    if (loading)
        return (
            <Grid col={3} gap="s">
                {generateNumbers(0, 4)?.map(n => (
                    <SkeletonCard
                        borderRadius="m"
                        border={{ width: 1 }}
                        flexDirection="column"
                        gap="xs"
                        alignItems="center"
                        justifyContent="center"
                        padding="s"
                        key={n}
                    >
                        <Skeleton
                            width={32}
                            height={32}
                            borderRadius="circle"
                        />
                        <Skeleton width="70%" height={24} borderRadius="s" />
                        <SkeletonShine />
                    </SkeletonCard>
                ))}
            </Grid>
        )

    if (error) return <Text>Error while loading users: {error?.message}</Text>

    if (!allUsers?.length) return <Text>No user.</Text>

    return (
        <Grid col={3} gap="s">
            {allUsers.map(user => (
                <UserCard user={user} key={uuid()} />
            ))}
        </Grid>
    )
}

const ALL_USERS = gql`
    query AllUsers {
        users {
            _id
            fullName
            email
            avatar
        }
    }
`
