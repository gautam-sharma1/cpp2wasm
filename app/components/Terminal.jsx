export default function Terminal({ input }) {
    console.log(input);
    return (
        <div >
            {input.status === "warning" ? (<div data-prefix=">" className="text-warning text-wrap w-96 "><code>{input.text}</code></div>) :
                input.status === "error" ? (<div data-prefix=">" className="text-error text-wrap"><textarea className="textarea w-96 " disabled>{input.text}</textarea></div>) :
                    (<div data-prefix=">" className="text-success text-wrap w-96"><code>{input.text}</code></div>)}
            {/* {
                if (text[0] === "warning") {
                    return (<div key={idx} data-prefix=">" className="text-warning text-wrap max-w-8"><code>{text[1]}</code></div>)
                }
            else if (text[0] === "error") {
                    return (<div key={idx} data-prefix=">" className="text-error text-wrap max-w-8"><code>{text[1]}</code></div>)
                }
            else {
                    return (<div key={idx} data-prefix=">" className="text-success text-wrap max-w-8"><code>{text[1]}</code></div>)
                }
            { */}


        </div>
    )

}