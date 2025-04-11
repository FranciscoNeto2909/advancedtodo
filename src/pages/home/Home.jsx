import { AiOutlineSearch } from "react-icons/ai";
import "./home.css";
import TasksContainer from "../../components/tasksContainer/TasksContainer";
import Wellcome from "../../components/welcome/Wellcome";
import Input from "../../components/input/Input";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Loading from "../../components/loading/Loading";

export default function Home() {
  const isLogged = useSelector(data => data.User.user.isLogged);
  const [loading, setLoading] = useState(true);
  const [timeExpired, setTimeExpired] = useState(false);
  const tasks = useSelector(data => data.Tasks.tasks);

  setTimeout(() => {
    setTimeExpired(true)
  }, 3000);

  useEffect(() => {
    if (tasks.length || timeExpired) {
      setLoading(false);
    }
  }, [tasks, timeExpired]);

  return (
    <div className="home">
      <div className="home_header">
        <div className="home_search">
          <Input />
          <AiOutlineSearch size={26} className="task_search_icon" />
        </div>
      </div>
      <div className="home_body">
        {loading && <Loading />}
        {!loading &&
          (!isLogged ? <Wellcome /> : <TasksContainer tasks={tasks} />)}
      </div>
    </div>
  );
}
