import { AiOutlineArrowLeft } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Input from "../../../components/input/Input";
import "./password.css";
import Button from "../../../components/button/Button";

export default function Password() {
  const Navigate = useNavigate();

  return (
    <div className="password">
      <div className="password_header">
        <button
          className="password_back_button"
          onClick={() => Navigate("/register")}
        >
          <AiOutlineArrowLeft size={26} />
        </button>
      </div>
      <div className="password_body">
        <h2>
          Crie sua conta e organize suas <br /> tarefas de forma simples e
          rapida
        </h2>
        <div className="password_form_container">
          <form action="" className="password_form">
            <div className="password_item">
              <label htmlFor="pass" className="password_title">
                Senha
              </label>
              <Input type="password" id="pass" />
            </div>
            <div className="password_item">
              <label htmlFor="confirm_pass" className="password_title">
                Repita a senha
              </label>
              <Input type="password" id="confirm_pass" />
            </div>
            <div className="password_buttons">
              <Button>Create account</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
