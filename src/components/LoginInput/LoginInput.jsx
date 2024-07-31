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
  options,
}) => {
  return (
    <div className="login-input-container">
      <label className={labelClass} htmlFor={name}>
        {label}
      </label>
      {type === "select" ? (
        <select
          className={inputClass}
          onChange={onChange}
          value={value}
          name={name}
        >
          <option value="">Select {label}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
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
      )}
    </div>
  );
};
