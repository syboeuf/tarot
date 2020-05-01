import React from "react"
import { useDispatch } from "react-redux"
import { setContract } from "reducers/gameReducer"


import Modal from "components/Modal"
import Button from "components/Button"

const contractsArray = [
    "Petite",
    "Pouce",
    "Garde",
    "Garde-sang",
    "Garde-contre",
]

const Contract = ({ onClickContract }) => {

    const dispatch = useDispatch()

    const onClick = (textContract) => {
        onClickContract()
        dispatch(setContract(textContract))
    }

    const modalHeader = () => (
        <div>Contract</div>
    )

    const modalBody = () => (
        <div>
            {
                contractsArray.map((contract) => (
                    <Button
                        color="grey"
                        action={ () => onClick(contract) }
                        text={ contract }
                    />
                ))
            }
        </div>
    )

    const modalFooter = () => (
        <div>A voir</div>
    )

    return (
        <div>
            <Modal
                header={ modalHeader() }
                body={ modalBody() }
                footer={ modalFooter() }
                isOpen={ onClickContract }
            />
        </div>
    )

}

export default Contract