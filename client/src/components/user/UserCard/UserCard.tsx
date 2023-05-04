/*=============================================== UserCard component ===============================================*/

import { Text, Avatar } from "tsx-library-julseb"

import * as Styles from "components/user/UserCard/styles"
import type { UserCardProps } from "components/user/UserCard/types"

export const UserCard = ({ user }: UserCardProps) => {
    return (
        <Styles.StyledUserCard to={`/users/${user?._id}`} border={{ width: 1 }}>
            <Avatar img={user?.avatar} size={32} />
            <Text tag="strong">{user?.fullName}</Text>
        </Styles.StyledUserCard>
    )
}
