import "./button.css";

export default function Home({ handleClick, text, children}) {
  return (
    <button onClick={handleClick} className="button">
      {text ? text : children}
    </button>
  );
}
