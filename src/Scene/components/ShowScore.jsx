import React, { useState, useEffect, Fragment } from "react"
import { useSelector } from "react-redux"

import Paragraph from "components/Paragraph"

const ShowScore = () => {

    const { teams: { team1, team2 } } = useSelector((state) => state.game)
    const [scoreTeam1, setScoreTeam1] = useState([])
    const [scoreTeam2, setScoreTeam2] = useState([])

    useEffect(() => {
        setScoreTeam1(calculScore(team1))
        setScoreTeam2(calculScore(team2))
    })

    const displayPlayerName = (team) => (
        <Fragment>
            {
                team.map((player) => (
                    <Paragraph text={ player } />
                ))
            }
        </Fragment>
    )

    return (
        <div>
            <div>
                { displayPlayerName(team1) }
                <Paragraph text={ scoreTeam1 } />
            </div>
            <div>
                { displayPlayerName(team2) }
                <Paragraph text={ scoreTeam2 } />
            </div>
        </div>
    )

}

export default ShowScore