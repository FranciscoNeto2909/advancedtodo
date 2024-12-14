import { Link } from "react-router-dom";
import { AiOutlineLogout, AiOutlineLogin, AiOutlineUser } from "react-icons/ai";
import { RiAddLargeLine } from "react-icons/ri";
import logo from "../../images/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../assets/userSlice";
import "./navbar.css";
import { HiOutlineUsers } from "react-icons/hi";

export default function Navbar() {
  const isLogged = useSelector((data) => data.User.isLogged);
  const userImg = useSelector((data) => data.User.image);
  const defImg =
    "https://www.pngall.com/wp-content/uploads/5/Profile-PNG-File.png";
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
              <RiAddLargeLine size={20} />
              <Link to="/newTask">new task</Link>
            </li>
            <li className="navbar_list_item">
              <HiOutlineUsers size={20} />
              <Link to="/users">users</Link>
            </li>
          </ul>
        )}
      </div>
      <div className="navbar_footer">
        <Link to="/profile">
          <img
            className="navbar_footer_img"
            src={userImg != undefined ? userImg : defImg}
            alt=""
          />
        </Link>
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
