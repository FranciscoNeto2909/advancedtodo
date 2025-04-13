import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { emitMsg, setMsg } from "../../slices/AppSlice";
import { login, getUser } from "../../slices/UserSlice";
import { AiOutlineArrowLeft } from "react-icons/ai";
import Input from "../../components/input/Input";
import Button from "../../components/button/Button";
import "./login.css";
import { socket_types } from "../../socket";

export default function Login() {
  const appUser = useSelector(data => data.User.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const emailRegex = new RegExp(
    "^[_a-z0-9-]+([_a-z0-9-]+)*@[a-z0-9-]+([a-z0-9-]+).([a-z]{2,3})$"
  );

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
    if (!emailRegex.test(user.email)) {
      setErros({ ...errors, email: true });
      setTimeout(() => {
        setErros({ ...errors, email: false });
      }, 2000);
    } else if (user.password == "") {
      setErros({ ...errors, password: true });
      setTimeout(() => {
        setErros({ ...errors, password: false });
      }, 2000);
    } else if (user) {
      dispatch(login(user)).then(e => {
        if (e.payload.error == false) {
          const userId = e.payload.userId;
          localStorage.setItem("userId", userId.toString());
          dispatch(getUser(userId.toString()))
          .then(e => {
            dispatch(
              emitMsg({
                type: socket_types.login,
                msg: {
                  type:socket_types.login,
                  text:"bem vindo",
                  name: e.payload.name,
                  id: e.payload.id,
                }
              })
            );
          });
          navigate("/");
        }
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
                onChange={e => handleChangeEmail(e)}
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
                onChange={e => handleChangePassword(e)}
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
