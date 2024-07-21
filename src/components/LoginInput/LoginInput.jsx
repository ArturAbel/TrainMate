import "./LoginInput.css";

export const LoginInput = ({ label, type, name, placeholder }) => {
  return (
    <div className="login-input-container">
      <label className="login-input-label" htmlFor={name}>
        {label}
      </label>
      <input
        className="login-input"
        placeholder={placeholder}
        type={type}
        name={name}
      />
    </div>
  );
};
