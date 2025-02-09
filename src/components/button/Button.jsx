import "./button.css";

export default function Button({
  handleClick,
  text,
  children,
  className,
  type,
}) {
  return (
    <button onClick={handleClick} type={type} className={`button ${className}`}>
      {text ? text : children}
    </button>
  );
}
