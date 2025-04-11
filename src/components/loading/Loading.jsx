import "./loading.css";
import logo from "../../images/logo.png"
export default function () {

    return(
        <div className="loading">
            <div className="loader">
                <img className="loader-img" src={logo} alt="" />
            </div>
        </div>
    )
}
