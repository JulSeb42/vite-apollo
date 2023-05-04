/*=============================================== DangerZone ===============================================*/

import { useState } from "react"
import { Button, Alert, Text, Flexbox } from "tsx-library-julseb"

export const DangerZone = ({ texts, buttonPrimary }: Props) => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <Flexbox>
            {!isOpen && (
                <Button color="danger" onClick={() => setIsOpen(true)}>
                    {texts.buttonOpen}
                </Button>
            )}

            {isOpen && (
                <Alert color="danger">
                    <Text>{texts.body}</Text>

                    <Flexbox alignItems="center" gap="xs">
                        <Button
                            color="danger"
                            isLoading={buttonPrimary.isLoading}
                            onClick={buttonPrimary.onClick}
                        >
                            {buttonPrimary.text}
                        </Button>

                        <Button
                            variant="transparent"
                            onClick={() => setIsOpen(false)}
                        >
                            {texts.buttonSecondary || "Cancel"}
                        </Button>
                    </Flexbox>
                </Alert>
            )}
        </Flexbox>
    )
}

interface Props {
    texts: {
        buttonOpen: string
        body: string
        buttonSecondary?: string
    }

    buttonPrimary: {
        text: string
        onClick: () => void
        isLoading?: boolean
    }
}
