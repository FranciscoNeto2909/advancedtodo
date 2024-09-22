import { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import "./home.css";
import TasksContainer from "../../components/tasksContainer/TasksContainer";
import Wellcome from "../../components/welcome/Wellcome";

const initialTasks = [
  {
    name: "Guardar documentos",
    finished: false,
    importance: 3,
  },
  {
    name: "Limpar o birô",
    finished: false,
    importance: 2,
  },
  {
    name: "Beber café",
    finished: false,
    importance: 3,
  },
  {
    name: "atualizar sistema",
    finished: false,
    importance: 1,
  },
  {
    name: "Guardar documentos",
    finished: false,
    importance: 3,
  },
  {
    name: "Limpar o birô",
    finished: false,
    importance: 2,
  },
  {
    name: "Beber café",
    finished: false,
    importance: 3,
  },
  {
    name: "atualizar sistema",
    finished: false,
    importance: 1,
  },
];

export default function Home({ isLogged }) {
  const [tasks, setTasks] = useState(initialTasks);

  return (
    <div className="home">
      <div className="home_header">
        <div className="home_search">
          <input type="text" className="home_search_input" id="task_search" />
          <AiOutlineSearch size={26} className="task_search_icon" />
        </div>
      </div>
      <div className="home_body">
        {isLogged ? (
         <TasksContainer tasks={tasks}/> 
        ) : (
          <Wellcome />
        )}
      </div>
    </div>
  );
}
