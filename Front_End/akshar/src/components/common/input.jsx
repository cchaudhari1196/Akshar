import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { ThemeContext } from "./../../contexts/ThemeContext";

const Input = ({ name, label, error, ...rest }) => {
  return (
    <div className="form-group">
      {label && (
        <label htmlFor={name} style={{ color: "#eaeaea" }}>
          {label}
        </label>
      )}
      <input {...rest} name={name} id={name} className="form-control" />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
