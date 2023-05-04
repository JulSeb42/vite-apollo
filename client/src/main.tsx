/*=============================================== Main ===============================================*/

import ReactDOM from "react-dom/client"
import { ApolloProvider } from "@apollo/client"
import { ThemeProviderWrapper } from "tsx-library-julseb"

import { AuthProviderWrapper } from "context"
import { client } from "api"

import { App } from "App"

import "tsx-library-julseb/index.css"
import "styles/index.css"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <ApolloProvider client={client}>
        <ThemeProviderWrapper>
            <AuthProviderWrapper>
                <App />
            </AuthProviderWrapper>
        </ThemeProviderWrapper>
    </ApolloProvider>
)
