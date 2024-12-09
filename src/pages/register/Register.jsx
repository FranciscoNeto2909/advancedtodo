import { useNavigate } from "react-router-dom";
import Input from "../../components/input/Input";
import "./register.css";
import { AiOutlineArrowLeft } from "react-icons/ai";
import Button from "../../components/button/Button";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { emailAuth } from "../../assets/UserSlice";
import { setAuthCode } from "../../assets/AppSlice";

export default function Register({ newUser, setNewUser }) {
  const [loading, setLoading] = useState(false);
  const emailRegex = new RegExp(
    "^[_a-z0-9-]+([_a-z0-9-]+)*@[a-z0-9-]+([a-z0-9-]+).([a-z]{2,3})$"
  );
  const [loginData, setLoginData] = useState({
    email: "",
    code: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [errors, setErrors] = useState({ name: false, email: false });

  function handleChangeName(e) {
    setNewUser({ ...newUser, name: e.target.value });
  }

  function handleChangeEmail(e) {
    setLoginData({ ...loginData, email: e.target.value });
  }

  async function handleValidateEmail(e) {
    e.preventDefault();
    setLoading(true);
    if (loginData.email === undefined || !emailRegex.test(loginData.email)) {
      setError(true);
      setTimeout(() => {
        setLoading(false);
        setError(false);
        setLoginData({ ...loginData, email: "" });
      }, 2000);
    } else if (emailRegex.test(loginData.email)) {
      setLoading(true);
      const code = await handleGenerateAuthCode();

      await dispatch(setAuthCode(code))
      dispatch(
        emailAuth({
          email: loginData.email,
          code: code,
        })
      ).then(() => {
        setLoading(false);
        setTimeout(() => {
          navigate("/register/code");
        }, 2000);
      });
    }
  }

  async function handleGenerateAuthCode() {
    let arr = "";
    for (let index = 0; index < 6; index++) {
      const random = Math.floor(Math.random() * 10);
      arr += random;
    }
    await setLoginData({ ...loginData, code: arr });
    return arr;
  }

  return (
    <div className="register">
      <div className="register_header">
        <button
          className="register_back_button"
          onClick={() => navigate("/login")}
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
            onSubmit={handleValidateEmail}
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
