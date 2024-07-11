import React from "react";
import Header from "../components/Header";
import "./Signup.css";
import SignupSigninComponent from "../components/SignupSignin";

function Signup() {
  return (
    <div>
      <Header />
      <div className="wrapper">
        <SignupSigninComponent />
      </div>
    </div>
  );
}

export default Signup;