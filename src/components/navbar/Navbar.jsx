import { Link } from "react-router-dom";
import { AiOutlineLogout, AiOutlineLogin } from "react-icons/ai";
import logo from "../../images/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../assets/userSlice";
import "./navbar.css";

export default function Navbar() {
  const isLogged = useSelector((data) => data.User.isLogged);
  const dispatch = useDispatch();
  function handleLogout() {
    dispatch(logout());
  }

  return (
    <div className="navbar">
      <div className="navbar_logo">
        <Link to="/">
          <img src={logo} className="navbar_logo_img" alt="logo" />
        </Link>
      </div>
      <div className="navbar_menu">
        {isLogged && (
          <ul className="navbar_list">
            <li className="navbar_list_item">
              <Link to="/newTask">new task</Link>
            </li>
            <li className="navbar_list_item">
              <Link to="/users">users</Link>
            </li>
          </ul>
        )}
      </div>
      <div className="navbar_footer">
        {!isLogged ? (
          <Link to="/login" className="navbar_footer_button">
            <span>Login</span>
            <AiOutlineLogin size={20} />
          </Link>
        ) : (
          <button className="navbar_footer_button" onClick={handleLogout}>
            <span>Logout</span>
            <AiOutlineLogout size={20} />
          </button>
        )}
      </div>
    </div>
  );
}
