import "./input.css";

export default function Input({ type, id, onChange, value }) {
  return (
    <div className="input-container">
      <input
        id={id}
        className="input"
        autoComplete="off"
        type={type}
        onChange={e => onChange(e)}
        value={value}
      />
      <span className="border"></span>
    </div>
  );
}
