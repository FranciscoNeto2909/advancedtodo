import Task from "../task/Task";
import "./TasksContainer.css";

export default function TasksContainer({ tasks }) {
  return (
    <div className="tasks">
      <div className="tasks_container">
        {tasks.map((task, i) => (
          <Task task={task} key={i} />
        ))}
      </div>
    </div>
  );
}
