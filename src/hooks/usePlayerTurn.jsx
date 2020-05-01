import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import {
    deleteCardOfCardsPlayer, setRemainingCards, removeCardsOfRemovingCards,
    setChienOfPlayers, setChienRedux,
} from "reducers/gameReducer"
import { typesArray, playersOrderArray, sortArray } from "utils/gameHlepers"

export const useTest = () => {

    const [chien, setChien] = useState([])
    const [playersOrder, setPlayersOrder] = useState(playersOrderArray)
    const { remainingCards, dataOfPlayers } = useSelector((state) => state.game)
    const dispatch = useDispatch()

    const selectWeakCard = (cards) => {
        if (cards.length === 0) {
            return
        }
        console.log(cards)
        cards = sortArray(cards)
        return cards[0]
    }

    const selectAtout = (cardsPlayer, strongestCard) => {
        const cards = cardsPlayer.filter((element) => "atout" === element.split("-")[1])
        if (cards.length === 0) {
            return selectWeakCard(cardsPlayer)
        }
        const dataStrongestCard = strongestCard.split("-")
        const sortCards = sortArray(cards)
        if (dataStrongestCard[1] !== "atout") {
            return sortCards[0]
        } else {
            for (let i = 0; i < sortCards.length; i++) {
                const dataCard = sortCards[i].split("-")
                if (Number(dataStrongestCard[0]) < Number(dataCard[0])) {
                    return sortCards[i]
                }
            }
            return sortCards[0]
        }
    }

    const analyseRemainingCards = (remainingCards, selectedCard) => {
        const dataSelectedCard = selectedCard.split("-")
        const findStrongestCard = remainingCards[dataSelectedCard[1]].find((element) => Number(element.split("-")[0]) > Number(dataSelectedCard[0]))
        if (findStrongestCard === undefined) {
            return true
        }
        return false
    }

    const analyseCardsInGame = (cardsPlayed) => {
        let selectedCard
        if (cardsPlayed.length === 1) {
            selectedCard = cardsPlayed[0]
        } else {
            let dataStrongestCard = cardsPlayed[0].split("-")
            for (let i = 0; i < cardsPlayed.length; i++) {
                const dataCard = cardsPlayed[i].split("-")
                if (dataCard[1] === "atout" && dataStrongestCard[1] !== "atout") {
                    dataStrongestCard = cardsPlayed[i].split("-")
                    selectedCard = cardsPlayed[i]
                }
                if (Number(dataStrongestCard[0]) <= Number(dataCard[0]) && dataStrongestCard[1] === dataCard[1]) {
                    dataStrongestCard = cardsPlayed[i].split("-")
                    selectedCard = cardsPlayed[i]
                }
            }
        }
        console.log(selectedCard)
        return selectedCard
    }

    const analyseCardsInHands = (cardsPlayer, strongestCard) => {
        if (cardsPlayer.length === 1) {
            return cardsPlayer[0]
        }
        const dataFirstCard = chien[0].split("-")
        const filterCard = cardsPlayer.filter((element) => dataFirstCard[1] === element.split("-")[1])
        if (filterCard.length === 1) {
            return filterCard[0]
        }
        if (filterCard.length === 0 && dataFirstCard[1] !== "atout") {
            return selectAtout(cardsPlayer, strongestCard)
        } else {
            const sortFilterCard = sortArray(filterCard)
            if (analyseRemainingCards(remainingCards, sortFilterCard[sortFilterCard.length - 1])) {
                return sortFilterCard[sortFilterCard.length - 1]
            } else {
                return sortFilterCard[0]
            }
        }
    }

    const setFirstCard = (cardsPlayer) => {
        if (cardsPlayer.length === 1) {
            return cardsPlayer[0]
        }
        console.log(cardsPlayer)
        let strongestCard
        for (let i = 0; i < cardsPlayer; i++) {
            const dataCard = cardsPlayer[i].split("-")
            if (dataCard[1] !== "atout") {
                if (analyseRemainingCards(remainingCards, cardsPlayer[i])) {
                    strongestCard = cardsPlayer[i]
                }
            }
        }
        if (strongestCard === undefined) {
            console.log(2)
            const filterCards = cardsPlayer.filter((element) => element.split("-")[1] !== "atout")
            strongestCard = selectWeakCard(filterCards)
        }
        if (strongestCard === undefined) {
            console.log(3)
            strongestCard = selectAtout(cardsPlayer)
        }
        console.log(strongestCard)
        return strongestCard
    }

    // A deplacer avec les functions qui distribue les cartes
    const startGame = () => {
        const remainingCards = {
            carreau: [],
            coeur: [],
            pique: [],
            trefle: [],
            atout: [],
        }
        typesArray.forEach((card) => {
            for (let i = 0; i < card.limit; i++) {
                remainingCards[card.name].push(`${i + 1}-${card.name}`)
            }
        })
        dispatch((setRemainingCards(remainingCards)))
    }

    const startAnalyse = (cardsPlayer) => {
        const strongestCard = analyseCardsInGame(chien)
        // const dataStrongestCard = strongestCard.split("-")
        return analyseCardsInHands(cardsPlayer, strongestCard)
    }

    const startRound = (playerName) => {
        let selectCard
        if (chien.length === 0) {
            selectCard = setFirstCard(dataOfPlayers.players[playerName].cardsArray)
        } else {
            selectCard = startAnalyse(dataOfPlayers.players[playerName].cardsArray, chien)
        }
        console.log(selectCard)
        setChien([...chien, selectCard])
        console.log(chien)
        dispatch(deleteCardOfCardsPlayer(playerName, selectCard))
    }

    const setPlayerCard = (playerName, card) => {
        setChien([...chien, card])
        dispatch(deleteCardOfCardsPlayer(playerName, card))
    }

    const endRound = () => {
        const strongestCard = analyseCardsInGame(chien)
        const playerWinRound = chien.indexOf(strongestCard)
        let i = playerWinRound
        const newPlayerOrder = []
        while (newPlayerOrder.length !== 5) {
            newPlayerOrder.push(playersOrder[i])
            i++
            if (i > 4) {
                i = 0
            }
        }
        dispatch(setChienOfPlayers(playersOrder[playerWinRound], chien))
        dispatch(setChienRedux(chien))
        dispatch(removeCardsOfRemovingCards(chien))
        console.log(chien, " chien")
        setChien([])
        setPlayersOrder(newPlayerOrder)
        console.log(newPlayerOrder, " ordre")
        return newPlayerOrder
    }

    const calculScore = (array) => {
        const cardsTeamTaker = array //[].concat(chienOfPlayers[takerContract], (nbOfPlayers === 5) ? chienOfPlayers[teammate] : [])
        const cardsWeak = []
        const cardsStrong = []
        cardsTeamTaker.forEach((card) => {
            const dataCard = card.split("-")
            if ((Number(dataCard[0]) >= 11 && Number(dataCard[0]) <= 14 && dataCard[1] !== "atout")
                || ((Number(dataCard[0]) === 1 || Number(dataCard[0]) === 21 || Number(dataCard[0]) === 22) && dataCard[1] === "atout")) {
                    cardsStrong.push(card)
            } else {
                cardsWeak.push(card)
            }
        })
        let score = 0
        let i
        for (i = 0; i < cardsStrong.length; i++) {
            const dataCard = cardsStrong[i].split("-")
            if (Number(dataCard[0]) === 11) {
                score += 2
            } else if (Number(dataCard[0]) === 12) {
                score += 3
            } else if (Number(dataCard[0]) === 13) {
                score += 4
            } else {
                score += 5
            }
        }
        for (; i < cardsWeak.length; i += 2) {
            score += 1
        }
        return (score)
    }

    return [startGame, startRound, endRound, setPlayerCard, calculScore]

}