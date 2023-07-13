/*=============================================== Goodbye ===============================================*/

import { Link } from "react-router-dom"
import { Text } from "tsx-library-julseb"

import { Page } from "components"

import { PATHS } from "data"

export const Goodbye = () => {
    return (
        <Page title="Goodbye!">
            <Text tag="h1">We're sorry to see you go!</Text>

            <Text>Your account was deleted successfully.</Text>

            <Text>
                <Link to={PATHS.SIGNUP}>Go to signup page.</Link>
            </Text>
        </Page>
    )
}
