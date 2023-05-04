/*=============================================== User type ===============================================*/

export type UserType = {
    _id: string
    fullName: string
    email: string
    password: string
    token: string
    exp: number | string
    verified: boolean
    verifyToken: string
    resetToken: string
    avatar: string
}
