import { AiOutlineSearch } from "react-icons/ai";
import "./home.css";
import TasksContainer from "../../components/tasksContainer/TasksContainer";
import Wellcome from "../../components/welcome/Wellcome";
import Input from "../../components/input/Input";
import { useSelector } from "react-redux";

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

export default function Home() {
  // const [tasks, setTasks] = useState(initialTasks);
  const isLogged = useSelector((data) => data.User.isLogged);
  const tasks = useSelector((data) => data.Tasks.tasks);

  return (
    <div className="home">
      <div className="home_header">
        <div className="home_search">
          <Input />
          <AiOutlineSearch size={26} className="task_search_icon" />
        </div>
      </div>
      <div className="home_body">
        {isLogged ? (
          <TasksContainer tasks={tasks.length > 0 ? tasks : initialTasks} />
        ) : (
          <Wellcome />
        )}
      </div>
    </div>
  );
}
