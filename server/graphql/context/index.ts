/*=============================================== Context ===============================================*/

import { UserContext } from "./User"
import { AuthContext } from "./Auth"

export const context = {
    ...AuthContext,
    ...UserContext,
}
