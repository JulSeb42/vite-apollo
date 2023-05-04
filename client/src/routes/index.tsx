/*=============================================== Routes ===============================================*/

// import { Navigate } from "react-router-dom"

import { ProtectedRoutes } from "routes/ProtectedRoutes"
import { AnonRoutes } from "routes/AnonRoutes"

import { Homepage } from "pages/Homepage"
import { NotFound } from "pages/NotFound"

import { AllUsers, PublicProfile } from "pages/user"

import {
    Signup,
    ThankYou,
    Verify,
    Login,
    ForgotPassword,
    ForgotSent,
    ResetPassword,
    Goodbye,
} from "pages/auth"

import { MyAccount, EditAccount, EditPassword } from "pages/account"

type RouteType = {
    path: string
    element: JSX.Element
}

const redirects: RouteType[] = [
    // {
    //     path: "",
    //     element: <Navigate to="" />,
    // },
]

export const routes: RouteType[] = [
    { path: "/", element: <Homepage /> },
    { path: "*", element: <NotFound /> },

    { path: "/users", element: <AllUsers /> },
    { path: "/users/:id", element: <PublicProfile /> },

    {
        path: "/signup",
        element: (
            <AnonRoutes>
                <Signup />
            </AnonRoutes>
        ),
    },
    { path: "/thank-you", element: <ThankYou /> },
    { path: "/verify/:token/:id", element: <Verify /> },
    {
        path: "/login",
        element: (
            <AnonRoutes>
                <Login />
            </AnonRoutes>
        ),
    },
    {
        path: "/login/forgot-password",
        element: (
            <AnonRoutes>
                <ForgotPassword />
            </AnonRoutes>
        ),
    },
    {
        path: "/login/forgot-password/email-sent",
        element: (
            <AnonRoutes>
                <ForgotSent />
            </AnonRoutes>
        ),
    },
    {
        path: "/reset-password/:token/:id",
        element: (
            <AnonRoutes>
                <ResetPassword />
            </AnonRoutes>
        ),
    },
    {
        path: "/goodbye",
        element: (
            <AnonRoutes>
                <Goodbye />
            </AnonRoutes>
        ),
    },

    {
        path: "/my-account",
        element: (
            <ProtectedRoutes>
                <MyAccount />
            </ProtectedRoutes>
        ),
    },
    {
        path: "/my-account/edit",
        element: (
            <ProtectedRoutes>
                <EditAccount />
            </ProtectedRoutes>
        ),
    },
    {
        path: "/my-account/edit-password",
        element: (
            <ProtectedRoutes>
                <EditPassword />
            </ProtectedRoutes>
        ),
    },

    ...redirects,
]
