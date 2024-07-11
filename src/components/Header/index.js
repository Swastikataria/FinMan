import React, { useEffect } from "react";

import "./styles.css";

function Header() {  
  function logoutFnc(){
    alert("Logout!");
  }
  
  return (
    <div className="navbar">
      <p className="navbar-heading">FinMan</p>
      <p className="navbar-link" onClick={logoutFnc}>
        Logout
      </p>
      
    </div>
  );
}

export default Header;