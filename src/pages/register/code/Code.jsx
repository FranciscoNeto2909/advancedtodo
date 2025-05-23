import { useNavigate } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import Input from "../../../components/input/Input";
import Button from "../../../components/button/Button";
import { useState } from "react";
import { useSelector } from "react-redux";
import "./code.css";

export default function Code() {
  const Navigate = useNavigate();
  const [code, setCode] = useState("");
  const [codeError, setCodeError] = useState(false);
  const app = useSelector(data => data.App);
  function handleChangeCode(e) {
    setCode(e.target.value);
  }

  function handleSetCode(e) {
    e.preventDefault();
    if (code !== app.authCode) {
      setCodeError(true);
      setTimeout(() => {
        setCodeError(false);
      }, 2000);
    } else if (code === app.authCode) {
      setTimeout(() => {
        Navigate("/register/password");
      }, 1000);
    }
  }

  return (
    <div className="code">
      <div className="code_header">
        <button
          className="code_back_button"
          onClick={() => Navigate("/register")}
        >
          <AiOutlineArrowLeft size={26} />
        </button>
      </div>
      <div className="code_body">
        <div className="code_form-container">
          <h2>
            Digite o código de confirmação <br /> para continuar seu cadastro
          </h2>
          <form
            onSubmit={handleSetCode}
            className="code_form"
            autoComplete="off"
          >
            <div className="code_item">
              <label htmlFor="code" className="code_title">
                Código
              </label>
              <Input
                onChange={e => handleChangeCode(e)}
                type="text"
                id="code"
              />
              {codeError && <div className="error_text">Codigo inváliido!</div>}
            </div>
            <div className="code_buttons">
              <Button>Continue</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
