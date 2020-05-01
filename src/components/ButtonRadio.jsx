import React from "react"

const ButtonRadio = ({ value, selectedValue, setValue }) => (
    <div className="radio-toolbar">
        <input
            type="radio"
            id={ value }
            checked={ value === selectedValue }
            value={ value }
            onChange={ (e) => setValue(e.target.value) }
        />
        <label htmlFor={ value }>{ value }</label>
    </div>
)

export default ButtonRadio