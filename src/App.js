import React,{useState} from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import SetGoals from "./pages/SetGoals";
import DailyChores from "./pages/DailyChores";
import Games from "./pages/Games/Modules";
import Recommendations from "./pages/Recommendations";
import TryTrading from "./pages/TryTrading/Login";
import Play from "./pages/Games/Play";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Welcome from './pages/TryTrading/Welcome';
import Portfolio from './pages/TryTrading/Portfolio';

function App() {
  return (
    <>
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/setGoals" element={<SetGoals />} />
          <Route path="/dailyChores" element={<DailyChores />} />
          <Route path="/games" element={<Games />} />
          <Route path="/games/play" element={<Play />} /> 
          <Route path="/recommendations" element={<Recommendations />} />
          <Route path="/tryTrading" element={<TryTrading />} />
          <Route path="/welcome" element={<Welcome />} /> 
          <Route path="/portfolio" element={<Portfolio />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;