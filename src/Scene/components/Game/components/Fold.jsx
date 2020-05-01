import React, { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { useWindowSize } from "hooks/useWindowSize"
import {
    setCardFoldInTheHand, setMadeDog, setStartParty, setChienOfPlayers,
} from "reducers/gameReducer"

import MoveCard from "components/MoveCard"
import Button from "components/Button"

const Fold = ({ dataOfPlayers, playerName, madeDog }) => {

    const { cardsArray } = dataOfPlayers.players.middle
    const [windowSize, setWindowSize] = useState({ x: 0, y: 0 })
    const [toggle, setToggle] = useState(false)
    const [dataImage, setDataImage] = useState({})
    const dispatch = useDispatch()
    const size = useWindowSize()

    useEffect(() => {
        setWindowSize({ x: size.width, y: size.width })
    }, [size])

    const setCardInTheField = (e, imageData) => {
        const data = imageData.split("-")
        const imageOptions = {
            name: imageData,
            type: data[1],
            pos: { x: e.pageX, y: e.pageY },
        }
        setToggle(true)
        setDataImage(imageOptions)
    }

    const mouseUp = (e) => {
        if (e.pageX > 50 && e.pageX < windowSize.x - 50
            && e.pageY > windowSize.y - 150 && e.pageY < windowSize.height) {
        }
        dispatch(setCardFoldInTheHand(playerName, dataImage.name))
        setToggle(false)
    }

    const onClick = () => {
        const foldPlayer = [...cardsArray]
        dispatch(setStartParty(true))
        dispatch(setMadeDog(true))
        // dispatch(setChienOfPlayers("middle", ["test"]))
        dispatch(setChienOfPlayers(playerName, foldPlayer))
    }

    return (
        <div>
            {
                (!madeDog)
                    ? (
                        <div>
                            {
                                (toggle)
                                    ? (
                                        <MoveCard
                                            mouseUp={ mouseUp }
                                            toggle={ toggle }
                                            dataImage={ dataImage }
                                            setDataImage={ setDataImage }
                                        />
                                    )
                                    : null
                            }
                            <div
                                style={
                                    {
                                        position: "absolute", // later relative
                                        width: 300,
                                        height: 150,
                                        left: windowSize.x  * (1 / 5) + 300 / 2,
                                        top: windowSize.y  * (1 / 5),
                                    }
                                }
                            >
                                {
                                    cardsArray.map((card, index) => {
                                        const dataCard = card.split("-")
                                        return (
                                            <img
                                                key={ index }
                                                onMouseDown={ (e) => setCardInTheField(e, card)  }
                                                draggable="false"
                                                alt="fold_card"
                                                style={
                                                    {
                                                        height: 150,
                                                        width: 100,
                                                        position: "absolute",
                                                        left: 100 * index,
                                                    }
                                                }
                                                src={ `${process.env.PUBLIC_URL}/image_tarot/${dataCard[1]}/${card}.jpg` }
                                            />
                                        )
                                    })
                                }
                            </div>
                            <div>
                                <Button
                                    color="grey"
                                    action={ () => onClick() }
                                    text="Valid"
                                />
                            </div>
                        </div>
                    )
                    : null
            }
        </div>
    )

}

export default Fold