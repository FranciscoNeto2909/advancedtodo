import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import NewTask from "./pages/newTask/NewTask";
import Navbar from "./components/navbar/Navbar";
import Register from "./pages/register/Register";
import Password from "./pages/register/password/Password";
import Code from "./pages/register/code/Code";
import Notice from "./components/notice/Notice";
import { socket, SocketListener } from "./socket";
import { clearMsg, setMsg } from "./slices/AppSlice";
import { getTasks } from "./slices/TasksSlice";
import { getUser } from "./slices/UserSlice";
import Users from "./pages/users/Users";
import "./App.css";
import PrivateRoute from "./components/privateRoute/PrivateRoute";

function App() {
  const token = localStorage.getItem("token");
  const id = localStorage.getItem("userId");
  const dispatch = useDispatch();
  const app = useSelector(data => data.App);
  const current = useSelector(data => data.User.user);
  
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    isLogged: false,
  });

  useEffect(() => {
    SocketListener(dispatch, setMsg, current);
    return () => {
      socket.off("receive_message");
    };
  }, [current]);

  useEffect(() => {
    dispatch(getTasks());
    if (token !== null && id !== null) {
      dispatch(getUser(id));
    }
  }, []);

  useEffect(() => {
    let timer;
    if (app.hasNotice) {
      timer = setTimeout(() => {
        dispatch(clearMsg());
      }, 2500);
    }
    return () => clearTimeout(timer);
  }, [app.hasNotice]);

  return (
    <div className="app">
      {app.hasNotice && <Notice text={app.notice} />}
      <Navbar />
      <div className="app_pages">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<PrivateRoute>{<Profile />}</PrivateRoute>} />
          <Route
            path="/users"
            element={<PrivateRoute>{<Users />}</PrivateRoute>}
          />
          <Route path="/newTask" element={<PrivateRoute>{<NewTask />}</PrivateRoute>} />
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
