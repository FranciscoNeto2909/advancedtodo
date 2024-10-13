import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import NewTask from "./pages/newTask/NewTask";
import Navbar from "./components/navBar/NavBar";
import Register from "./pages/register/Register";
import { useState } from "react";
import "./App.css";
import Password from "./pages/register/password/Password";
import Code from "./pages/register/code/Code";

function App() {
  const Navigate = useNavigate();
  const [isLogged, setIsLogged] = useState(false);

  const [newUser, setNewUser] = useState({ name: "", email: "", password: "" });

  function handleLogin() {
    setIsLogged(true);
    Navigate("/");
  }

  function handleLogout() {
    setIsLogged(false);
    Navigate("/");
  }

  return (
    <div className="app">
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
