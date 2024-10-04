import "./wellcome.css";

export default function Wellcome() {
  return (
    <div className="wellcome">
      <h1>Seja bem vindo, faça o login para acessar as tarefas da sua equipe</h1>
      <div className="wellcome_itens">
        <p className="wellcome_item item__1">Organize suas tarefas de forma prática!</p>
        <p className="wellcome_item item__2">Você recebe notificações em tempo real!</p>
        <p className="wellcome_item item__3">Jogue fora suas pranchetas e tabelas!</p>
        <p className="wellcome_item item__4">Contamos com 3 niveis de prioridade!</p>
      </div>
    </div>
  );
}
