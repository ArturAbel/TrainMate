import { useState } from "react";

export const useFormHook = (initialState = {}) => {
  const [input, setInput] = useState(initialState);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === "checkbox") {
      setInput((prevInput) => ({
        ...prevInput,
        [name]: checked
          ? [...(prevInput[name] || []), value]
          : (prevInput[name] || []).filter((item) => item !== value),
      }));
    } else {
      setInput({
        ...input,
        [name]: value,
      });
    }
  };

  return { input, setInput, handleInputChange };
};
