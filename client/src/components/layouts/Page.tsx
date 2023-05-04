/*=============================================== Page ===============================================*/

import { Wrapper, Main } from "tsx-library-julseb"

import { Helmet } from "components/layouts/Helmet"
import { Header } from "components/layouts/Header"

export const Page = ({
    title,
    description,
    keywords,
    cover,
    template = "1col",
    children,
    mainWidth = "default",
}: PageProps) => {
    return (
        <>
            <Helmet
                title={title}
                description={description}
                keywords={keywords}
                cover={cover}
            />

            <Header />

            <Wrapper>
                {template !== "1col" ? (
                    children
                ) : (
                    <Main size={mainWidth} minHeight="calc(100vh - 56px)">
                        {children}
                    </Main>
                )}
            </Wrapper>
        </>
    )
}

interface PageProps {
    title: string
    description?: string
    keywords?: string | string[]
    cover?: string
    template?: "1col" | "2cols" | "3cols"
    children?: any
    mainWidth?: "default" | "large" | "form" | number
}
