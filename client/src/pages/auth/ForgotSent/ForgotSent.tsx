/*=============================================== ForgotSent ===============================================*/

import { Text } from "tsx-library-julseb"

import { Page } from "components"

export const ForgotSent = () => {
    return (
        <Page title="Email sent successfully!">
            <Text tag="h1">Email sent successfully!</Text>

            <Text>
                We just sent you an email with a link to reset your password.
            </Text>
        </Page>
    )
}
