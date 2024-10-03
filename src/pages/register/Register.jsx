import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/input/Input";
import "./register.css";
import { AiOutlineArrowLeft } from "react-icons/ai";

export default function Register() {
  const Navigate = useNavigate();
  return (
    <div className="register">
      <div className="register_header">
        <button className="register_back_button" onClick={() => Navigate("/login")}>
          <AiOutlineArrowLeft size={26} />
        </button>
      </div>
      <div className="register_body">
        <form action="" className="register_form">
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
          <div className="register_item">
            <label htmlFor="code" className="register_title">
              Code
            </label>
            <Input type="text" id="code" />
          </div>
          <div className="register_button">
            <Link to="./password">Continue</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
