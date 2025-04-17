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
  task: "task",
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
      dispatch(getTasks());
      if (data.text.id == current.id) {
        dispatch(setMsg("tarefa criada"));
      } else if (data.text.id != current.id) {
        dispatch(setMsg(`${data.text.name} criou uma tarefa`));
      }
    } else if (data.text.type == socket_types.task) {
      dispatch(getTasks());
      if (data.text.id == current.id) {
        dispatch(setMsg("tarefa atualizada"));
      } else if (data.text.id != current.id) {
        dispatch(setMsg(`${data.text.name} atualizou uma tarefa`));
      }
    } else if (data.text.type == socket_types.message) {
      dispatch(setMsg(data.text.text));
    } else if (data.text.type == socket_types.deletedTask) {
      dispatch(getTasks());
      if (data.text.id == current.id) {
        dispatch(setMsg("tarefa apagada"));
      } else if (data.text.id != current.id) {
        dispatch(setMsg(`${data.text.name} apagou uma tarefa`));
      }
    } else if (data.text.type == socket_types.completedTask) {
      dispatch(getTasks());
      if (data.text.id == current.id) {
        dispatch(setMsg("tarefa concluida"));
      } else if (data.text.id != current.id) {
        dispatch(setMsg(`${data.text.name} concluiu uma tarefa`));
      }
    }
  });
}
