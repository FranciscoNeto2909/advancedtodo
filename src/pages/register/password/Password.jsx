import { AiOutlineArrowLeft } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Input from "../../../components/input/Input";
import Button from "../../../components/button/Button";
import { useState } from "react";
import { hash } from "bcryptjs";
import { createUser } from "../../../slices/UserSlice";
import { useDispatch } from "react-redux";
import "./password.css";
import { setMsg } from "../../../slices/AppSlice";

export default function Password({ newUser }) {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const [passwords, setPasswords] = useState({ password: "", rpPassword: "" });
  const [errors, setErrors] = useState({ password: false, rpPassword: false });

  function handleChangePassword(e) {
    setPasswords({ ...passwords, password: e.target.value });
  }

  function handleChangeRpPassword(e) {
    setPasswords({ ...passwords, rpPassword: e.target.value });
  }

  async function handleCreateAccount(e) {
    e.preventDefault();
    if (passwords.password === "" || passwords.password.length < 4) {
      setErrors({ ...errors, password: true });
      setTimeout(() => {
        setErrors({ ...errors, password: false });
      }, 2000);
    } else if (passwords.rpPassword !== passwords.password) {
      setErrors({ ...errors, rpPassword: true });
      setTimeout(() => {
        setErrors({ ...errors, rpPassword: false });
      }, 2000);
    } else {
      const hashedPassword = await hash(passwords.password, 8);
      dispatch(createUser({ ...newUser, password: hashedPassword }));
      dispatch(setMsg("Conta criada com sucesso"));
      setTimeout(() => {
        Navigate("/login");
      }, 2500);
    }
  }

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
          <form
            onSubmit={handleCreateAccount}
            className="password_form"
            autoComplete="off"
          >
            <div className="password_item">
              <label htmlFor="pass" className="password_title">
                Senha
              </label>
              <Input
                onChange={(e) => handleChangePassword(e)}
                type="password"
                id="pass"
              />
              {errors.password && (
                <div className="error_text">Senha muito curta!</div>
              )}
            </div>
            <div className="password_item">
              <label htmlFor="confirm_pass" className="password_title">
                Repita a senha
              </label>
              <Input
                onChange={(e) => handleChangeRpPassword(e)}
                type="password"
                id="confirm_pass"
              />
              {errors.rpPassword && (
                <div className="error_text">As senhas não coincidem!</div>
              )}
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
