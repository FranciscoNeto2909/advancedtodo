import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import NewTask from "./pages/newTask/NewTask";
import Navbar from "./components/navBar/NavBar";
import Register from "./pages/register/Register";
import Password from "./pages/register/password/Password";
import Code from "./pages/register/code/Code";
import Notice from "./components/notice/Notice";
import "./App.css";
import { socket } from "./socket";
import { clearMsg, setMsg } from "./assets/AppSlice";
import { getTasks } from "./assets/tasksSlice";
import { getUser, logout } from "./assets/UserSlice";
function App() {
  const token = localStorage.getItem("token");
  const id = localStorage.getItem("userId");

  const dispatch = useDispatch();
  const app = useSelector((data) => data.App);

  const [isLogged, setIsLogged] = useState(false);
  const navigate = useNavigate();

  const [newUser, setNewUser] = useState({ name: "", email: "", password: "" });

  function handleLogin() {
    setIsLogged(true);
    navigate("/");
  }

  function handleLogout() {
    setIsLogged(false);
    navigate("/");
  }

  useEffect(() => {
    socket.on("receive_message", async (data) => {
      dispatch(setMsg(data.text));
    });

    return () => {
      socket.off("receive_message");
      setTimeout(() => {
        dispatch(clearMsg());
      }, 2000);
    };
  }, [socket]);

  useEffect(() => {
    dispatch(getTasks())
  }, [])

  useEffect(() => {
    navigate("/")
    if (token !== null && id !== null) {
      dispatch(getUser(id))
    } else {
      dispatch(logout())
    }
  }, [])

  return (
    <div className="app">
      {app.hasNotice && <Notice text={app.notice} />}
      <Navbar isLogged={isLogged} handleLogout={handleLogout} />
      <div className="app_pages">
        <Routes>
          <Route path="/" element={<Home isLogged={isLogged} />} />
          <Route path="/login" element={<Login handleLogin={handleLogin} />} />
          <Route path="/newTask" element={<NewTask />} />
          <Route
            path="/register"
            element={<Register newUser={newUser} setNewUser={setNewUser} />}
          />
          <Route path="/register/code" element={<Code />} />
          <Route
            path="/register/password"
            element={<Password newUser={newUser} />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
