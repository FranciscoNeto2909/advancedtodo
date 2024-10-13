import { useNavigate } from "react-router-dom";
import Input from "../../components/input/Input";
import "./register.css";
import { AiOutlineArrowLeft } from "react-icons/ai";
import Button from "../../components/button/Button";
export default function Register() {
  const Navigate = useNavigate();
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
          <form action="" autoComplete="off" className="register_form">
            <div className="register_item">
              <label htmlFor="name" className="register_title">
                Name
              </label>
              <Input type="text" id="name" />
            </div>
            <div className="register_item">
              <label htmlFor="email" className="register_title">
                Email
              </label>
              <Input type="text" id="email" />
            </div>
            <div className="register_buttons">
              <Button
                handleClick={() => {
                  Navigate("./code");
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
