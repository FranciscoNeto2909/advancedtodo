import { io } from "socket.io-client";
import { serverUrl } from "./assets/api";

export const socket = io(serverUrl, {
  transports: ["websocket"],
});

export const socket_types = {
  message: "message",
  user: "set_username",
  login: "login",
  task: "task",
};

export function SocketListener(dispatch, setMsg, current) {
  socket.on("receive_message", async data => {
    if (data.text.type == socket_types.login) {
      if (data.text.id == current.id) {
        dispatch(setMsg(`seja bem vindo ${data.text.name}`));
      } else if (data.text.id != current.id) {
        dispatch(setMsg(`${data.text.name} se conectou`));
      }
    } else if (data.text.type == socket_types.task) {
      if (data.text.id == current.id) {
        dispatch(setMsg("tarefa atualizada"));
      } else if (data.text.id != current.id) {
        dispatch(setMsg(`${data.text.name} atualizou a tarefa`));
      }
    } else if (data.text.type == socket_types.message) {
      dispatch(setMsg(data.text.text));
    }
  });
}
