import { Link, useNavigate } from "react-router-dom";
import { AiOutlineLogout, AiOutlineLogin, AiOutlineUser } from "react-icons/ai";
import { RiAddLargeLine } from "react-icons/ri";
import logo from "../../images/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { logout, userLogout } from "../../assets/userSlice";
import "./navbar.css";
import { HiOutlineUsers } from "react-icons/hi";
import { useEffect, useState } from "react";
import { serverUrl } from "../../assets/api";

export default function Navbar() {
  const defImg =
    "https://www.pngall.com/wp-content/uploads/5/Profile-PNG-File.png";
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [image, setImage] = useState(defImg);
  const user = useSelector(data => data.User.user);

  function handleLogout() {
    dispatch(userLogout(user.id));
    navigate(0);
    setImage(defImg);
  }

  function handleSetUserImage() {
    setImage(`${serverUrl}profile/${user.image}`);
  }

  useEffect(() => {
    if (user.isLogged) {
      handleSetUserImage();
    }
  }, [user.image]);

  return (
    <div className="navbar">
      <div className="navbar_logo">
        <Link to="/">
          <img src={logo} className="navbar_logo_img" alt="logo" />
        </Link>
      </div>
      <div className="navbar_menu">
        {user.isLogged && (
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
        <Link to={user.isLogged ? "/profile" : "/login"}>
          <img
            className="navbar_footer_img"
            src={image != undefined ? image : defImg}
            alt=""
          />
        </Link>
        {!user.isLogged ? (
          <Link to="/login" className="navbar_footer_button">
            <span>Login</span>
            <AiOutlineLogin size={20} />
          </Link>
        ) : (
          <Link to="/" className="navbar_footer_button" onClick={handleLogout}>
            <span>Logout</span>
            <AiOutlineLogout size={20} />
          </Link>
        )}
      </div>
    </div>
  );
}
