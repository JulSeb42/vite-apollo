/*=============================================== ForgotPassword ===============================================*/

import { useState, type ChangeEvent, type FormEvent } from "react"
import { useMutation, gql } from "@apollo/client"
import { useNavigate } from "react-router-dom"
import { Text, Form, Input, Flexbox, Button } from "tsx-library-julseb"

import { Page, Error } from "components"

import { SITE_DATA, PATHS } from "data"

import type { ErrorType } from "types"

export const ForgotPassword = () => {
    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [errorMessages, setErrorMessages] = useState<ErrorType>(undefined)

    const handleEmail = (e: ChangeEvent<HTMLInputElement>) =>
        setEmail(e.target.value)

    const [forgotPassword, { loading }] = useMutation(FORGOT_PASSWORD)

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        forgotPassword({
            variables: {
                forgotInput: {
                    email,
                },
            },
            onError: ({ graphQLErrors }) => setErrorMessages(graphQLErrors),
            onCompleted: res => {
                if (!res.errors) navigate(PATHS.FORGOT_PASSWORD_SENT)
            },
        })
    }

    return (
        <Page title="I forgot my password" mainWidth="form">
            <Text tag="h1">{SITE_DATA.NAME}</Text>

            <Text tag="h2">I forgot my password</Text>

            <Text>
                Please enter your email address, we will send you a link to
                reset your password.
            </Text>

            <Form onSubmit={handleSubmit} isLoading={loading}>
                <Input
                    id="email"
                    type="email"
                    label="Email"
                    value={email}
                    onChange={handleEmail}
                    autoFocus
                />

                <Flexbox gap="xs">
                    <Button type="submit">Send</Button>
                    <Button to={PATHS.LOGIN} variant="transparent">
                        Cancel
                    </Button>
                </Flexbox>
            </Form>

            <Error errors={errorMessages} />
        </Page>
    )
}

const FORGOT_PASSWORD = gql`
    mutation ForgotPassword($forgotInput: ForgotInput) {
        forgotPassword(forgotInput: $forgotInput) {
            _id
            email
        }
    }
`
