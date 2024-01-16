export default function Terminal({ input }) {
    console.log(input);
    return (
        <div >
            {input.status === "warning" ? (<div data-prefix=">" className="text-warning text-wrap w-96 "><input type="text" placeholder={input.text} className="input input-bordered input-accent w-full max-w-xs" disabled /></div>) :
                input.status === "error" ? (<div data-prefix=">" className="text-error text-wrap"><input type="text" placeholder={input.text} className="input input-bordered input-error w-full max-w-xs" disabled></input></div>) :
                    (<div data-prefix=">" className="text-success text-wrap w-96"><input type="text" placeholder={input.text} className="input input-bordered input-success w-full max-w-xs" disabled /></div>)}
        </div>
    )

}