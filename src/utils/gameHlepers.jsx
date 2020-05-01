export const playersOrderArray = ["player1", "player2", "player3", "player4", "player5"]

export const typesArray = [
    { limit: 14, name: "carreau" },
    { limit: 14, name: "coeur" },
    { limit: 14, name: "trefle" },
    { limit: 14, name: "pique" },
    { limit: 22, name: "atout" },
]

export const sortArray = (array) => {
    const arrayType = ["atout", "carreau", "coeur", "pique", "trefle"]
    let cardsArray = []
    let swap
    for (let i = 0; i < arrayType.length; i++) {
        let cardsTypeArray = array.filter((element) => element.split("-")[1] === arrayType[i])
        for (let j = 0; j < cardsTypeArray.length; j++) {
            if (j + 2 > cardsTypeArray.length) {
                break
            }
            const a = cardsTypeArray[j].split("-")
            const b = cardsTypeArray[j + 1].split("-")
            if (+a[0] > +b[0]) {
                swap = cardsTypeArray[j]
                cardsTypeArray[j] = cardsTypeArray[j + 1]
                cardsTypeArray[j + 1] = swap
                j = -1
            }
        }
        cardsArray = [...cardsArray, ...cardsTypeArray]
    }
    return cardsArray
}