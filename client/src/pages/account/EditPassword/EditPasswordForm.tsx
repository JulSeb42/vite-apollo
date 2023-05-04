/*=============================================== EditPasswordForm ===============================================*/

import { useState, useContext } from "react"
import type { ChangeEvent, FormEvent } from "react"
import { useMutation, gql } from "@apollo/client"
import { useNavigate } from "react-router-dom"
import { Form, Input, passwordRegex } from "tsx-library-julseb"
import type { ValidationTypes } from "tsx-library-julseb/types"

import { AuthContext } from "context"
import type { AuthContextType } from "context/types"

import { Error } from "components"

import { commonTexts } from "data"

import type { ErrorType } from "types"

export const EditPasswordForm = () => {
    const navigate = useNavigate()

    const { user, setToken, setUser } = useContext(
        AuthContext
    ) as AuthContextType

    const [inputs, setInputs] = useState({
        oldPassword: "",
        newPassword: "",
    })
    const [validation, setValidation] = useState<ValidationTypes>(undefined)
    const [errorMessages, setErrorMessages] = useState<ErrorType>(undefined)

    const handleInputs = (e: ChangeEvent<HTMLInputElement>) => {
        setInputs({
            ...inputs,
            [e.target.id]: e.target.value,
        })

        if (e.target.id === "newPassword") {
            if (passwordRegex.test(e.target.value)) {
                setValidation("passed")
            } else {
                setValidation("not-passed")
            }
        }
    }

    const [editPassword, { loading }] = useMutation(EDIT_PASSWORD)

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        editPassword({
            variables: {
                editPasswordInput: {
                    ...inputs,
                    _id: user?._id,
                },
            },

            onError: ({ graphQLErrors }) => setErrorMessages(graphQLErrors),
        }).then(res => {
            const user = res.data.editPassword
            setToken(user.token)
            setUser(user)
            navigate("/my-account")
        })
    }

    return (
        <>
            <Form
                buttonPrimary="Save your password"
                buttonSecondary={{ text: "Cancel", to: "/my-account/edit" }}
                onSubmit={handleSubmit}
                isLoading={loading}
            >
                <Input
                    id="oldPassword"
                    label="Your old password"
                    password
                    value={inputs.oldPassword}
                    onChange={handleInputs}
                />

                <Input
                    id="newPassword"
                    label="New password"
                    password
                    value={inputs.newPassword}
                    onChange={handleInputs}
                    validation={validation}
                    helperBottom={{
                        text:
                            validation === "not-passed"
                                ? commonTexts.passwordNotPassed
                                : "",
                        icon:
                            validation === "not-passed"
                                ? commonTexts.iconPasswordNotPassed
                                : undefined,
                        iconColor: "danger",
                    }}
                />
            </Form>

            <Error errors={errorMessages} />
        </>
    )
}

const EDIT_PASSWORD = gql`
    mutation ($editPasswordInput: EditPasswordInput) {
        editPassword(editPasswordInput: $editPasswordInput) {
            _id
            fullName
            email
            password
            token
        }
    }
`
