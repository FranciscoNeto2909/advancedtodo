import "./button.css";

export default function Button({
  onClick,
  text,
  children,
  className,
  type,
}) {
  return (
    <button onClick={onClick} type={type} className={`button ${className}`}>
      {text ? text : children}
    </button>
  );
}
