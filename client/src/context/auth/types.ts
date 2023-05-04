/*=============================================== Auth context types ===============================================*/

import type { UserType } from "types"

export type AuthContextType = {
    isLoggedIn?: boolean
    isLoading?: boolean
    user?: UserType | null
    setUser: (user: null | UserType) => void
    loginUser: (user: UserType) => void
    logoutUser: () => void
    setToken: (token: string) => void
}
