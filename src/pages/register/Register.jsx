import { useNavigate } from "react-router-dom";
import Input from "../../components/input/Input";
import "./register.css";
import { AiOutlineArrowLeft } from "react-icons/ai";
import Button from "../../components/button/Button";
import { useState } from "react";

export default function Register({newUser, setNewUser}) {
  const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;

  const Navigate = useNavigate();
  const [errors, setErrors] = useState({ name: false, email: false });

  function handleChangeName(e) {
    setNewUser({ ...newUser, name: e.target.value });
  }

  function handleChangeEmail(e) {
    setNewUser({ ...newUser, email: e.target.value });
  }

  function handleSendCode(e) {
    e.preventDefault();
    if (newUser.name === "") {
      setErrors({ ...errors, name: true });
      setTimeout(() => {
        setErrors({ ...errors, name: false });
      }, 2000);
    } else if (emailRegex.test(newUser.email) === false) {
      setErrors({ ...errors, email: true });
      setTimeout(() => {
        setErrors({ ...errors, email: false });
      }, 2000);
    } else{
      console.log("Codigo enviado status:200")
      console.log(newUser)
      setTimeout(() => {
        Navigate("./code")
      }, 1000);
    }
  }

  return (
    <div className="register">
      <div className="register_header">
        <button
          className="register_back_button"
          onClick={() => Navigate("/login")}
        >
          <AiOutlineArrowLeft size={26} />
        </button>
      </div>
      <div className="register_body">
        <div className="register_form-container">
          <h2>
            Digite seu nome e email para <br /> receber o codigo de confirmação
          </h2>
          <form
            onSubmit={handleSendCode}
            autoComplete="off"
            className="register_form"
          >
            <div className="register_item">
              <label htmlFor="name" className="register_title">
                Name
              </label>
              <Input
                onChange={(e) => handleChangeName(e)}
                type="text"
                id="name"
              />
              {errors.name && (
                <div className="error_text">Preencha este campo!</div>
              )}
            </div>
            <div className="register_item">
              <label htmlFor="email" className="register_title">
                Email
              </label>
              <Input
                onChange={(e) => handleChangeEmail(e)}
                type="text"
                id="email"
              />
              {errors.email && (
                <div className="error_text">Digite um email válido!</div>
              )}
            </div>
            <div className="register_buttons">
              <Button>Continue</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
