/*=============================================== ResetPassword ===============================================*/

import { useState, type ChangeEvent, type FormEvent } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useMutation, gql } from "@apollo/client"
import {
    Text,
    Form,
    Input,
    passwordRegex,
    Flexbox,
    Button,
} from "tsx-library-julseb"
import type { ValidationTypes } from "tsx-library-julseb/types"

import { Page, Error } from "components"

import type { ErrorType } from "types"

import { SITE_DATA, COMMON_TEXTS, PATHS } from "data"

export const ResetPassword = () => {
    const navigate = useNavigate()

    const { token, id } = useParams<{ token: string; id: string }>()

    const [password, setPassword] = useState("")
    const [validation, setValidation] = useState<ValidationTypes>(undefined)
    const [errorMessages, setErrorMessages] = useState<ErrorType>(undefined)

    const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setPassword(value)

        if (passwordRegex.test(value)) {
            setValidation("passed")
        } else {
            setValidation("not-passed")
        }
    }

    const [resetPassword, { loading }] = useMutation(RESET_PASSWORD)

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        resetPassword({
            variables: {
                resetInput: {
                    _id: id,
                    resetToken: token,
                    password,
                },
            },
            onError: ({ graphQLErrors }) => setErrorMessages(graphQLErrors),
            onCompleted: res => {
                if (!res.errors) navigate(PATHS.LOGIN)
            },
        })
    }

    return (
        <Page title="Reset password" mainWidth="form">
            <Text tag="h1">{SITE_DATA.NAME}</Text>

            <Text tag="h2">Reset your password</Text>

            <Form onSubmit={handleSubmit} isLoading={loading}>
                <Input
                    id="password"
                    password
                    label="Your new password"
                    value={password}
                    onChange={handlePassword}
                    validation={validation}
                    helperBottom={{
                        text:
                            validation === "not-passed"
                                ? COMMON_TEXTS.PASSWORD_NOT_PASSED
                                : "",
                        icon:
                            validation === "not-passed"
                                ? COMMON_TEXTS.ICON_PASSWORD_NOT_PASSED
                                : undefined,
                        iconColor: "danger",
                    }}
                    autoFocus
                />

                <Flexbox gap="xs">
                    <Button type="submit">Reset your password</Button>
                    <Button to={PATHS.LOGIN} variant="transparent">
                        Cancel
                    </Button>
                </Flexbox>
            </Form>

            <Error errors={errorMessages} />
        </Page>
    )
}

const RESET_PASSWORD = gql`
    mutation ResetPassword($resetInput: ResetInput) {
        resetPassword(resetInput: $resetInput) {
            _id
        }
    }
`
