import { useSelector } from "react-redux"

export const useCalculScore = () => {

    const { chienOfPlayers } = useSelector((state) => state.game)

    const getChienOfPlayer = (team) => {
        let chienOfTeam = []
        team.forEach((player) => {
            Object.entries(chienOfPlayers).forEach((entry) => {
                if (player === entry[0]) {
                    chienOfTeam = [...chienOfTeam, ...entry[1]]
                }
            })
        })
        return chienOfTeam
    }

    const calculScore = (team) => {
        const cardsTeam = getChienOfPlayer(team)
        const cardsWeak = []
        const cardsStrong = []
        cardsTeam.forEach((card) => {
            const dataCard = card.split("-")
            if ((+dataCard[0] >= 11 && +dataCard[0] <= 14 && dataCard[1] !== "atout")
                || ((+dataCard[0] === 1 || +dataCard[0] === 21 || +dataCard[0] === 22) && dataCard[1] === "atout")) {
                    cardsStrong.push(card)
            } else {
                cardsWeak.push(card)
            }
        })
        let score = 0
        let i
        for (i = 0; i < cardsStrong.length; i++) {
            const dataCard = cardsStrong[i].split("-")
            // A tester
            // switch (+dataCard[0]) {
            //     case 11:
            //         score += 2
            //     case 12:
            //         score += 3
            //     case 13:
            //         score += 4
            //     case 1 || +dataCard[0] >= 14:
            //         score += 5
            //     default:
            //         break
            // }
            if (+dataCard[0] === 11) {
                score += 2
            } else if (+dataCard[0] === 12) {
                score += 3
            } else if (+dataCard[0] === 13) {
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

    return [calculScore]

}