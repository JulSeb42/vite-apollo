/*=============================================== VerificationFailed ===============================================*/

import { Text } from "tsx-library-julseb"

import { Error, Page } from "components"

import type { ErrorType } from "types"

export const VerificationFailed = ({
    errorMessages,
}: VerificationFailedProps) => {
    return (
        <Page title="Verify your account">
            <Text tag="h1">Verification failed</Text>

            <Text>
                Your account could not be verified, please try again later.
            </Text>

            <Error errors={errorMessages} />
        </Page>
    )
}

interface VerificationFailedProps {
    errorMessages: ErrorType
}
