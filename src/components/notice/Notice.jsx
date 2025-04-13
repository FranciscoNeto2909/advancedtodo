import "./notice.css"

export default function Notice({text}) {

    return <>
        {text != "" && <div className="notice">{text}</div>}
    </>
}