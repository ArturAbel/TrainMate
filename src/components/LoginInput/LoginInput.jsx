import "./LoginInput.css";

export const LoginInput = ({
  placeholder,
  onChange,
  label,
  type,
  name,
  value
}) => {
  return (
    <div className="login-input-container">
      <label className="login-input-label" htmlFor={name}>
        {label}
      </label>
      <input
        placeholder={placeholder}
        className="login-input"
        onChange={onChange}
        type={type}
        name={name}
        value={value}
      />
    </div>
  );
};
