import store from "store"
import {
    deleteCardOfCardsPlayer, setChien, setRemainingCards, removeCardsOfRemovingCards,
    setPlayersOrder,
} from "reducers/gameReducer"

const typesArray = [
    { limit: 14, name: "carreau" },
    { limit: 14, name: "coeur" },
    { limit: 14, name: "trefle" },
    { limit: 14, name: "pique" },
    { limit: 22, name: "atout" },
]

const setArray = (limit, type) => {
    const array = []
    for (let i = 1; i <= limit; i++) {
        array.push(`${i}-${type}`)
    }
    return array
}

const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array
}

const fillCardsArray = (arrayOfCards, nbOfCardsToDistrub, j) => {
    const newArray = []
    for (let i = 0; i < nbOfCardsToDistrub; i++) {
        newArray.push(arrayOfCards[i + j])
    }
    return newArray
}

const sortArray = (arrayOfCards) => {
    let temp
    for (let i = 0; i < arrayOfCards.length; i++) {
        if (i + 2 > arrayOfCards.length) {
            break
        }
        const a = arrayOfCards[i].split("-")
        const b = arrayOfCards[i + 1].split("-")
        if (Number(a[0]) > Number(b[0])) {
            temp = arrayOfCards[i]
            arrayOfCards[i] = arrayOfCards[i + 1]
            arrayOfCards[i + 1] = temp
            i = -1
        }
    }
    for (let i = 0; i < arrayOfCards.length; i++) {
        if (i + 2 > arrayOfCards.length) {
            break
        }
        const a = arrayOfCards[i].split("-")
        const b = arrayOfCards[i + 1].split("-")
        if (a[1] > b[1]) {
            temp = arrayOfCards[i]
            arrayOfCards[i] = arrayOfCards[i + 1]
            arrayOfCards[i + 1] = temp
            i = -1
        }
    }
    return arrayOfCards
}

const distributeTheCards = (arrayOfCards, nbOfPlayers) => {
    const nbOfMiddleCards = (nbOfPlayers === 5) ? 3 : 6
    const nbOfCardsPerPerson = (arrayOfCards.length - nbOfMiddleCards) / nbOfPlayers
    let j = nbOfMiddleCards
    let gameData = {
        players: {
            middle: {
                name: "middle",
                cardsArray: fillCardsArray(arrayOfCards, nbOfMiddleCards, 0),
            },
        }
    }
    for (let i = 0; i < nbOfPlayers; i++) {
        gameData = {
            ...gameData,
            players: {
                ...gameData.players,
                [`player${i + 1}`]: {
                    name: `player${i + 1}`,
                    cardsArray: fillCardsArray(arrayOfCards, nbOfCardsPerPerson, j)
                },
            },
        }
        j += nbOfCardsPerPerson
    }
    // change later by gameData.players[`player${nbOfPlayers}`].cardsArray
    gameData.players.player1.cardsArray = sortArray(gameData.players.player1.cardsArray)
    return gameData
}

export const setArrayOfCards = (nbOfPlayers) => {
    let arrayOfCards = []
    typesArray.forEach((type) => {
        arrayOfCards = arrayOfCards.concat(setArray(type.limit, type.name))
    })
    return distributeTheCards(shuffleArray(arrayOfCards), nbOfPlayers)
}