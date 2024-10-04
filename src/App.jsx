import { Route, Routes } from "react-router-dom";
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
  const [isLogged, setIsLogged] = useState(false);

  function handleLogin() {
    setIsLogged(!isLogged);
    console.log("login");
  }

  return (
    <div className="app">
      <Navbar isLogged={isLogged} handleLogin={handleLogin} />
      <div className="app_pages">
        <Routes>
          <Route path="/" element={<Home isLogged={isLogged} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/newTask" element={<NewTask />} />
          <Route path="/register" element={<Register />} />
          <Route path="/register/code" element={<Code />} />
          <Route path="/register/password" element={<Password />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
