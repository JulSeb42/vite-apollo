/*=============================================== UserContext ===============================================*/

import { UserContextQueries } from "./Queries"
import { UserContextMutations } from "./Mutations"

export const UserContext = {
    ...UserContextQueries,
    ...UserContextMutations,
}
