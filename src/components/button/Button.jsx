import "./button.css";

export default function Button({ handleClick, text, children }) {
  return (
    <button onClick={handleClick} className="button">
      {text ? text : children}
    </button>
  );
}
