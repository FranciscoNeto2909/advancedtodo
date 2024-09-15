import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import NewTask from "./pages/newTask/NewTask";
import Navbar from "./components/navBar/NavBar";
import "./App.css";

function App() {
  return (
    <div className="app">
      <div className="app_navigation">
        <Navbar />
      </div>
      <div className="app_pages">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/newTask" element={<NewTask />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
