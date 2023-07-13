/*=============================================== Helmet ===============================================*/

import { Helmet as Container } from "tsx-library-julseb"

import { SITE_DATA } from "data"

export const Helmet = ({
    title,
    description,
    keywords,
    cover,
}: HelmetProps) => {
    return (
        <Container
            title={`${title} | ${SITE_DATA.NAME}`}
            description={description}
            keywords={[...SITE_DATA.KEYWORDS, keywords]}
            favicon={SITE_DATA.FAVICON}
            author={SITE_DATA.AUTHOR}
            type={SITE_DATA.TYPE}
            cover={cover || SITE_DATA.COVER}
            siteName={SITE_DATA.NAME}
            language={SITE_DATA.LANGUAGE}
        />
    )
}

interface HelmetProps {
    title: string
    description?: string
    keywords?: string | string[]
    cover?: string
}
