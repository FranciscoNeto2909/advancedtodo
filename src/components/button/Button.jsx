export default function Home({ handleClick, text }) {
  return <button onClick={handleClick}>{text}</button>;
}
