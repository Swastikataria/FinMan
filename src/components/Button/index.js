import React from "react";
import "./styles.css";

function Button({ text, onClick, red}) {
  return (
    <div className={red ? "btn btn-red" : "btn"} onClick={onClick}>
      {text}
    </div>
  );
}

export default Button;