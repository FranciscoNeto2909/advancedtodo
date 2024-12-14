import { useDispatch, useSelector } from "react-redux";
import "./profile.css";
import { FaCameraRotate } from "react-icons/fa6";
import { getUser, setUserImage } from "../../assets/userSlice";
import { serverUrl } from "../../assets/api";
import { useEffect, useState } from "react";

export default function Profile() {
  const [image, setImage] = useState(undefined);
  const user = useSelector((data) => data.User);
  const dispatch = useDispatch();
  const defImg =
    "https://www.pngall.com/wp-content/uploads/5/Profile-PNG-File.png";

  async function handleChangeUserImage(e) {
    const userId = localStorage.getItem("userId");
    const img = await e.target.files[0];
    dispatch(setUserImage(img)).then((e) => {
      dispatch(getUser(userId));
      setUserImage(`${serverUrl}profile/${user.image}`);
    });
  }

  function handleSetUserImage() {
    setImage(`${serverUrl}profile/${user.user.image}`);
  }

  useEffect(() => {
    handleSetUserImage()
  },user.image);

  return (
    <div className="profile">
      <div className="profile_header"></div>
      <div className="profile_body">
        <div className="profile_image">
          <label htmlFor="img" className="profile-container">
            <img
              src={image != undefined ? image : defImg}
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
              onChange={(e) => handleChangeUserImage(e)}
            />
          </label>
        </div>
        <div className="profile_name"></div>
        <div className="profie_email"></div>
        <div className="profile_password"></div>
      </div>
    </div>
  );
}
