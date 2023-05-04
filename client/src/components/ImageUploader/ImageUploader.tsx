/*=============================================== ImageUploader ===============================================*/

import type { ChangeEvent } from "react"
import { InputImage } from "tsx-library-julseb"

import { cloudinaryService } from "api"

import type { ImageUploaderProps } from "components/ImageUploader/types"

export const ImageUploader = ({
    img,
    id,
    setImageUrl,
    setIsLoading,
    ...rest
}: ImageUploaderProps) => {
    const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()

        const uploadData = new FormData()
        setIsLoading(true)

        uploadData.append("imageUrl", e.target.files[0])

        cloudinaryService
            .uploadImage(uploadData)
            .then(res => {
                setImageUrl(res.secure_url)
                setIsLoading(false)
            })
            .catch(err => console.log(err))

        if (e.target.files[0]) {
            // @ts-expect-error
            setImageUrl(e.target.files[0])
            const reader = new FileReader()
            reader.addEventListener("load", () => {
                // @ts-expect-error
                setImageUrl(reader.result)
            })

            reader.readAsDataURL(e.target.files[0])
        }
    }

    return (
        <InputImage
            {...rest}
            id={id}
            img={img}
            onChange={(e: any) => handleImage(e)}
        />
    )
}
