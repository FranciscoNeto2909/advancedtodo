import { AiOutlineClose, AiOutlineCheck, AiOutlineEdit } from "react-icons/ai";
import Button from "../button/Button";
import "./task.css"
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteTask, getTasks } from "../../slices/TasksSlice";
import { setMsg } from "../../slices/AppSlice";

export default function Task({ task,  setEditingTask, setTask }) {
  const dispatch = useDispatch()

  const [taskColor, setTaskColor] = useState("")

  function handleTaskColor(){
    if(task.urgency == 1){
      setTaskColor("task-urgency1")
    } else if(task.urgency == 2){
      setTaskColor("task-urgency2")
    } else if(task.urgency == 3) {
      setTaskColor("task-urgency3")
    }
  }

  function handleEditingTask() {
    setEditingTask(true)
    setTask(task)
  }

  function handleDeleteTask(msg) {
    dispatch(deleteTask(task.id))
    .then(() => dispatch(setMsg( msg == "delete" ? "Tarefa apagada" : "Tarefa concluida")))
    setTimeout(() => {
      dispatch(getTasks())
    }, 2500);
  }

  useEffect(() => {
    handleTaskColor()
  },[task])

  return (
    <div className={`task ${taskColor}`}>
      <h3 className="task_title">{task.title}</h3>
      <p className="task_desc">{task.desc}</p>
      <div className="task_buttons">
        <Button onClick={ () => handleDeleteTask("")}>
          <AiOutlineCheck size={26} className="task_icon_check" />
        </Button>
        <Button onClick={handleEditingTask}>
          <AiOutlineEdit size={26} className="task_icon_edit" />
        </Button>
        <Button onClick={() => handleDeleteTask("delete")}>
          <AiOutlineClose size={26} className="task_icon_close" />
        </Button>
      </div>
    </div>
  );
}
