import React from "react"

const Button = ({ color, action, text }) => (
    <button
        className="button"
        onClick={ () => action() }
        style={ { backgroundColor: color } }
    >
        { text }
    </button>
)

export default Button