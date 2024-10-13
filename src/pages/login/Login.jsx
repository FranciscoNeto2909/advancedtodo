import Input from "../../components/input/Input";
import { AiOutlineArrowLeft } from "react-icons/ai";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/button/Button";

export default function Login({ handleLogin }) {
  const navigate = useNavigate();
  async function handleSubmit(e) {
    e.preventDefault();
    await handleLogin()
    navigate("/");
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
              <Input type="email" id="email" />
            </div>
            <div className="login_item">
              <label className="login_item_title" htmlFor="password">
                Senha
              </label>
              <Input type="password" id="password" />
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
