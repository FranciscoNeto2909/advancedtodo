import { Link } from "react-router-dom";
import Button from "../button/Button";
import logo from "../../images/logo.png"
import "./navbar.css"
function HandleClick() {
  console.log("clicou");
}

export default function Navbar() {
  return (
    <div className="navbar">
      <div className="navbar_logo">
        <Link to="/">
          <img src={logo} className="navbar_logo_img" alt="logo" />
        </Link>
      </div>
      <div className="navbar_links">
        <Link to="/newTask">new task</Link>
      </div>
      <div className="navbar_footer">
        <Button text={"Logout"} handleClick={HandleClick} />
      </div>
    </div>
  );
}
