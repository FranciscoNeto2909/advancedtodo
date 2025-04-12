import { useEffect, useState } from "react";
import "./users.css";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../slices/AppSlice";

export default function Users() {
  const dispatch = useDispatch()
  const [users, setUsers] = useState([]);
  const data = useSelector(data => data.App.users);

  useEffect(() => {
    dispatch(getUsers())
    setUsers(data)
  }, [data]);

  return (
    <div className="users">
      <div className="users_header"></div>
      <div className="users_body">
        <div className="users_cards">
          {users.length > 0 && users.map((user, i) => (
            <div key={i} className="user_card">
              <div className={`user_card_flag ${user.isLogged ? "card_flag_online" : "card_flag_offline"}`}></div>
              <p>{user.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
