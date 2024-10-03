import { AiOutlineArrowLeft } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Input from "../../../components/input/Input";
import "./password.css";

export default function Password() {
  const Navigate = useNavigate();

  return (
    <div className="password">
      <div className="password_header">
        <button className="password_back_button" onClick={() => Navigate("/register")}>
          <AiOutlineArrowLeft size={26} />
        </button>
      </div>
      <div className="password_body">
        <form action="" className="password">
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
          <button>Create account</button>
        </form>
      </div>
    </div>
  );
}
