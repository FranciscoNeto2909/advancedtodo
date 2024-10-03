import Input from "../../components/input/Input";
import { AiOutlineArrowLeft } from "react-icons/ai";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
export default function Login() {
  const navigate = useNavigate();

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
            className="login_form"
            action="submit"
            onSubmit={() => {
              navigate("/");
            }}
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
              <button className="login_button">Login</button>
              <span>Não tem conta ?</span>
              <Link className="login_register" to="/register">
                Cadastrar
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
