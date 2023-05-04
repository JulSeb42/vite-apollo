/*=============================================== ProtectedRoutes ===============================================*/

import { useContext } from "react"
import { Navigate } from "react-router-dom"
import { PageLoading } from "tsx-library-julseb"

import { AuthContext } from "context"
import type { AuthContextType } from "context/types"

export const ProtectedRoutes = ({
    children,
    redirectTo = "/login",
}: ProtectedRoutesProps) => {
    const { isLoading, isLoggedIn } = useContext(AuthContext) as AuthContextType

    return isLoading ? (
        <PageLoading />
    ) : isLoggedIn ? (
        children
    ) : (
        <Navigate to={redirectTo} />
    )
}

interface ProtectedRoutesProps {
    children?: any
    redirectTo?: string
}
