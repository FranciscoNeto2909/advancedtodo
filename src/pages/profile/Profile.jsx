import { useDispatch, useSelector } from "react-redux";
import { FaCameraRotate } from "react-icons/fa6";
import {
  emailAuth,
  getUser,
  setUserImage,
  updateUser,
} from "../../slices/UserSlice";
import { serverUrl } from "../../assets/api";
import { useEffect, useState } from "react";
import "./profile.css";
import Button from "../../components/button/Button";
import Input from "../../components/input/Input";
import { setAuthCode, setMsg } from "../../slices/AppSlice";
import { hash } from "bcryptjs";

export default function Profile() {
  const [image, setImage] = useState(undefined);
  const [nameVisib, setNameVisb] = useState(false);
  const [passVisib, setPassVisib] = useState(false);
  const [rpPassVisib, setRpPassVisib] = useState(false);
  const [emailVisib, setEmailVisb] = useState(false);
  const [emailSended, setEmailSended] = useState(false);
  const [code, setCode] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [codeError, setCodeError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passError, setPassError] = useState(false);

  const app = useSelector(data => data.App);
  const user = useSelector(data => data.User.user);

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    image: "",
    password: "",
    rpPassword: "",
  });

  const dispatch = useDispatch();
  const emailRegex = new RegExp(
    "^[_a-z0-9-]+([_a-z0-9-]+)*@[a-z0-9-]+([a-z0-9-]+).([a-z]{2,3})$"
  );
  const defImg =
    "https://www.pngall.com/wp-content/uploads/5/Profile-PNG-File.png";

  async function handleChangeUserImage(e) {
    const userId = localStorage.getItem("userId");
    const img = await e.target.files[0];
    
    dispatch(setUserImage(img)).then(e => {
      dispatch(getUser(userId));
      setUserImage(`${serverUrl}profile/${user.image}`);
    });
  }

  function handleSetUserImage() {
    setImage(`${serverUrl}profile/${user.image}`);
  }

  async function handleUpdateUser() {
    setNameVisb(false);
    setEmailVisb(false);
    setPassVisib(false);

    const hashedPassword = await hash(userData.password, 8);
    await dispatch(
      updateUser({
        name: userData.name,
        email: userData.email,
        image: "",
        oldPassword: user.password,
        newPassword: userData.password != "" ? hashedPassword : "",
      })
    ).then(e => dispatch(setMsg(e.payload.msg)));
    dispatch(getUser(localStorage.getItem("userId")));
  }

  function handleChangeCode(e) {
    setCode(e.target.value);
  }

  async function handleGenerateAuthCode() {
    let arr = "";
    for (let index = 0; index < 6; index++) {
      const random = Math.floor(Math.random() * 10);
      arr += random;
    }
    await setCode(arr);
    dispatch(setAuthCode(arr));
    return arr;
  }

  async function handleSendAuthCode(e) {
    e.preventDefault();
    if (userData.email === user.email) {
      setEmailError(true);
      setErrorMsg("Este já é o seu email!");
      setTimeout(() => {
        setEmailError(false);
      }, 2000);
    } else if (!emailRegex.test(userData.email)) {
      setEmailError(true);
      setErrorMsg("Digite um email válido!");
      setTimeout(() => {
        setEmailError(false);
      }, 2000);
    } else {
      const generatedCode = await handleGenerateAuthCode();
      await dispatch(
        emailAuth({
          email: userData.email,
          code: generatedCode,
        })
      ).then(() => {
        setEmailSended(true);
      });
    }
  }

  function handleValidadeCode(e) {
    e.preventDefault();
    if (code !== app.authCode) {
      setCodeError(true);
      setTimeout(() => {
        setCodeError(false);
      }, 2000);
    } else if (code === app.authCode) {
      handleUpdateUser();
      setEmailSended(false);
      setUserData({ ...userData, email: "" });
    }
  }

  function handleContinue(e) {
    e.preventDefault();
    if (userData.password == "") {
      setPassError(true);
      setErrorMsg("Este campo não pode estar vazio");
      setTimeout(() => {
        setPassError(false);
        setErrorMsg("");
      }, 2000);
    } else {
      setRpPassVisib(true);
    }
  }

  function handleChangePassword(e) {
    e.preventDefault();
    if (rpPassVisib && userData.rpPassword == "") {
      setPassError(true);
      setErrorMsg("Este campo não pode estar vazio");
      setTimeout(() => {
        setPassError(false);
        setErrorMsg("");
      }, 2000);
    } else if (userData.password != userData.rpPassword) {
      setPassError(true);
      setErrorMsg("As senhas não coincidem");
      setTimeout(() => {
        setPassError(false);
        setErrorMsg("");
      }, 2000);
    } else {
      handleUpdateUser();
      setUserData({ ...userData, password: "", rpPassword: "" });
    }
  }

  useEffect(() => {
    handleSetUserImage();
  }, [user.image]);

  return (
    <div className="profile">
      <div className="profile_header"></div>
      <div className="profile_body">
        <div className="profile_image">
          <label htmlFor="img" className="profile-container">
            <img
              src={image != undefined || "" ? image : defImg}
              className="profile-img"
              alt=""
            />
            <FaCameraRotate size={28} className="profile-cam" />
            <input
              type="file"
              id="img"
              className="profile-inpt"
              accept="image/*"
              alt="user profile"
              onChange={e => handleChangeUserImage(e)}
            />
          </label>
        </div>
        <div className="profile-userdata">
          <div className="profile-name">
            {nameVisib ? (
              <h3 className="profile-name-desc">
                Este é o nome que aparecerá para outros usuários
              </h3>
            ) : (
              <h2 className="profile-name-user">{user.name}</h2>
            )}
            {nameVisib && (
              <form className="profile-form" onSubmit={handleUpdateUser}>
                <div className="profile-form-name">
                  <div className="input-group">
                    <label className="lbl" htmlFor="name">
                      Name
                    </label>
                    <Input
                      id="name"
                      type="text"
                      className="inpt"
                      autoComplete="none"
                      placeholder=" "
                      required
                      value={userData.name}
                      onChange={e =>
                        setUserData({ ...userData, name: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="profile-form-buttons">
                  <Button
                    className="profile-btn-cancel"
                    onClick={() => setNameVisb(!nameVisib)}
                    text="Cancelar"
                  />
                  <Button
                    className="profile-btn-save"
                    type="submit"
                    text="Salvar"
                  />
                </div>
              </form>
            )}
            {!nameVisib && (
              <Button
                className="profile-btn-edit"
                onClick={() => setNameVisb(!nameVisib)}
                text="Editar"
              />
            )}
          </div>
          <div className="profile-email">
            {emailVisib ? (
              <h3 className="profile-email-desc">
                Você receberá um código no email digitado para confirmar sua
                identidade
              </h3>
            ) : (
              <h2 className="profile-email-user">{user.email}</h2>
            )}
            {emailVisib && !emailSended && (
              <form className="profile-form" onSubmit={handleSendAuthCode}>
                <div className="profile-form-email">
                  <div className="input-group">
                    <label className="lbl" htmlFor="emal">
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      className="inpt"
                      autoComplete="none"
                      placeholder=" "
                      required
                      value={userData.email}
                      onChange={e =>
                        setUserData({ ...userData, email: e.target.value })
                      }
                    />
                    {emailError && <p className="error-txt">{errorMsg}</p>}
                  </div>
                </div>
                <div className="profile-form-buttons">
                  <Button
                    className="profile-btn-cancel"
                    onClick={() => setEmailVisb(!emailVisib)}
                    text={"Cancelar"}
                  />
                  <Button
                    className="profile-btn-save"
                    type="submit"
                    text="Enviar"
                  />
                </div>
              </form>
            )}
            {emailSended && (
              <form onSubmit={handleValidadeCode} autoComplete="off">
                <div className="code_item">
                  <label htmlFor="code" className="code_title">
                    Código
                  </label>
                  <Input
                    onChange={e => handleChangeCode(e)}
                    type="text"
                    id="code"
                  />
                  {codeError && (
                    <div className="error_text">Codigo inváliido!</div>
                  )}
                </div>
                <div className="code_buttons">
                  <Button>Salvar</Button>
                </div>
              </form>
            )}
            {!emailVisib && (
              <Button
                className="profile-btn-edit"
                onClick={() => setEmailVisb(!emailVisib)}
                text="Editar"
              />
            )}
          </div>
          <div className="profile-pass">
            {passVisib ? (
              <h3 className="profile-pass-desc">
                Não se esqueça de anotar sua senha!
              </h3>
            ) : (
              <h2 className="profile-pass-user">Senha</h2>
            )}
            {passVisib && (
              <form className="profile-form" onSubmit={handleChangePassword}>
                <div className="profile-form-pass">
                  {!rpPassVisib ? (
                    <div className="input-group">
                      <label className="lbl" htmlFor="pass">
                        Senha
                      </label>
                      <Input
                        id="pass"
                        type="password"
                        className="inpt"
                        autoComplete="none"
                        placeholder=" "
                        required
                        value={userData.password}
                        onChange={e =>
                          setUserData({ ...userData, password: e.target.value })
                        }
                      />
                      {passError && <p className="error-txt">{errorMsg}</p>}
                    </div>
                  ) : (
                    <div className="input-group">
                      <label className="lbl" htmlFor="rpPass">
                        Repita a senha
                      </label>
                      <Input
                        id="rpPass"
                        type="password"
                        className="inpt"
                        autoComplete="none"
                        placeholder=" "
                        required
                        value={userData.rpPassword}
                        onChange={e =>
                          setUserData({
                            ...userData,
                            rpPassword: e.target.value,
                          })
                        }
                      />
                      {passError && <p className="error-txt">{errorMsg}</p>}
                    </div>
                  )}
                </div>
                <div className="profile-form-buttons">
                  {rpPassVisib ? (
                    <>
                      <Button
                        className="profile-btn-cancel"
                        onClick={() => setRpPassVisib(!rpPassVisib)}
                        text={"Voltar"}
                      />
                      <Button
                        className="profile-btn-save"
                        type="submit"
                        text="Salvar"
                      />
                    </>
                  ) : (
                    <>
                      <Button
                        className="profile-btn-cancel"
                        onClick={() => setPassVisib(!passVisib)}
                        text={"Cancelar"}
                      />
                      <Button
                        className="profile-btn-save"
                        type="button"
                        text="Continuar"
                        onClick={handleContinue}
                      />
                    </>
                  )}
                </div>
              </form>
            )}
            {!passVisib && (
              <Button
                className="profile-btn-edit"
                onClick={() => setPassVisib(!passVisib)}
                text="Editar"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
