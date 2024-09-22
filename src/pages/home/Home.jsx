import { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import "./home.css";

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
];

export default function Home({isLogged}) {
  const [tasks, setTasks] = useState(initialTasks);

  return (
    <div className="home">
      <div className="home_header">
        <div className="home_search">
          <input type="text" className="home_search_input" id="task_search" />
          <AiOutlineSearch size={26} className="task_search_icon"/>
        </div>
      </div>
      <div className="home_body">
        { isLogged ?
            tasks.map((task) => (
                <div className="home_task">
                  <h3>{task.name}</h3>
                </div>
              )) 
          :  
          <div className="home_nologged">
            seja bem vindo faça o login para acessar as tarefas da sua equipe
          </div>
        }
      </div>
    </div>
  );
}
