/*=============================================== Routes ===============================================*/

// import { Navigate } from "react-router-dom"

import { PATHS } from "data"

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
    //     element: <Navigate to={PATHS.} />,
    // },
]

export const routes: RouteType[] = [
    { path: PATHS.ROOT, element: <Homepage /> },
    { path: "*", element: <NotFound /> },

    { path: PATHS.USERS, element: <AllUsers /> },
    { path: PATHS.USER(), element: <PublicProfile /> },

    {
        path: PATHS.SIGNUP,
        element: (
            <AnonRoutes>
                <Signup />
            </AnonRoutes>
        ),
    },
    { path: PATHS.THANK_YOU, element: <ThankYou /> },
    { path: PATHS.VERIFY, element: <Verify /> },
    {
        path: PATHS.LOGIN,
        element: (
            <AnonRoutes>
                <Login />
            </AnonRoutes>
        ),
    },
    {
        path: PATHS.FORGOT_PASSWORD,
        element: (
            <AnonRoutes>
                <ForgotPassword />
            </AnonRoutes>
        ),
    },
    {
        path: PATHS.FORGOT_PASSWORD_SENT,
        element: (
            <AnonRoutes>
                <ForgotSent />
            </AnonRoutes>
        ),
    },
    {
        path: PATHS.RESET_PASSWORD,
        element: (
            <AnonRoutes>
                <ResetPassword />
            </AnonRoutes>
        ),
    },
    {
        path: PATHS.GOODBYE,
        element: (
            <AnonRoutes>
                <Goodbye />
            </AnonRoutes>
        ),
    },

    {
        path: PATHS.MY_ACCOUNT,
        element: (
            <ProtectedRoutes>
                <MyAccount />
            </ProtectedRoutes>
        ),
    },
    {
        path: PATHS.EDIT_ACCOUNT,
        element: (
            <ProtectedRoutes>
                <EditAccount />
            </ProtectedRoutes>
        ),
    },
    {
        path: PATHS.EDIT_PASSWORD,
        element: (
            <ProtectedRoutes>
                <EditPassword />
            </ProtectedRoutes>
        ),
    },

    ...redirects,
]
