import { useState } from "react";

export const useFormHook = () => {
  const [input, setInput] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInput((previousInput) => ({
      ...previousInput,
      [name]: value,
    }));
  };

  return { input, setInput, handleInputChange };
};
