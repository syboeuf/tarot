import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { setTeammate } from "reducers/gameReducer"

import Modal from "components/Modal"
import ButtonRadio from "components/ButtonRadio"
import Button from "components/Button"

const kingArray = ["Carreau", "Coeur", "Pique", "Trefle"]

const Teammate = ({ onClickTeammate }) => {

    const [valueButtonRadio, setValueButtonRadio] = useState(kingArray[0])
    const dispatch = useDispatch()

    const onClick = () => {
        onClickTeammate()
        dispatch(setTeammate(valueButtonRadio, "player1"))
    }

    const modalHeader = () => (
        <div>Choose King</div>
    )

    const modalBody = () => (
        <div>
            {
                kingArray.map((king, index) => (
                    <ButtonRadio
                        key={ index }
                        value={ king }
                        selectedValue={ valueButtonRadio }
                        setValue={ setValueButtonRadio }
                    />
                ))
            }
        </div>
    )

    const modalFooter = () => (
        <div>
            <Button
                color="greu"
                action={ () => onClick() }
                text="Valider"
            />
        </div>
    )

    return (
        <div>
            <Modal
                header={ modalHeader() }
                body={ modalBody() }
                footer={ modalFooter() }
                isOpen={ onClickTeammate }
            />
        </div>
    )

}

export default Teammate