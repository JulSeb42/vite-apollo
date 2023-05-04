/*=============================================== EditPassword ===============================================*/

import { Text } from "tsx-library-julseb"

import { Page } from "components"
import { EditPasswordForm } from "pages/account/EditPassword/EditPasswordForm"

export const EditPassword = () => {
    return (
        <Page title="Edit your password" mainWidth="form">
            <Text tag="h1">Edit your password</Text>

            <EditPasswordForm />
        </Page>
    )
}
