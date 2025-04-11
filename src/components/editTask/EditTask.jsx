import { AiOutlineClose } from "react-icons/ai";
import Button from "../button/Button";
import "./editTask.css";
import { useEffect, useState } from "react";
import Input from "../input/Input";
import { useDispatch } from "react-redux";
import { updateTask } from "../../assets/TasksSlice";
import { setMsg } from "../../assets/AppSlice";
import { useNavigate } from "react-router-dom";

export default function EditTask({ setEditingTask, task }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [newTask, setNewTask] = useState({ ...task });
  const [buttons, setButtons] = useState({
    b1: task.urgency == 1 ? true : false,
    b2: task.urgency == 2 ? true : false,
    b3: task.urgency == 3 ? true : false,
  });

  function handleEditTitle(e) {
    setNewTask({ ...newTask, title: e.target.value });
  }

  function handleEditDesc(e) {
    setNewTask({ ...newTask, desc: e.target.value });
  }

  function handleUrgencyButton(value) {
    if (value == "b1") {
      setNewTask({ ...newTask, urgency: 1 });
      setButtons({ b1: !buttons.b1, b2: false, b3: false });
    } else if (value == "b2") {
      setNewTask({ ...newTask, urgency: 2 });
      setButtons({ b1: false, b2: !buttons.b2, b3: false });
    } else {
      setNewTask({ ...newTask, urgency: 3 });
      setButtons({ b1: false, b2: false, b3: !buttons.b3 });
    }
  }

  function handleSaveTask(e) {
    e.preventDefault();
    dispatch(updateTask(newTask)).then(() =>
      dispatch(setMsg("Tarefa atualizada"))
    );
    setEditingTask(false)
    setTimeout(() => {
      navigate(0);
    }, 1000);
  }

  return (
    <div className="editTask">
      <div className="editTask-header">
        <Button
          onClick={() => setEditingTask(false)}
          className="editTask-close-button"
        >
          <AiOutlineClose />
        </Button>
      </div>
      <div className="editTask-body">
        <form className="editTask-form" action="" onSubmit={handleSaveTask}>
          <div className="editTask-item">
            <label htmlFor="title">Editar titulo</label>
            <Input
              id="title"
              onChange={handleEditTitle}
              value={newTask.title}
              type="text"
            />
          </div>
          <div className="editTask-item">
            <label htmlFor="desc">Editar Descrição</label>
            <Input
              id="desc"
              onChange={handleEditDesc}
              value={newTask.desc}
              type="text"
            />
          </div>
          <div className="editTask_urgency">
            <h3 className="editTask_urgency_title">Nivel de urgência</h3>
            <ul className="editTask_urgency_items">
              <li className="editTask_urgency_item">
                <input
                  id="b1"
                  onChange={() => handleUrgencyButton("b1")}
                  checked={buttons.b1}
                  className="editTask_urgency_check"
                  type="checkbox"
                />
                <span>Urgente</span>
              </li>
              <li className="editTask_urgency_item">
                <input
                  id="b2"
                  onChange={() => handleUrgencyButton("b2")}
                  checked={buttons.b2}
                  className="editTask_urgency_check"
                  type="checkbox"
                />
                <span>Pode esperar</span>
              </li>
              <li className="editTask_urgency_item">
                <input
                  id="b3"
                  onChange={() => handleUrgencyButton("b3")}
                  checked={buttons.b3}
                  className="editTask_urgency_check"
                  type="checkbox"
                />
                <span>Não tem pressa</span>
              </li>
            </ul>
          </div>
          <div className="editTask-item editTask-item--button">
            <Button className="editTask-save-button">Salvar</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
