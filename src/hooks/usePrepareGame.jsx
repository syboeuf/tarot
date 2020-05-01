import { typesArray, sortArray } from "utils/gameHlepers"

export const usePrepareGame = (nbOfPlayers) => {

    const setArray = (limit, type) => {
        const array = []
        for (let i = 1; i <= limit; i++) {
            array.push(`${i}-${type}`)
        }
        return array
    }
    
    // const shuffleArray = (array) => {
    //     for (let i = array.length - 1; i > 0; i--) {
    //         const j = Math.floor(Math.random() * (i + 1));
    //         [array[i], array[j]] = [array[j], array[i]];
    //     }
    //     return array
    // }

    const shuffleArray = (array) => array.sort(() => Math.random() - 0.5)
    
    const fillCardsArray = (arrayOfCards, nbOfCardsToDistrub, j) => {
        const newArray = []
        for (let i = 0; i < nbOfCardsToDistrub; i++) {
            newArray.push(arrayOfCards[i + j])
        }
        return newArray
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
    
    const setArrayOfCards = () => {
        let arrayOfCards = []
        typesArray.forEach((type) => {
            arrayOfCards = arrayOfCards.concat(setArray(type.limit, type.name))
        })
        return distributeTheCards(shuffleArray(arrayOfCards), nbOfPlayers)
    }

    return [setArrayOfCards]

}