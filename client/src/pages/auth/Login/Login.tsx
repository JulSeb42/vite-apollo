/*=============================================== Login ===============================================*/

import { Link } from "react-router-dom"
import { Text } from "tsx-library-julseb"

import { Page } from "components"
import { LoginForm } from "pages/auth/Login/LoginForm"

export const Login = () => {
    return (
        <Page title="Login" mainWidth="form">
            <Text tag="h1">Login</Text>

            <LoginForm />

            <Text>
                <Link to="/login/forgot-password">I forgot my password.</Link>
            </Text>

            <Text>
                You don't have an account? <Link to="/signup">Create one!</Link>
            </Text>
        </Page>
    )
}
