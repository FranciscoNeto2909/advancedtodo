import { Link } from "react-router-dom";
import Switch from "../switch/Switch";
import Button from "../button/Button";
import "./navbar.css"
function HandleClick() {
  console.log("clicou");
}

export default function Navbar() {
  return (
    <div className="navbar">
      <div className="navbar_logo">
        <Link to="/">
          <img src="" alt="logo" />
        </Link>
      </div>
      <div className="navbar_links">
        <Link to="/newTask">new task</Link>
      </div>
      <div className="navbar_footer">
        <Switch handleClick={() => {}}/>
        <Button text={"Logout"} handleClick={HandleClick} />
      </div>
    </div>
  );
}
