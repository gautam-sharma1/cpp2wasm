"use client"
export default function Button({ handleClick, text, disabled }) {

    return (
        <button className="btn btn-secondary" onClick={handleClick} disabled={disabled}>{text}</button>
    )
}