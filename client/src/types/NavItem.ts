/*=============================================== Nav item types ===============================================*/

import type { ButtonLinkTypes } from "tsx-library-julseb/types"

export type NavItemType = ButtonLinkTypes & {
    text: string
    end?: boolean
}
