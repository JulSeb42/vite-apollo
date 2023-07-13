/*=============================================== Header ===============================================*/

import { useContext } from "react"
import {
    Header as Container,
    ButtonIcon,
    ThemeContext,
    uuid,
} from "tsx-library-julseb"
import type { ThemeContextProps } from "tsx-library-julseb/types"
import { NavLink } from "react-router-dom"

import { AuthContext } from "context"
import type { AuthContextType } from "context/types"

import { SITE_DATA, PATHS } from "data"

import type { NavItemType } from "types"

export const Header = () => {
    const { toggleTheme, selectedTheme } = useContext(
        ThemeContext
    ) as ThemeContextProps
    const { isLoggedIn, logoutUser } = useContext(
        AuthContext
    ) as AuthContextType

    const baseLinks: NavItemType[] = [
        {
            text: "Home",
            to: PATHS.ROOT,
            end: true,
        },
        {
            text: "Users",
            to: PATHS.USERS,
        },
    ]

    const protectedLinks: NavItemType[] = [
        {
            text: "My account",
            to: PATHS.MY_ACCOUNT,
        },
        {
            text: "Logout",
            onClick: logoutUser,
        },
    ]

    const anonLinks: NavItemType[] = [
        {
            text: "Sign up",
            to: PATHS.SIGNUP,
        },
        {
            text: "Login",
            to: PATHS.LOGIN,
        },
    ]

    const navLinks = (links: NavItemType[]) =>
        links.map(({ text, to, onClick, end }) =>
            to ? (
                <NavLink to={to} end={end} key={uuid()}>
                    {text}
                </NavLink>
            ) : (
                <button onClick={onClick} key={uuid()}>
                    {text}
                </button>
            )
        )

    return (
        <Container logo={{ text: SITE_DATA.NAME, to: PATHS.ROOT }}>
            {navLinks(baseLinks)}

            {isLoggedIn ? navLinks(protectedLinks) : navLinks(anonLinks)}

            <ButtonIcon
                icon={selectedTheme === "dark" ? "sun" : "moon"}
                size={24}
                variant="transparent"
                color="background"
                onClick={toggleTheme}
                label="Toggle theme"
            />
        </Container>
    )
}
