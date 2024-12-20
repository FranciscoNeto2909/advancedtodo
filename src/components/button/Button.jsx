import "./button.css";

export default function Button({ handleClick, text, children, className }) {
  return (
    <button onClick={handleClick} className={`button ${className}`}>
      {text ? text : children}
    </button>
  );
}
