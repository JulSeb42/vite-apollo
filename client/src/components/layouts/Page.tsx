/*=============================================== Page ===============================================*/

import { useEffect, type ReactNode } from "react"
import { useLocation } from "react-router-dom"

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
    const { pathname, search } = useLocation()

    useEffect(() => {
        document.documentElement.scrollTo({
            top: 0,
            left: 0,
            behavior: "instant",
        })
    }, [pathname, search])

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
    children?: ReactNode | ReactNode[]
    mainWidth?: "default" | "large" | "form" | number
}
