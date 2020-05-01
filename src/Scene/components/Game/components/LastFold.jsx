import React, { useState } from "react"

import Modal from "components/Modal"
import Button from "components/Button"

const LastFold = ({ chienRedux }) => {

    const [modal, setModal] = useState(false)

    const toggle = () => setModal(!modal)

    const header = () => (
        <div>Last fold</div>
    )

    const body = () => {
        const lastFold = []
        for (let i = chienRedux.length - 5; i < chienRedux.length; i++) {
            lastFold.push(chienRedux[i])
        }
        return (
            <div>
                {
                    lastFold.map((card, index) => (
                        <div key={ index }>{ card }</div>
                    ))
                }
            </div>
        )
    }

    const footer = () => (
        <div>
            <Button
                color="grey"
                action={ toggle }
                text="Quitter"
            />
        </div>
    )

    return (
        <div>
            {
                (modal)
                    ? (
                        <Modal
                            header={ header() }
                            body={ body() }
                            footer={ footer() }
                            isOpen={ toggle }
                        />
                    )
                    : null
            }
            <Button
                color="grey"
                action={ toggle }
                text="Voir le dernier pli"
            />
        </div>
    )

}

export default LastFold