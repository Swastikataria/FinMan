import React, { useState } from "react";
import "./styles.css";
import Input from "../Input";
import Button from "../Button";
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase"; // Check this import
import { useNavigate } from "react-router-dom";

function SignupSigninComponent() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSignup, setIsSignup] = useState(true); // State to toggle between Signup and Login
  const navigate = useNavigate();
  
  async function signupWithEmail() {
    try {
      if (name !== "" && email !== "" && password !== "" && confirmPassword !== "") {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        toast.success("User Created!");
        navigate('/dashboard'); // Navigate to dashboard
      } else {
        toast.error("All fields are mandatory!");
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  async function loginWithEmail() {
    try {
      if (email !== "" && password !== "") {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        toast.success("User Logged In!");
        navigate('/dashboard'); // Navigate to dashboard
      } else {
        toast.error("All fields are mandatory!");
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <div className="signup-wrapper">
      <ToastContainer />
      <h2 className="title">
        {isSignup ? "Sign Up on" : "Log In to"} <span style={{ color: "var(--theme)" }}>FinMan</span>
      </h2>
      
      <form className="details">
        {isSignup && (
          <Input
            label={"Full Name"}
            state={name}
            setState={setName}
            placeholder={"Aditi Shah"}
          />
        )}
        <Input
          label={"Email"}
          state={email}
          setState={setEmail}
          placeholder={"AditiShah@gmail.com"}
        />
        <Input
          type="password"
          label={"Password"}
          state={password}
          setState={setPassword}
          placeholder={"Example@123"}
        />
        {isSignup && (
          <Input
            type="password"
            label={"Confirm Password"}
            state={confirmPassword}
            setState={setConfirmPassword}
            placeholder={"Example@123"}
          />
        )}
        <Button
          text={isSignup ? "Signup Using Email and Password" : "Login Using Email and Password"}
          onClick={isSignup ? signupWithEmail : loginWithEmail}
        />
        <p style={{ textAlign: "center", margin: 0 }}>or</p>
        <Button text={isSignup ? "Signup Using Google" : "Login Using Google"} />
        <p style={{ textAlign: "center", marginTop: '1rem' }}>
          {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
          <span
            style={{ color: "var(--theme)", cursor: "pointer" }}
            onClick={() => setIsSignup(!isSignup)}
          >
            {isSignup ? "Login" : "Signup"}
          </span>
        </p>
      </form>
    </div>
  );
}

export default SignupSigninComponent;