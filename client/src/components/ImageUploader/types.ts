/*=============================================== ImageUploader types ===============================================*/

import type { ValidationTypes, AllColorsTypes } from "tsx-library-julseb/types"

const inputSizes = { small: "small", large: "large" } as const

export type InputImageSizeTypes = keyof typeof inputSizes

export interface ImageUploaderProps {
    id: string
    label?: string
    helper?: string
    helperBottom?:
        | undefined
        | string
        | {
              text?: string | undefined
              icon?: string
              iconColor?: AllColorsTypes
          }

    img: string

    validation?: ValidationTypes
    inputSize?: InputImageSizeTypes
    value?: never

    icons?: {
        empty?: string | JSX.Element
        hover?: string | JSX.Element
        sizeEmpty?: number
        sizeHover?: number
    }

    setImageUrl: (imageUrl: string) => void
    setIsLoading: (isLoading: boolean) => void
}
