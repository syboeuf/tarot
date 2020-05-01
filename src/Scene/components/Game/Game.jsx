import React, { /*useState,*/ useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"

import { usePrepareGame } from "hooks/usePrepareGame"
import { setDataOfPlayers } from "reducers/gameReducer"

import Players from "./components/Players"
import Field from "./components/Field"
import LastFold from "./components/LastFold"
import Fold from "./components/Fold"
// import Contract from "./components/Contract"
// import Teammate from "./components/Teammate"

const Game = () => {

    const {
        nbOfPlayers, dataOfPlayers, playerName, chienRedux,
        madeDog, startParty,
    } = useSelector((state) => state.game)
    const [setArrayOfCards] = usePrepareGame(nbOfPlayers)
    // const [contract, setContract] = useState(false) // make true
    // const [teammate, setTeammate] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setDataOfPlayers(setArrayOfCards(nbOfPlayers)))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // const onClickContract = () => {
        // setContract(false)
        // setTeammate(true)
    // }

    // const onClickTeammate = () => {
        // setTeammate(false)
    // }
    
    return (
        <div>
            {
                (dataOfPlayers)
                    ? (
                        <div className="game_container">
                            {/*<Contract
                                onClickContract={ onClickContract }
                            />*/}
                            {/*<Teammate
                                onClickTeammate={ onClickTeammate }
                            />*/}
                            <LastFold chienRedux={ chienRedux } />
                            <Field />
                            <Fold
                                madeDog={ madeDog }
                                playerName={ playerName }
                                dataOfPlayers={ dataOfPlayers }
                            />
                            <Players
                                playerName={ playerName }
                                dataOfPlayers={ dataOfPlayers }
                                startParty={ startParty }
                            />
                        </div>
                    )
                    : <div />
            }
        </div>
    )

}

export default Game