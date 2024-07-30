import React, { useRef, useEffect, useState } from "react";
import { Autocomplete } from "@react-google-maps/api";
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
  enableAutocomplete,
  onPlaceSelected,
  scriptLoaded,
}) => {
  const autocompleteRef = useRef(null);
  const [error, setError] = useState(null);

  const handlePlaceChanged = () => {
    const place = autocompleteRef.current.getPlace();
    if (place.geometry) {
      const coords = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      };
      const address = place.formatted_address;
      onPlaceSelected(coords, address);
    } else {
      setError("No details available for input: '" + place.name + "'");
    }
  };

  useEffect(() => {
    if (scriptLoaded && enableAutocomplete) {
      if (autocompleteRef.current) {
        autocompleteRef.current.addListener(
          "place_changed",
          handlePlaceChanged
        );
      }
    }
  }, [scriptLoaded, enableAutocomplete]);

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
      ) : enableAutocomplete ? (
        scriptLoaded && (
          <Autocomplete
            onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
          >
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
          </Autocomplete>
        )
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
      {error && <p className="error">{error}</p>}
    </div>
  );
};
