"use client"
export default function CompileButton({ handleClick }) {

    return (
        <button className="btn btn-primary" onClick={handleClick}>Compile</button>
    )
}