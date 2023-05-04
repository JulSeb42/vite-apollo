/*=============================================== SignupForm ===============================================*/

import { useContext, useState } from "react"
import type { ChangeEvent, FormEvent } from "react"
import { useMutation, gql } from "@apollo/client"
import { useNavigate } from "react-router-dom"
import {
    Input,
    Form,
    passwordRegex,
    scrollToTop,
    Flexbox,
    Button,
} from "tsx-library-julseb"
import type { ValidationTypes } from "tsx-library-julseb/types"

import { AuthContext } from "context"
import type { AuthContextType } from "context/types"

import { Error } from "components"

import { commonTexts } from "data"

import type { ErrorType } from "types"

export const SignupForm = () => {
    const { loginUser } = useContext(AuthContext) as AuthContextType

    const navigate = useNavigate()

    const [inputs, setInputs] = useState({
        fullName: "",
        email: "",
        password: "",
    })

    const [validationPassword, setValidationPassword] =
        useState<ValidationTypes>(undefined)
    const [errorMessages, setErrorMessages] = useState<ErrorType>(undefined)

    const handleInputs = (
        e: ChangeEvent<HTMLInputElement & HTMLTextAreaElement>
    ) => {
        const value = e.target.value

        setInputs({
            ...inputs,
            [e.target.id]: value,
        })

        if (e.target.id === "password") {
            if (passwordRegex.test(value)) {
                setValidationPassword("passed")
            } else {
                setValidationPassword("not-passed")
            }
        }
    }

    const [signup, { loading }] = useMutation(SIGNUP)

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        signup({
            variables: {
                signupInput: inputs,
            },

            onError: ({ graphQLErrors }) => setErrorMessages(graphQLErrors),
        })
            .then(res => {
                if (!res.errors) {
                    loginUser(res.data.signup)
                    scrollToTop()
                    navigate("/thank-you")
                }
            })
            .catch(err => console.log(err))
    }

    return (
        <>
            <Form onSubmit={handleSubmit} isLoading={loading}>
                <Input
                    id="fullName"
                    label="Full name"
                    value={inputs.fullName}
                    onChange={handleInputs}
                    autoFocus
                />

                <Input
                    id="email"
                    type="email"
                    label="Email"
                    value={inputs.email}
                    onChange={handleInputs}
                />

                <Input
                    id="password"
                    password
                    label="Password"
                    value={inputs.password}
                    onChange={handleInputs}
                    validation={validationPassword}
                    helperBottom={{
                        text:
                            validationPassword === "not-passed"
                                ? commonTexts.passwordNotPassed
                                : "",
                        icon:
                            validationPassword === "not-passed"
                                ? commonTexts.iconPasswordNotPassed
                                : "",
                        iconColor: "danger",
                    }}
                />

                <Flexbox gap="xs">
                    <Button type="submit">Create an account</Button>
                </Flexbox>
            </Form>

            <Error errors={errorMessages} />
        </>
    )
}

const SIGNUP = gql`
    mutation Signup($signupInput: SignupInput) {
        signup(signupInput: $signupInput) {
            _id
            email
            fullName
            token
            verifyToken
        }
    }
`
