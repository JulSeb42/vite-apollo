/*=============================================== Auth context ===============================================*/

import { AuthContextQueries } from "./Queries"
import { AuthContextMutations } from "./Mutations"

export const AuthContext = {
    ...AuthContextQueries,
    ...AuthContextMutations,
}
