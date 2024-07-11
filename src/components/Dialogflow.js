import React from "react";
import "../pages/Dashboard.css";

const Dialogflow = () => {
  return (
    <div className="chat-container">
      <iframe
        allow="microphone;"
        width="100%"
        height="100%"
        src="https://console.dialogflow.com/api-client/demo/embedded/e97e7828-119a-409a-be3e-63a228f73985"
        style={{ border: "none" }}
        title="FinHelp"
      ></iframe>
    </div>
  );
};

export default Dialogflow;