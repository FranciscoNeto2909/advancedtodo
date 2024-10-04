import "./input.css";

export default function Input({ type, id, onChange, value }) {
  return (
    <div class="input-container">
      <input
        id={id}
        className="input"
        type={type}
        onChange={onchange}
        value={value}
      />
      <span class="border"></span>
    </div>
  );
}
