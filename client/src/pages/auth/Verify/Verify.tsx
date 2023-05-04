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

    console.log(user)

    useEffect(() => {
        const verifyFn = () => {
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
                }).then(res => {
                    console.log(res)
                    const user = res.data.verifyUser
                    setToken(user.token)
                    setUser(user)
                    loginUser(user)
                    setIsVerified(true)
                })
            }

            setIsLoading(false)
        }

        setTimeout(() => verifyFn(), 500)
        // eslint-disable-next-line
    }, [id, token, user?._id, user?.verifyToken])

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
        }
    }
`
