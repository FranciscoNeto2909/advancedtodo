import { useState } from "react";
import Button from "../../components/button/Button";
import Input from "../../components/input/Input";
import "./newTask.css";

export default function NewTask() {
  const [b1, setB1] = useState(false);
  const [b2, setB2] = useState(false);
  const [b3, setB3] = useState(false);
  const [urgency, setUrgency] = useState(null);
  function handleUrgencyButton(id) {
    const states = { b1: id === "b1", b2: id === "b2", b3: id === "b3" };
    setB1(states.b1);
    setB2(states.b2);
    setB3(states.b3);

    if (states.b1 === true) {
      setUrgency(1);
    } else if (states.b2 === true) {
      setUrgency(2);
    } else {
      setUrgency(3);
    }
    console.log(urgency)
  }

  return (
    <div className="newTask">
      <div className="newTask_header"></div>
      <div className="newTask_body">
        <div className="newTask_form-container">
          <form action="" className="newTask_form">
            <div className="newTask_item">
              <label htmlFor="name" className="newTask_title">
                Titulo
              </label>
              <Input type="text" id="name" />
            </div>
            <div className="newTask_item">
              <label htmlFor="name" className="newTask_title">
                Descrição
              </label>
              <Input type="text" id="name" />
            </div>
            <div className="newTask_urgency">
              <h3 className="newTask_urgency_title">Nivel de urgência</h3>
              <ul className="newTask_urgency_items">
                <li className="newTask_urgency_item">
                  <input
                    id="b1"
                    onClick={() => handleUrgencyButton("b1")}
                    checked={b1}
                    className="newTask_urgency_check"
                    type="checkbox"
                  />
                  <span>Urgente</span>
                </li>
                <li className="newTask_urgency_item">
                  <input
                    id="b2"
                    onClick={() => handleUrgencyButton("b2")}
                    checked={b2}
                    className="newTask_urgency_check"
                    type="checkbox"
                  />
                  <span>Pode esperar</span>
                </li>
                <li className="newTask_urgency_item">
                  <input
                    id="b3"
                    onClick={() => handleUrgencyButton("b3")}
                    checked={b3}
                    className="newTask_urgency_check"
                    type="checkbox"
                  />
                  <span>Não tem pressa</span>
                </li>
              </ul>
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
