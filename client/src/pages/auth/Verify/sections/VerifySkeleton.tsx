/*=============================================== VerifySkeleton ===============================================*/

import { Skeleton } from "tsx-library-julseb"

import { Page } from "components"

export const VerifySkeleton = () => {
    return (
        <Page title="Verify your account">
            <Skeleton
                width="40%"
                height={60}
                animation="shine"
                borderRadius="s"
            />
            <Skeleton
                width="80%"
                height={24}
                animation="shine"
                borderRadius="s"
            />
        </Page>
    )
}
