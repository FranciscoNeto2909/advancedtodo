import { useNavigate } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import Input from "../../../components/input/Input";
import Button from "../../../components/button/Button";
import "./code.css";

export default function Code() {
  const Navigate = useNavigate();
  return (
    <div className="code">
      <div className="code_header">
        <button className="code_back_button" onClick={() => Navigate("/register")}>
          <AiOutlineArrowLeft size={26} />
        </button>
      </div>
      <div className="code_body">
        <div className="code_form-container">
          <h2>
            Digite o código de confirmação <br /> para continuar seu cadastro
          </h2>
          <form action="" className="code_form">
            <div className="code_item">
              <label htmlFor="code" className="code_title">
                Código
              </label>
              <Input type="text" id="code" />
            </div>
            <div className="code_buttons">
              <Button
                handleClick={() => {
                  Navigate("/register/password");
                }}
              >
                Continue
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
