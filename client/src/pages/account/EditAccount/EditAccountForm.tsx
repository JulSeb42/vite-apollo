/*=============================================== EditAccountForm ===============================================*/

import { useContext, useState } from "react"
import { gql, useMutation } from "@apollo/client"
import { useNavigate } from "react-router-dom"
import { Form, Input } from "tsx-library-julseb"

import { AuthContext } from "context"
import type { AuthContextType } from "context/types"

import { ImageUploader, Error } from "components"

import type { ErrorType, UserType } from "types"

export const EditAccountForm = ({ user }: EditAccountFormProps) => {
    const navigate = useNavigate()
    const {
        setUser,
        setToken,
        isLoading: isApiLoading,
    } = useContext(AuthContext) as AuthContextType

    const [editUser, { loading }] = useMutation(EDIT_USER)

    const [inputs, setInputs] = useState({
        fullName: user?.fullName,
    })
    const [avatar, setAvatar] = useState(user?.avatar)
    const [isLoading, setIsLoading] = useState(false)
    const [errorMessages, setErrorMessages] = useState<ErrorType>(undefined)

    const handleInputs = (e: React.ChangeEvent<HTMLInputElement>) =>
        setInputs({
            ...inputs,
            [e.target.id]: e.target.value,
        })

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (user) {
            editUser({
                variables: {
                    editUserInput: {
                        _id: user?._id,
                        ...inputs,
                        avatar,
                    },
                },

                onError: ({ graphQLErrors }) => setErrorMessages(graphQLErrors),
            }).then(res => {
                const user = res.data.editUser
                setToken(user.token)
                setUser(user)
                navigate("/my-account")
            })
        }
    }

    return (
        <>
            <Form
                buttonPrimary="Edit your account"
                buttonSecondary={{ text: "Cancel", to: "/my-account" }}
                onSubmit={handleSubmit}
                isLoading={loading || isApiLoading || isLoading || !user?._id}
            >
                <Input
                    id="fullName"
                    label="Full name"
                    value={inputs.fullName}
                    onChange={handleInputs}
                />

                <Input
                    id="email"
                    label="Email"
                    value={user?.email}
                    disabled
                    helperBottom={{
                        text: "You can not edit your email.",
                    }}
                />

                <ImageUploader
                    id="avatar"
                    label="Avatar"
                    img={avatar || ""}
                    setImageUrl={setAvatar}
                    setIsLoading={setIsLoading}
                />
            </Form>

            <Error errors={errorMessages} />
        </>
    )
}

interface EditAccountFormProps {
    user: UserType
}

const EDIT_USER = gql`
    mutation EditAccount($editUserInput: EditUserInput) {
        editUser(editUserInput: $editUserInput) {
            _id
            fullName
            email
            password
            token
            avatar
        }
    }
`
