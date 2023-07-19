/*=============================================== AnonRoutes ===============================================*/

import { useContext } from "react"
import type { ReactNode } from "react"
import { Navigate } from "react-router-dom"
import { PageLoading } from "tsx-library-julseb"

import { AuthContext } from "context"
import type { AuthContextType } from "context/types"

import { PATHS } from "data"

export const AnonRoutes = ({
    children,
    redirectTo = PATHS.MY_ACCOUNT,
}: AnonRoutesProps) => {
    const { isLoading, isLoggedIn } = useContext(AuthContext) as AuthContextType

    return isLoading ? (
        <PageLoading />
    ) : !isLoggedIn ? (
        children
    ) : (
        <Navigate to={redirectTo} />
    )
}

interface AnonRoutesProps {
    children?: ReactNode | ReactNode[]
    redirectTo?: string
}
