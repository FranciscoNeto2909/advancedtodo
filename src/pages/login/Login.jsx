import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setMsg, clearMsg } from "../../assets/AppSlice";
import { login, getUser } from "../../assets/userSlice";
import { AiOutlineArrowLeft } from "react-icons/ai";
import Input from "../../components/input/Input";
import Button from "../../components/button/Button";
import "./login.css";

export default function Login() {
  const appUser = useSelector((data) => data.User);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;

  const [user, setUser] = useState({ email: "", password: "" });
  const [errors, setErros] = useState({
    email: false,
    password: false,
  });

  function handleChangeEmail(e) {
    setUser({ ...user, email: e.target.value });
  }
  function handleChangePassword(e) {
    setUser({ ...user, password: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (emailRegex.test(user.email) === false || user.email !== appUser.email) {
      setErros({ ...errors, email: true });
      setTimeout(() => {
        setErros({ ...errors, email: false });
      }, 2000);
    } else if (user.password == "" || user.password !== appUser.password) {
      console.log(user.password);
      console.log(appUser.password);
      setErros({ ...errors, password: true });
      setTimeout(() => {
        setErros({ ...errors, password: false });
      }, 2000);
    } else if (user) {
      dispatch(login(user))
        .then((e) => {
          if (e.payload.error == false) {
            const userId = e.payload.userId;
            localStorage.setItem("userId", userId.toString());
            dispatch(getUser(userId.toString()));
            navigate("/");
          }})}
  }

  function handleLogin() {
    if (user.email === "") {
      setErrors({ ...errors, email: true });
      setTimeout(() => {
        setErrors({ ...errors, email: false });
      }, 2000);
    } else if (!emailRegex.test(user.email)) {
      setErrors({ ...errors, email: true });
      setTimeout(() => {
        setErrors({ ...errors, email: false });
      }, 2000);
    } else if (user.password === "") {
      setErrors({ ...errors, password: true });
      setTimeout(() => {
        setErrors({ ...errors, password: false });
      }, 2000);
    } else if (inLoading == false) {
      setInLoading(true);
      dispatch(login(user))
        .then((e) => {
          if (e.payload.error == false) {
            const userId = e.payload.userId;
            localStorage.setItem("userId", userId.toString());
            dispatch(getUser(userId.toString()));
            setInLoading(false);
            dispatch(hideModal());
            dispatch(hideLogin());
            navigate("/");
          } else {
            setErrors({ ...errors, loginError: true });
            setTimeout(() => {
              setErrors({ ...errors, loginError: false });
            }, 2500);
          }
        })
        .finally(() => {
          setInLoading(false);
        });
    }
  }

  return (
    <div className="login">
      <div className="login_header">
        <button onClick={() => navigate("/")} className="login_back_button">
          <AiOutlineArrowLeft size={26} />
        </button>
      </div>
      <div className="login_body">
        <h2>Conecte-se para acessar suas tarefas</h2>
        <div className="login_form_container">
          <form
            autoComplete="off"
            className="login_form"
            onSubmit={handleSubmit}
          >
            <div className="login_item">
              <label className="login_item_title" htmlFor="email">
                Email
              </label>
              <Input
                onChange={(e) => handleChangeEmail(e)}
                type="email"
                id="email"
              />
              {errors.email && (
                <div className="error_text">Digite um email válido</div>
              )}
            </div>
            <div className="login_item">
              <label className="login_item_title" htmlFor="password">
                Senha
              </label>
              <Input
                type="password"
                onChange={(e) => handleChangePassword(e)}
                id="password"
              />
              {errors.password && (
                <div className="error_text">Senha invalida</div>
              )}
            </div>
            <div className="login_buttons">
              <Button className="login_button">Login</Button>
              <div className="login_register">
                <span>Não tem conta ?</span>
                <Link className="login_register_button" to="/register">
                  Cadastrar
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
