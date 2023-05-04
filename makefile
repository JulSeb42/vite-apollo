# Generate components and pages automatically
# Usage for components: run in terminal `make component name=NameOfComponent`
# Usage for pages: run in terminal `make page pageName=NameOfPage`

define newline


endef

define INDEX_FILE
/*=============================================== $(name) exports ===============================================*/

export * from "components/$(name)/$(name)"
endef

define COMPONENT_FILE
/*=============================================== $(name) component ===============================================*/

import { } from "tsx-library-julseb"

import * as Styles from "components/$(name)/styles"
import type { $(name)Props } from "components/$(name)/types"

export const $(name) = ({ as, ...rest }: $(name)Props) => {
	return (
		<Styles.Styled$(name) as={as} {...rest}>

		</Styles.Styled$(name)>
	)
}
endef

define STYLES_FILE
/*=============================================== $(name) styles ===============================================*/

import styled from "styled-components/macro"
import { } from "tsx-library-julseb"

export const Styled$(name) = styled.div<{ }>`
	
`
endef

define TYPES_FILE
/*=============================================== $(name) types ===============================================*/

import type { HTMLAttributes, ElementType } from "react"

export interface $(name)Props extends HTMLAttributes<HTMLElement> {
    as?: ElementType
}
endef

define PAGE_INDEX
/*=============================================== $(pageName) exports ===============================================*/

export * from "pages/$(pageName)/$(pageName)"
endef

define PAGE_FILE
/*=============================================== $(pageName) ===============================================*/

import { } from "tsx-library-julseb"

import { Page } from "components"

export const $(pageName) = () => {
    return (
        <Page title="$(pageName)">

        </Page>
    )
}
endef

component:
	mkdir client/src/components/$(name)
	touch client/src/components/$(name)/index.ts
	touch client/src/components/$(name)/$(name).tsx
	touch client/src/components/$(name)/styles.tsx
	touch client/src/components/$(name)/types.ts

	@echo '$(subst $(newline),\n,${INDEX_FILE})' > client/src/components/$(name)/index.ts
	@echo '$(subst $(newline),\n,${COMPONENT_FILE})' > client/src/components/$(name)/$(name).tsx
	@echo '$(subst $(newline),\n,${STYLES_FILE})' > client/src/components/$(name)/styles.tsx
	@echo '$(subst $(newline),\n,${TYPES_FILE})' > client/src/components/$(name)/types.ts
	@echo 'export * from "components/$(name)"' >> client/src/components/index.ts

page:
	mkdir client/src/pages/$(pageName)
	touch client/src/pages/$(pageName)/index.ts
	touch client/src/pages/$(pageName)/$(pageName).tsx
	@echo '$(subst $(newline),\n,${PAGE_INDEX})' > client/src/pages/$(pageName)/index.ts
	@echo '$(subst $(newline),\n,${PAGE_FILE})' > client/src/pages/$(pageName)/$(pageName).tsx