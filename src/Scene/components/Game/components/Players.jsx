import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { setShowField, setCardsPlayed, setCardInFold } from "reducers/gameReducer"
import useInterval from "hooks/useInterval"
import { usePlayerTurn } from "hooks/usePlayerTurn"
import { useTest } from "hooks/useTest"

import MoveCard from "components/MoveCard"

const timerPlayerTurn = 1000

const Players = ({ dataOfPlayers, playerName, startParty }) => {

    const { name, cardsArray } = dataOfPlayers.players.player1
    const { coordinateOfField, playerOrder, nbOfPlayers } = useSelector((state) => state.game)
    const [dataImage, setDataImage] = useState({})
    const [toggle, setToggle] = useState(false)
    const [active, setActive] = useState(true)
    const [arrayPlayersOrder, setArrayPlayersOrder] = useState(playerOrder)
    const [playerTurn, setPlayerTurn] = useState(0)
    const [startGame, test, endRound, setPlayerCard] = useTest()
    const dispatch = useDispatch()

    useEffect(() => {
        startGame()
    }, [])

    useInterval(() => {
        if (arrayPlayersOrder[playerTurn] === playerName) {
            setActive(false)
        } else if (playerTurn === 5) {
            setArrayPlayersOrder(endRound())
            setPlayerTurn(0)
            // When the last round is finished, history.push to a new page, calculate score
            // !cardsArray.length && history.push()
        } else {
            test(arrayPlayersOrder[playerTurn])
            setPlayerTurn(playerTurn + 1)
        }
    }, (active) ? timerPlayerTurn : null)

    const setCardInTheField = (e, imageData) => {
        const data = imageData.split("-")
        const imageOptions = {
            name: imageData,
            type: data[1],
            pos: { x: e.pageX, y: e.pageY },
        }
        setToggle(true)
        dispatch(setShowField(true))
        setDataImage(imageOptions)
    }

    const mouseUp = (e) => {
        const { x, y, width, height } = coordinateOfField
        if (e.pageX > x && e.pageX < x + width
            && e.pageY > y && e.pageY < y + height) {
            if (startParty) {
                dispatch(setCardsPlayed({ namePlayer: name, card: dataImage.name }))
                setActive(true)
                setPlayerTurn(playerTurn + 1)
                setPlayerCard(playerName, dataImage.name)
                dispatch(setShowField(false))
            } else {
                const maxCardsInFold = (nbOfPlayers === 5) ? 3 : 6 
                if (dataOfPlayers.players.middle.cardsArray.length < maxCardsInFold) {
                    dispatch(setCardInFold(playerName, dataImage.name))
                }
            }
        }
        dispatch(setShowField(false))
        setToggle(false)
    }

    return (
        <div className="cards_container">
            <p>{ name }</p>
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
            <div className="card_location">
                {
                    cardsArray.map((card, index) => {
                        const imageData = card.split("-")
                        return (
                            <div
                                style={
                                    {
                                        left: index * 50,
                                        zIndex: index,
                                        position: "absolute",
                                        bottom: 0,
                                    }
                                }
                                key={ index }
                                onMouseDown={ (e) => !active && setCardInTheField(e, card) }
                            >
                                <img
                                    className="card"
                                    alt="card"
                                    draggable="false"
                                    src={ `${process.env.PUBLIC_URL}/image_tarot/${imageData[1]}/${card}.jpg` }
                                />
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )

}

export default Players