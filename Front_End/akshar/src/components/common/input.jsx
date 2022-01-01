import React, { useContext } from "react";
import { ThemeContext } from "./../../contexts/ThemeContext";

function Input({ name, label, error, ...rest }) {
  const { theme } = useContext(ThemeContext);
  const style = {
    color: theme.tertiary,
  };

  return (
    <div className="form-group">
      {label && (
        <label htmlFor={name} style={style}>
          {label}
        </label>
      )}
      <input {...rest} name={name} id={name} className="form-control" />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
}

export default Input;
