import { AiOutlineSearch } from "react-icons/ai";
import "./home.css";
import TasksContainer from "../../components/tasksContainer/TasksContainer";
import Wellcome from "../../components/welcome/Wellcome";
import Input from "../../components/input/Input";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export default function Home() {
  const isLogged = useSelector(data => data.User.isLogged);
  const tasks = useSelector(data => data.Tasks.tasks);

  useEffect(() => {}, [tasks]);

  return (
    <div className="home">
      <div className="home_header">
        <div className="home_search">
          <Input />
          <AiOutlineSearch size={26} className="task_search_icon" />
        </div>
      </div>
      <div className="home_body">
        {!isLogged ? <Wellcome /> : <TasksContainer tasks={tasks} />}
      </div>
    </div>
  );
}
