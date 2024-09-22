import { AiOutlineClose, AiOutlineCheck, AiOutlineEdit } from "react-icons/ai";
import Button from "../button/Button";
import "./task.css"

export default function Task({ task }) {
  return (
    <div className="task">
      <h3 className="task_title">{task.name}</h3>
      <div className="task_buttons">
        <Button onClick={() => {}}>
          <AiOutlineCheck size={26} className="task_icon_check" />
        </Button>
        <Button onClick={() => {}}>
          <AiOutlineEdit size={26} className="task_icon_edit" />
        </Button>
        <Button onClick={() => {}}>
          <AiOutlineClose size={26} className="task_icon_close" />
        </Button>
      </div>
    </div>
  );
}
