/*=============================================== DeleteUser ===============================================*/

import { useContext, useState } from "react"
import { useMutation, gql } from "@apollo/client"
import { useNavigate } from "react-router-dom"

import { AuthContext } from "context"
import type { AuthContextType } from "context/types"

import { DangerZone, Error } from "components"

import type { ErrorType } from "types"

import { PATHS } from "data"

export const DeleteUser = ({ _id }: DeleteUserProps) => {
    const navigate = useNavigate()

    const { logoutUser } = useContext(AuthContext) as AuthContextType

    const [errorMessages, setErrorMessages] = useState<ErrorType>(undefined)

    const [deleteUser, { loading }] = useMutation(DELETE_USER)

    const handleDelete = () => {
        deleteUser({
            variables: {
                _id,
            },
            onError: ({ graphQLErrors }) => setErrorMessages(graphQLErrors),
            onCompleted: () => {
                logoutUser()
                navigate(PATHS.GOODBYE)
            },
        })
    }

    return (
        <>
            <DangerZone
                texts={{
                    buttonOpen: "Delete account",
                    body: "Are you sure you want to delete your account?",
                    buttonSecondary: "No, cancel",
                }}
                buttonPrimary={{
                    text: "Yes, delete my account",
                    onClick: handleDelete,
                    isLoading: loading,
                }}
            />

            <Error errors={errorMessages} />
        </>
    )
}

interface DeleteUserProps {
    _id: string
}

const DELETE_USER = gql`
    mutation deleteUser($id: ID!) {
        deleteUser(_id: $id)
    }
`
