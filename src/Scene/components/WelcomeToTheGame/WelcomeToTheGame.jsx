import React, { useState } from "react"
import { withRouter } from "react-router-dom"
import { useDispatch } from "react-redux"
import { setNbOfPlayers } from "reducers/gameReducer"

import Button from "components/Button"
import Modal from "components/Modal"
import ButtonRadio from "components/ButtonRadio"
import Header from "components/Header"

const WelcomeToTheGame = ({ history }) => {

    const [modal, setModal] = useState(false)
    const [valueButtonRadio, setValueButtonRadio] = useState("3 joueurs")
    const dispatch = useDispatch()

    const toggle = () => setModal(!modal)
    
    const modalHeader = () => (
        <div className="newGame-header">Tarot</div>
    )
    
    const modalBody = () => (
        <div className="newGame-body" >
            <ButtonRadio
                value="3 joueurs"
                selectedValue={ valueButtonRadio }
                setValue={ setValueButtonRadio }
            />
            <ButtonRadio
                value="4 joueurs"
                selectedValue={ valueButtonRadio }
                setValue={ setValueButtonRadio }
            />
            <ButtonRadio
                value="5 joueurs"
                selectedValue={ valueButtonRadio }
                setValue={ setValueButtonRadio }
            />
        </div>
    )

    const launchGame = () => {
        dispatch(setNbOfPlayers(Number(valueButtonRadio.charAt(0))))
        history.push("/Game")
    }
    
    const modalFooter = () => (
        <div className="newGame-footer">
            <Button
                color="grey"
                action={ toggle }
                text="Annuler"
            />
            <Button
                color="grey"
                action={ launchGame }
                text="Créer une partie"
            />
        </div>
    )

    return (
        <div className="new_game_container">
            <Header />
            <div className="new_game_subcontainer">
                <div>
                    <Button
                        color="grey"
                        action={ toggle }
                        text="Nouvelle partie"
                    />
                </div>
                <div>
                    <img
                        src={ `${process.env.PUBLIC_URL}/cartes_tarot.png` }
                        alt="cartes_tarot"
                        className="new_game_img"
                    />
                </div>
            </div>
            {
                (modal)
                    ? (
                        <Modal
                            header={ modalHeader() }
                            body={ modalBody() }
                            footer={ modalFooter() }
                            isOpen={ toggle }
                        />
                    )
                    : null
            }
        </div>
    )

}

export default withRouter(WelcomeToTheGame)