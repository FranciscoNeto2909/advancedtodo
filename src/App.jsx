import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import NewTask from "./pages/newTask/NewTask";
import Navbar from "./components/navBar/NavBar";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [isLogged, setIsLogged] = useState(false);

  function handleLogin() {
    setIsLogged(!isLogged);
    console.log("login")
  }
   
  return (
    <div className="app">
      <Navbar isLogged={isLogged} handleLogin={handleLogin} />
      <div className="app_pages">
        <Routes>
          <Route path="/" element={<Home isLogged={isLogged} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/newTask" element={<NewTask />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
