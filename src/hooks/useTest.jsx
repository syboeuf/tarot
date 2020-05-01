import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import {
    deleteCardOfCardsPlayer, setRemainingCards, removeCardsOfRemovingCards,
    setChienOfPlayers, setChienRedux, setShowTeammate, setTeams,
} from "reducers/gameReducer"
import { typesArray, playersOrderArray, sortArray } from "utils/gameHlepers"

export const useTest = () => {

    const [chien, setChien] = useState([])
    const [playersOrder, setPlayersOrder] = useState(playersOrderArray)
    const {
        remainingCards, dataOfPlayers, showTeammate, teammate,
        takerContract, kingChoose, teams: { team1, team2 },
        chienOfPlayers,
    } = useSelector((state) => state.game)
    const dispatch = useDispatch()

    const selectWeakCard = (cards) => {
        if (cards.length === 0) {
            return
        }
        cards = sortArray(cards)
        return cards[0]
    }

    const selectHighestCard = (cards) => {
        if (cards.length === 0) {
            return
        }
        cards = sortArray(cards)
        return cards[cards.length - 1]
    }

    const checkTeamHasPlayed = (team) => {
        for (let i = 0; i < team.length; i++) {
            let playerHasPlayed = false
            for (let j = 0; j < playersOrder.length; j++) {
                if (playersOrder[j] === team[i]) {
                    playerHasPlayed = true
                }
            }
            if (!playerHasPlayed) {
                return false
            }
        }
        return true
    }

    const findStrongestCardTeam = (team) => {
        const cardsTeam = []
        for (let i = 0; i < team.length; i++) {
            const indexCard = playersOrder.indexOf(team[i])
            console.log(chien[indexCard], " index")
            if (chien[indexCard]) {
                cardsTeam.push(chien[indexCard])
            }
        }
        console.log(cardsTeam, chien)
        return analyseCardsInGame(cardsTeam)
    }

    // Not finish
    const checkIfTeammatePlayed = (playerName, strongestCard) => {
        if (showTeammate) {
            const myTeam = (team1.find((element) => element === playerName)) ? [...team1] : [...team2]
            if (checkTeamHasPlayed(myTeam)) {
                const opponentTeam = (myTeam === team1) ? [...team2] : [...team1]
                const strongestCardTeam = findStrongestCardTeam(myTeam)
                if (
                    strongestCardTeam === strongestCard
                    && checkTeamHasPlayed(opponentTeam)
                ) {
                    return true
                }
                if (strongestCardTeam === strongestCard
                    && analyseRemainingCards(remainingCards, strongestCardTeam)
                    && strongestCardTeam.split("-")[1] !== "atout"
                ) {
                    return true
                } else {
                    return false
                }
            } else {
                return false
            }
        } else {
            if (playerName === teammate) {

            }
        }
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
                if (+dataStrongestCard[0] < +dataCard[0]) {
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
        } else if (cardsPlayed.length === 0) {
            return
        } else {
            let dataStrongestCard = cardsPlayed[0].split("-")
            for (let i = 0; i < cardsPlayed.length; i++) {
                const dataCard = cardsPlayed[i].split("-")
                if (dataCard[1] === "atout" && dataStrongestCard[1] !== "atout") {
                    dataStrongestCard = cardsPlayed[i].split("-")
                    selectedCard = cardsPlayed[i]
                }
                if (+dataStrongestCard[0] <= +dataCard[0] && dataStrongestCard[1] === dataCard[1]) {
                    dataStrongestCard = cardsPlayed[i].split("-")
                    selectedCard = cardsPlayed[i]
                }
            }
        }
        return selectedCard
    }

    const analyseCardsInHands = (cardsPlayer, strongestCard, playerName) => {
        if (cardsPlayer.length === 1) {
            return cardsPlayer[0]
        }
        const dataFirstCard = chien[0].split("-")
        const filterCard = cardsPlayer.filter((element) => dataFirstCard[1] === element.split("-")[1])
        if (filterCard.length === 1) {
            return filterCard[0]
        }
        if ((filterCard.length === 0 && dataFirstCard[1] !== "atout") || dataFirstCard[1] === "atout") {
            return selectAtout(cardsPlayer, strongestCard)
        } else {
            const sortFilterCard = sortArray(filterCard)
            // Here check teammate
            if (checkIfTeammatePlayed(playerName, strongestCard)) {
                return sortFilterCard[sortFilterCard.length - 1]
            }
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
            const filterCards = cardsPlayer.filter((element) => element.split("-")[1] !== "atout")
            strongestCard = selectWeakCard(filterCards)
        }
        if (strongestCard === undefined) {
            strongestCard = selectAtout(cardsPlayer)
        }
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

    const startAnalyse = (cardsPlayer, playerName) => {
        const strongestCard = analyseCardsInGame(chien)
        return analyseCardsInHands(cardsPlayer, strongestCard, playerName)
    }

    const setTeam = (selectCard) => {
        if (selectCard === kingChoose) {
            const team1 = []
            const team2 = []
            for (let i = 0; i < playersOrder.length; i++) {
                if (playersOrder[i] === teammate || playersOrder[i] === takerContract) {
                    team1.push(playersOrder[i])
                } else {
                    team2.push(playersOrder[i])
                }
            }
            dispatch(setTeams(team1, team2))
            dispatch(setShowTeammate(true))
        }
    }

    // need to test
    const setExcuse = (cardsChien, playerName) => {
        const cardsChienArray = [...chienOfPlayers[playerName]]
        for (let i = 0; i < chienOfPlayers[playerName].length; i++) {
            const dataCard = chienOfPlayers[playerName].split("-")
            if (+dataCard[0] <= 10) {
                cardsChienArray.splice(i, 1)
                break
            } 
        }
        if (chienOfPlayers[playerName].length) {
            const index = cardsChien.indexOf("22-atout")
            cardsChien.splice(index, 1)
        } else {
            // add a function to replace card instead excuse later
        }
        chienOfPlayers[playerName].push("22-atout")
    } 

    const startRound = (playerName) => {
        let selectCard
        if (chien.length === 0) {
            selectCard = setFirstCard(dataOfPlayers.players[playerName].cardsArray)
        } else {
            selectCard = startAnalyse(dataOfPlayers.players[playerName].cardsArray, playerName)
        }
        !showTeammate && setTeam(selectCard)
        setChien([...chien, selectCard])
        console.log(chien, " chien")
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
        console.log(chien, " chien")
        dispatch(removeCardsOfRemovingCards(chien))
        setChien([])
        setPlayersOrder(newPlayerOrder)
        console.log(newPlayerOrder, " ordre")
        return newPlayerOrder
    }

    return [startGame, startRound, endRound, setPlayerCard]

}