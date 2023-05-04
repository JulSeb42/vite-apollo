/*=============================================== App ===============================================*/

import { useContext } from "react"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { ThemeProvider } from "styled-components/macro"
import { ThemeContext } from "tsx-library-julseb"
import type { ThemeContextProps } from "tsx-library-julseb/types"

import { routes } from "routes"

export const App = () => {
    const { theme } = useContext(ThemeContext) as ThemeContextProps

    return (
        <ThemeProvider theme={theme}>
            <RouterProvider router={createBrowserRouter(routes)} />
        </ThemeProvider>
    )
}
