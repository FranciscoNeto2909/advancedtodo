import "./input.css"

export default function Input({type, id, onChange, value}) {
    return(
        <input id={id} autoComplete="off" className="input" type={type} onChange={onchange} value={value} />
    )
}