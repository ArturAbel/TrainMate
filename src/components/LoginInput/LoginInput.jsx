import "./LoginInput.css";

export const LoginInput = ({
  placeholder,
  labelClass,
  inputClass,
  onChange,
  value,
  label,
  type,
  name,
  min,
  max,
}) => {
  return (
    <div className="login-input-container">
      <label className={labelClass} htmlFor={name}>
        {label}
      </label>
      <input
        placeholder={placeholder}
        className={inputClass}
        onChange={onChange}
        value={value}
        type={type}
        name={name}
        min={min}
        max={max}
      />
    </div>
  );
};
