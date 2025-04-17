import { io } from "socket.io-client";
import { serverUrl } from "./assets/api";
import { getTasks } from "./slices/TasksSlice";

export const socket = io(serverUrl, {
  transports: ["websocket"],
});

export const socket_types = {
  message: "message",
  user: "set_username",
  login: "login",
  editedTask: "editedTask",
  createdTask: "createdTask",
  deletedTask: "deletedTask",
  completedTask: "completedTask",
};

export function SocketListener(dispatch, setMsg, current) {
  socket.on("receive_message", async data => {
    if (data.text.type == socket_types.login) {
      if (data.text.id == current.id) {
        dispatch(setMsg(`seja bem vindo ${data.text.name}`));
      } else if (data.text.id != current.id) {
        dispatch(setMsg(`${data.text.name} se conectou`));
      }
    } else if (data.text.type == socket_types.createdTask) {
      if (data.text.id == current.id) {
        dispatch(setMsg("tarefa criada"));
      } else if (data.text.id != current.id) {
        dispatch(setMsg(`${data.text.name} criou uma tarefa`));
      }
      dispatch(getTasks());
    } else if (data.text.type == socket_types.editedTask) {
      if (data.text.id == current.id) {
        dispatch(setMsg("tarefa atualizada"));
      } else if (data.text.id != current.id) {
        dispatch(setMsg(`${data.text.name} atualizou uma tarefa`));
      }
      dispatch(getTasks());
    } else if (data.text.type == socket_types.message) {
      dispatch(setMsg(data.text.text));
    } else if (data.text.type == socket_types.deletedTask) {
      if (data.text.id == current.id) {
        dispatch(setMsg("tarefa finalizada"));
      } else if (data.text.id != current.id) {
        dispatch(setMsg(`${data.text.name} finalizou uma tarefa`));
      }
      dispatch(getTasks());
    } else if (data.text.type == socket_types.completedTask) {
      if (data.text.id == current.id) {
        dispatch(setMsg("tarefa concluida"));
      } else if (data.text.id != current.id) {
        dispatch(setMsg(`${data.text.name} concluiu uma tarefa`));
      }
      dispatch(getTasks());
    }
  });
}
