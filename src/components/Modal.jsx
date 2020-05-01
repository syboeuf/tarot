import React, { useRef, Fragment } from "react"

import { useOnClickOutside } from "hooks/useOnClickOutside"

const Modal = ({
    isOpen, header, body, footer,
}) => {

    const ref = useRef()
    useOnClickOutside(ref, () => isOpen(false))

    const modalContainer = (component) => (
        <Fragment>{ component }</Fragment>
    )
    
    return (
        <div className="popup">
            <div ref={ ref } className="popupInner">
                { modalContainer(header) }
                <hr className="modalLine" />
                { modalContainer(body) }
                <hr className="modalLine" />
                { modalContainer(footer) }
            </div>
        </div>
    )
}

export default Modal