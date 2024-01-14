export default function Terminal({ input }) {
    return (
        <div className="max-w-8">
            {input.map((text, idx) => {
                return (<div key={idx} data-prefix=">" className="text-warning text-wrap max-w-8"><code>{text}</code></div>)
            })}

        </div>
    )

}