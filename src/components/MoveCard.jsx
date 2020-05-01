import React, { useEffect, useRef } from "react"

const MoveCard = ({
    toggle, mouseUp, dataImage, setDataImage,
}) => {

    const cardRef = useRef()

    useEffect(() => {
        if (toggle) {
            cardRef.current.focus()
            document.addEventListener("mousemove", moveCardInTheField)
        }
        return () => {
            document.removeEventListener("mousemove", moveCardInTheField)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [toggle])

    const moveCardInTheField = (e) => {
        const imageOptions = {
            ...dataImage,
            pos: { x: e.pageX, y: e.pageY },
        }
        setDataImage(imageOptions)
    }

    return (
        <div>
            <img
                draggable="false"
                ref={ cardRef }
                style={
                    {
                        position: "absolute",
                        width: 100,
                        height: 150,
                        top: dataImage.pos.y - (150 / 2),
                        left: dataImage.pos.x - (100 / 2),
                        zIndex: 1000,

                    }
                }
                alt="move_card"
                src={ `${process.env.PUBLIC_URL}/image_tarot/${dataImage.type}/${dataImage.name}.jpg` }
                onMouseMove={ (e) => moveCardInTheField(e) }
                onMouseUp={ (e) => mouseUp(e) }
            />
        </div>
    )
    
}

export default MoveCard