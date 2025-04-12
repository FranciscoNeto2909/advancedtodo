import { useState } from "react";
import Task from "../task/Task";
import { ImArrowLeft } from "react-icons/im";
import EditTask from "../editTask/EditTask";
import "./tasksContainer.css";

export default function TasksContainer({ tasks }) {
  const sortedTask = [...tasks].sort((a, b) => a.urgency - b.urgency);
  const [editingTask, setEditingTask] = useState(false)
  const [task, setTask] = useState({})
  
  return (
    <div className="tasks">
      <div className="tasks_container">
        {sortedTask.length > 0 ? (
          sortedTask.map((task, i) => <Task task={task} setTask={setTask} setEditingTask={setEditingTask} key={i} />)
        ) : (
          <>
            <ImArrowLeft className="home-arrow" size={26} />
            <div className="home-create-task">Crie uma tarefa</div>
          </>
        )}
        {editingTask && <EditTask task={task} setEditingTask={setEditingTask} />}
      </div>
    </div>
  );
}
