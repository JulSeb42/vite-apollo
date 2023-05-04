/*=============================================== Helmet ===============================================*/

import { Helmet as Container } from "tsx-library-julseb"

import { siteData } from "data"

export const Helmet = ({
    title,
    description,
    keywords,
    cover,
}: HelmetProps) => {
    return (
        <Container
            title={`${title} | ${siteData.name}`}
            description={description}
            keywords={[...siteData.keywords, keywords]}
            favicon={siteData.favicon}
            author={siteData.author}
            type={siteData.type}
            cover={cover || siteData.cover}
            siteName={siteData.name}
            language={siteData.language}
        />
    )
}

interface HelmetProps {
    title: string
    description?: string
    keywords?: string | string[]
    cover?: string
}
