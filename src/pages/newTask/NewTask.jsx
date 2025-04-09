import { useState } from "react";
import Button from "../../components/button/Button";
import Input from "../../components/input/Input";
import "./newTask.css";
import { postTask } from "../../assets/tasksSlice";
import { useDispatch } from "react-redux";
 
export default function NewTask() {
  const dispatch = useDispatch()
  const [newTask, setNewTask] = useState({
    title: "",
    desc: "",
    urgency: 3,
  });

  const [errors, setErrors] = useState({
    title: false,
    desc: false,
    urgency: false,
  });

  const [b1, setB1] = useState(false);
  const [b2, setB2] = useState(false);
  const [b3, setB3] = useState(false);

  function handleUrgencyButton(id) {
    const states = { b1: id === "b1", b2: id === "b2", b3: id === "b3" };
    setB1(states.b1);
    setB2(states.b2);
    setB3(states.b3);

    if (states.b1 === true) {
      setNewTask({ ...newTask, urgency: 1 });
    } else if (states.b2 === true) {
      setNewTask({ ...newTask, urgency: 2 });
    } else {
      setNewTask({ ...newTask, urgency: 3 });
    }
  }

  function handleChangeTitle(e) {
    setNewTask({ ...newTask, title: e.target.value });
  }

  function handleChangeDesc(e) {
    setNewTask({ ...newTask, desc: e.target.value });
  }

  function handleCreateNewTask(e) {
    if (newTask.title === "") {
      setErrors({ ...errors, title: true });
      setTimeout(() => {
        setErrors({ ...errors, title: false });
      }, 2000);
    } else if (newTask.desc === "") {
      setErrors({ ...errors, desc: true });
      setTimeout(() => {
        setErrors({ ...errors, desc: false });
      }, 2000);
    } else if (newTask.urgency === "") {
      setErrors({ ...errors, urgency: true });
      setTimeout(() => {
        setErrors({ ...errors, urgency: false });
      }, 2000);
    } else {
      console.log("tarefa criada status:200");
      dispatch(postTask(newTask))
    }
  }

  return (
    <div className="newTask">
      <div className="newTask_header"></div>
      <div className="newTask_body">
        <div className="newTask_form-container">
          <form
            action=""
            onSubmit={handleCreateNewTask}
            className="newTask_form"
            autoComplete="off"
          >
            <h2 className="newTask_form_title">Crie sua tarefa</h2>
            <div className="newTask_item">
              <label htmlFor="title" className="newTask_title">
                Titulo
              </label>
              <Input
                value={newTask.title}
                onChange={e => handleChangeTitle(e)}
                type="text"
                id="title"
              />
              {errors.title && (
                <div className="error_text">Escreva um titulo</div>
              )}
            </div>

            <div className="newTask_item">
              <label htmlFor="desc" className="newTask_title">
                Descrição
              </label>
              <Input
                value={newTask.desc}
                onChange={e => handleChangeDesc(e)}
                type="text"
                id="desc"
              />
              {errors.desc && (
                <div className="error_text">Escreva uma descrição</div>
              )}
            </div>

            <div className="newTask_urgency">
              <h3 className="newTask_urgency_title">Nivel de urgência</h3>
              <ul className="newTask_urgency_items">
                <li className="newTask_urgency_item">
                  <input
                    id="b1"
                    onChange={() => handleUrgencyButton("b1")}
                    checked={b1}
                    className="newTask_urgency_check"
                    type="checkbox"
                  />
                  <span>Urgente</span>
                </li>
                <li className="newTask_urgency_item">
                  <input
                    id="b2"
                    onChange={() => handleUrgencyButton("b2")}
                    checked={b2}
                    className="newTask_urgency_check"
                    type="checkbox"
                  />
                  <span>Pode esperar</span>
                </li>
                <li className="newTask_urgency_item">
                  <input
                    id="b3"
                    onChange={() => handleUrgencyButton("b3")}
                    checked={b3}
                    className="newTask_urgency_check"
                    type="checkbox"
                  />
                  <span>Não tem pressa</span>
                </li>
              </ul>
              {errors.urgency && (
                <div className="error_text">selecione a importancia</div>
              )}
            </div>
            <div className="newTask_button">
              <Button>Criar</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
