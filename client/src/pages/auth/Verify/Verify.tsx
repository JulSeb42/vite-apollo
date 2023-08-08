/*=============================================== Verify ===============================================*/

import { useContext, useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useMutation, gql } from "@apollo/client"

import { AuthContext } from "context"
import type { AuthContextType } from "context/types"

import {
    VerifySkeleton,
    NotLoggedIn,
    VerificationFailed,
    VerificationSuccess,
} from "pages/auth/Verify/sections"

import type { ErrorType } from "types"

export const Verify = () => {
    const { token, id } = useParams<{ token: string; id: string }>()

    const {
        isLoggedIn,
        user,
        setUser,
        setToken,
        loginUser,
        isLoading: dataLoading,
    } = useContext(AuthContext) as AuthContextType

    const [isLoading, setIsLoading] = useState(true)
    const [isVerified, setIsVerified] = useState(user?.verified)
    const [errorMessages, setErrorMessages] = useState<ErrorType>(undefined)

    const [verifyUser, { loading }] = useMutation(VERIFY_USER)

    useEffect(() => {
        if (isLoading) {
            if (isLoggedIn && user?._id === id && user?.verifyToken === token) {
                verifyUser({
                    variables: {
                        verifyInput: {
                            _id: id,
                            verifyToken: token,
                        },
                    },

                    onError: ({ graphQLErrors }) =>
                        setErrorMessages(graphQLErrors),
                    onCompleted: res => {
                        const user = res.verifyUser
                        setToken(user.token)
                        setUser(user)
                        loginUser(user)
                        setIsLoading(false)
                        setIsVerified(true)
                    },
                })
            }
        }
    }, [
        id,
        isLoading,
        isLoggedIn,
        loginUser,
        setToken,
        setUser,
        token,
        user,
        verifyUser,
    ])

    if (loading || isLoading || dataLoading) return <VerifySkeleton />

    if (!isLoggedIn) return <NotLoggedIn />

    if (!isVerified) return <VerificationFailed errorMessages={errorMessages} />

    return <VerificationSuccess />
}

const VERIFY_USER = gql`
    mutation VerifyUser($verifyInput: VerifyInput) {
        verifyUser(verifyInput: $verifyInput) {
            _id
            token
            verified
        }
    }
`
