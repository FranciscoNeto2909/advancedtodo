import { Link } from "react-router-dom";
import { RiLoginBoxLine, RiLogoutBoxRLine } from "react-icons/ri";
import { AiOutlineLogout,AiOutlineLogin } from "react-icons/ai";
import logo from "../../images/logo.png";
import "./navbar.css";
import { useState } from "react";

export default function Navbar() {
  const [islogged, setIslogged] = useState(false);

  function handleClic() {
    setIslogged(!islogged)
  }
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
        {!islogged ? (
          <button className="navbar_footer_button" onClick={handleClic}>
            <span>Login</span>
            <AiOutlineLogin size={20} />
          </button>
        ) : (
          <button className="navbar_footer_button" onClick={handleClic}>
            <span>Logout</span>
            <AiOutlineLogout size={20} />
          </button>
        )}
      </div>
    </div>
  );
}
