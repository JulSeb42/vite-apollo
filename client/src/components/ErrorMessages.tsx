/*=============================================== ErrorMessages ===============================================*/

import { Alert, uuid } from "tsx-library-julseb"

import type { ErrorType } from "types"

export const Error = ({ errors }: ErrorProps) => {
    if (!errors) return null

    return (
        <>
            {errors?.map(({ message }) => (
                <Alert color="danger" key={uuid()}>
                    {message}
                </Alert>
            ))}
        </>
    )
}

interface ErrorProps {
    errors: ErrorType
}
