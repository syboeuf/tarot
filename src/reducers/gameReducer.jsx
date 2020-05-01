import { createSlice } from "@reduxjs/toolkit"

import { sortArray } from "utils/gameHlepers"

const initialState = {
    nbOfPlayers: 5,
    playerName: "player1",
    dataOfPlayers: undefined,
    showField: false,
    coordinateOfField: {},
    cardsPlayed: [],
    playerOrder: ["player1", "player2", "player3", "player4", "player5"],
    chienRedux: [],
    remainingCards: {},
    contract: "",
    takerContract: "player1",
    teammate: "player2",
    kingChoose: "14-coeur",
    showTeammate: false,
    startParty: true,
    madeDog: true,
    teams: { team1: [], team2: [] },
    chienOfPlayers: {
        player1: [],
        player2: [],
        player3: [],
        player4: [],
        player5: [],
    }
}

const game = createSlice({
    name: "./",
    initialState,
    reducers: {
        setNbOfPlayers (state, action) {
            state.nbOfPlayers = action.payload
        },
        setDataOfPlayers (state, action) {
            state.dataOfPlayers = action.payload
        },
        setShowField (state, action) {
            state.showField = action.payload
        },
        setCoordinateOfField (state, action) {
            state.coordinateOfField = action.payload
        },
        setCardsPlayed (state, action) {
            state.cardsPlayed = [...state.cardsPlayed, action.payload]
        },
        setChienRedux (state, action) {
            state.chienRedux = [...action.payload]
        },
        deleteCardOfCardsPlayer: {
            reducer (state, action) {
                const { player, card } = action.payload
                const index = state.dataOfPlayers.players[player].cardsArray.findIndex((element) => element === card)
                state.dataOfPlayers.players[player].cardsArray.splice(index, 1)
            },
            prepare (player, card) {
                return { payload: { player, card } }
            },
        },
        setRemainingCards (state, action) {
            state.remainingCards = action.payload
        },
        removeCardsOfRemovingCards (state, action) {
            let array = state.remainingCards
            action.payload.forEach((card) => {
                const dataCard = card.split("-")
                array[dataCard[1]] = array[dataCard[1]].filter((element) => element !== card)
            })
        },
        setContract (state, action) {
            state.contract = action.payload
        },
        setTakerContract (state, action) {
            state.takerContract = action.payload
        },
        setTeammate (state, action) {
            state.teammate = action.payload
        },
        setPlayersOrder (state, action) {
            state.playerOrder = action.payload
        },
        setChienOfPlayers: {
            reducer (state, action) {
                const { player, chien } = action.payload
                state.chienOfPlayers[player] = [...state.chienOfPlayers[player], ...chien]
            },
            prepare (player, chien) {
                return { payload: { player, chien } }
            }
        },
        setCardFoldInTheHand: {
            reducer (state, action) {
                const { card, player } = action.payload
                const cardsArray = state.dataOfPlayers.players[player].cardsArray
                cardsArray.push(card)
                let array = state.dataOfPlayers.players.middle.cardsArray.filter((element) => element !== card)
                state.dataOfPlayers.players.middle.cardsArray = array
                state.dataOfPlayers.players[player].cardsArray = sortArray(cardsArray)

            },
            prepare (player, card) {
                return { payload: { player, card } }
            }
        },
        setStartParty (state, action) {
            state.startParty = action.payload
        },
        setMadeDog (state, action) {
            state.madeDog = action.payload
        },
        setCardInFold: {
            reducer (state, action) {
                const { card, player } = action.payload
                const array = state.dataOfPlayers.players.middle.cardsArray
                array.push(card)
                const arrayPlayer = state.dataOfPlayers.players[player].cardsArray.filter((element) => element !== card)
                state.dataOfPlayers.players.middle.cardsArray = array
                state.dataOfPlayers.players[player].cardsArray = arrayPlayer
            },
            prepare (player, card) {
                return { payload: { player, card } }
            }
        },
        setShowTeammate (state, action) {
            state.showTeammate = action.payload
        },
        setTeams: {
            reducer (state, action) {
                const { team1, team2 } = action.payload
                state.teams = { team1, team2 }
            },
            prepare(team1, team2) {
                return { payload: { team1, team2 } }
            }
        },
        setKingChoose (state, action) {
            state.kingChoose = action.payload
        }
    }
})

export const {
    setNbOfPlayers,
    setDataOfPlayers,
    setShowField,
    setCoordinateOfField,
    setCardsPlayed,
    setChienRedux,
    deleteCardOfCardsPlayer,
    setRemainingCards,
    removeCardsOfRemovingCards,
    setContract,
    setTeammate,
    setTakerContract,
    setPlayersOrder,
    setChienOfPlayers,
    setCardFoldInTheHand,
    setStartParty,
    setMadeDog,
    setCardInFold,
    setShowTeammate,
    setKingChoose,
    setTeams,
} = game.actions

export default game.reducer