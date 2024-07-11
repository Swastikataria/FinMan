import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header2 from "../../components/Header2";
import "./ModulesStyles.css";

const studyMaterials = {
  "Profit/Loss": {
    topic: "Profit/Loss",
    formula: "Profit = Selling Price - Cost Price",
    details:
      "Profit and Loss are basic concepts in finance that determine the financial success of a transaction.",
  },
  "Selling Price/Cost Price": {
    topic: "Selling Price/Cost Price",
    formula: "Selling Price = Cost Price + Profit",
    details:
      "Selling Price and Cost Price are essential for determining the profitability of a product.",
  },
  Interests: {
    topic: "Interests",
    formula: "SI = (P x R x T) / 100",
    details:
      "Interest is the cost of borrowing money or the return on investment. SI stands for Simple Interest.",
  },
  Discounts: {
    topic: "Discounts",
    formula: "Discount = Marked Price - Selling Price",
    details:
      "Discounts are reductions to the original selling price of a product or service.",
  },
  Inflation: {
    topic: "Inflation",
    formula: "New Price = Original Price x (1 + Inflation Rate)",
    details:
      "Inflation measures the rate at which the general level of prices for goods and services is rising.",
  },
  Liabilities: {
    topic: "Liabilities",
    formula: "Total Liabilities = Total Assets - Equity",
    details:
      "Liabilities are a company's financial debts or obligations that arise during business operations.",
  },
  Debts: {
    topic: "Debts",
    formula: "Debt-to-Equity Ratio = Total Liabilities / Shareholders' Equity",
    details:
      "Debt is the amount of money borrowed by one party from another. The Debt-to-Equity ratio indicates financial leverage.",
  },
  Returns: {
    topic: "Returns",
    formula: "ROI = (Net Profit / Investment Cost) x 100",
    details:
      "Return on Investment (ROI) is a measure of the profitability of an investment.",
  },
};

const rules = [
  "Go to the modules and learn the formulas.",
  "Practice by calculating for yourself.",
  "After learning, move to the games section and play interesting games.",
  "Clear the levels and earn more points.",
  "Keep track of your progress and aim for high scores!",
];

function Games() {
  const [selectedModule, setSelectedModule] = useState("Interests");
  const [showRules, setShowRules] = useState(false);
  const navigate = useNavigate();

  const navigateToPlay = () => {
    navigate("/games/play");
  };

  return (
    <div>
      <Header2 />
      <div className="games-page">
        <button
          className="rules-button"
          onClick={() => setShowRules(!showRules)}
        >
          Rules
        </button>
        {showRules && (
          <div className="rules-display">
            <ul>
              {rules.map((rule, index) => (
                <li key={index}>{rule}</li>
              ))}
            </ul>
          </div>
        )}
        <h2 className="page-heading">Learn Basics of Finance</h2>
        <div className="content">
          <aside className="sidebar">
            <h3>Learning Modules</h3>
            <ul>
              {Object.keys(studyMaterials).map((module, index) => (
                <li key={index} onClick={() => setSelectedModule(module)}>
                  {module}
                </li>
              ))}
            </ul>
          </aside>
          <main className="main-content">
            <div className="study-material">
              <h3>{studyMaterials[selectedModule].topic}</h3>
              <p>
                <strong>Formula:</strong>{" "}
                {studyMaterials[selectedModule].formula}
              </p>
              <p>{studyMaterials[selectedModule].details}</p>
            </div>
          </main>
        </div>
        <div className="action-buttons">
          <button className="play-now-button" onClick={navigateToPlay}>
            Play Now!🎮
          </button>
        </div>
      </div>
    </div>
  );
}

export default Games;