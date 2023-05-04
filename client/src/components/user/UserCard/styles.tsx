/*=============================================== UserCard styles ===============================================*/

import styled from "styled-components/macro"
import { Card, Mixins, Transitions } from "tsx-library-julseb"

export const StyledUserCard = styled(Card)`
    ${Mixins.Flexbox({
        $alignItems: "center",
        $gap: "xs",
        $flexDirection: "column",
    })};
    transition: ${Transitions.Short};

    &:hover {
        transform: scale(1.02);
    }
`
