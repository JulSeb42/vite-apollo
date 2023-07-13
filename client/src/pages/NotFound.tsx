/*=============================================== NotFound ===============================================*/

import { Link } from "react-router-dom"
import { Text } from "tsx-library-julseb"

import { Page } from "components"

import { PATHS } from "data"

export const NotFound = () => {
    return (
        <Page title="404">
            <Text tag="h1">Page not found!</Text>

            <Text>
                <Link to={PATHS.ROOT}>Back to homepage.</Link>
            </Text>
        </Page>
    )
}
