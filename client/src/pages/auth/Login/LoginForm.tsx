/*=============================================== LoginForm ===============================================*/

import { useContext, useState } from "react"
import type { ChangeEvent, FormEvent } from "react"
import { useNavigate } from "react-router-dom"
import { useMutation, gql } from "@apollo/client"
import { Form, Input, scrollToTop, Flexbox, Button } from "tsx-library-julseb"

import { AuthContext } from "context"
import type { AuthContextType } from "context/types"

import { Error } from "components"

import type { ErrorType } from "types"

export const LoginForm = () => {
    const { loginUser } = useContext(AuthContext) as AuthContextType

    const navigate = useNavigate()

    const [inputs, setInputs] = useState({
        email: "",
        password: "",
    })
    const [errorMessages, setErrorMessages] = useState<ErrorType>(undefined)

    const handleInputs = (e: ChangeEvent<HTMLInputElement>) =>
        setInputs({
            ...inputs,
            [e.target.id]: e.target.value,
        })

    const [login, { loading }] = useMutation(LOGIN)

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        login({
            variables: {
                loginInput: inputs,
            },

            onError: ({ graphQLErrors }) => setErrorMessages(graphQLErrors),
        }).then(res => {
            if (!res.errors) {
                loginUser(res.data.login)
                scrollToTop()
                navigate(-1)
            }
        })
    }

    return (
        <>
            <Form onSubmit={handleSubmit} isLoading={loading}>
                <Input
                    id="email"
                    type="email"
                    label="Email"
                    value={inputs.email}
                    onChange={handleInputs}
                    autoFocus
                />

                <Input
                    id="password"
                    password
                    label="Password"
                    value={inputs.password}
                    onChange={handleInputs}
                />

                <Flexbox gap="xs">
                    <Button type="submit">Login</Button>
                </Flexbox>
            </Form>

            <Error errors={errorMessages} />
        </>
    )
}

const LOGIN = gql`
    mutation Login($loginInput: LoginInput) {
        login(loginInput: $loginInput) {
            _id
            verified
            token
        }
    }
`
