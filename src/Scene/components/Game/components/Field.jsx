import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useWindowSize } from "hooks/useWindowSize"
import { setCoordinateOfField } from "reducers/gameReducer"

const Field = () => {

    const { showField } = useSelector((state) => state.game)
    const [fieldSizeAndPos, setFieldSizeAndPos] = useState({
        x: 0, y: 0, width: 0, height: 0,
    })
    const size = useWindowSize()
    const dispatch = useDispatch()

    useEffect(() => {
        const sizeAndPos = {
            width: size.width * (3 / 5),
            height: (size.width * (3 / 5)) * (9 / 16),
            x: size.width * (1 / 5),
            y: size.height * (1 / 5),
        }
        setFieldSizeAndPos(sizeAndPos)
        dispatch(setCoordinateOfField(sizeAndPos))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [size])

    const body = () => (
        <div
            style={
                {
                    position: "absolute",
                    width: fieldSizeAndPos.width,
                    height: fieldSizeAndPos.height,
                    top: fieldSizeAndPos.y,
                    left: fieldSizeAndPos.x,
                    border: "2px solid white",
                }
            }
        >
            field
        </div>
    )

    return (
        <div>
            { showField && body() }
        </div>
    )

}

export default Field