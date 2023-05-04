/*=============================================== EditAccountSkeleton ===============================================*/

import { Text, Skeleton, SkeletonCard, Flexbox } from "tsx-library-julseb"

export const EditAccountSkeleton = () => {
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
