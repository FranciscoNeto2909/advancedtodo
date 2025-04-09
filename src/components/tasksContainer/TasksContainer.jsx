import Task from "../task/Task";
import "./TasksContainer.css";
import { ImArrowLeft } from "react-icons/im";

export default function TasksContainer({ tasks }) {
  const sortedTask = [...tasks].sort((a, b) => a.urgency - b.urgency);

  return (
    <div className="tasks">
      <div className="tasks_container">
        {sortedTask.length > 0 ? (
          sortedTask.map((task, i) => <Task task={task} key={i} />)
        ) : (
          <>
            <ImArrowLeft className="home-arrow" size={26} />
            <div className="home-create-task">Crie uma tarefa</div>
          </>
        )}
      </div>
    </div>
  );
}
