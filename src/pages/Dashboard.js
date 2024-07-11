import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Header2 from "../components/Header2";
import Dialogflow from "../components/Dialogflow"; // Import DialogflowChat component
import { db } from "../firebase"; // Make sure the path is correct
import { collection, getDocs, query, where } from "firebase/firestore";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "./Dashboard.css"; // Import your CSS file
import { AuthContext } from "../AuthContext"; // Import AuthContext

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Dashboard() {
  const navigate = useNavigate(); // Initialize useNavigate
  const { user } = useContext(AuthContext); // Get user from context

  const [showChatbot, setShowChatbot] = useState(false);
  const [expenseData, setExpenseData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false); // State for popup visibility
  const [popupMessage, setPopupMessage] = useState(''); // State for popup message

  useEffect(() => {
    const fetchExpenses = async () => {
      if (!user) return; // Exit if user is not logged in

      try {
        const q = query(collection(db, "expenses"), where("userId", "==", user.uid));
        const querySnapshot = await getDocs(q);
        const expenses = {};
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const date = new Date(data.date.seconds * 1000).toLocaleDateString(); // Assuming date is a Firestore timestamp
          if (!expenses[date]) {
            expenses[date] = {
              Food: 0,
              Entertainment: 0,
              Travel: 0,
              Shopping: 0,
              Fuel: 0,
              Healthcare: 0,
              Savings: 0,
              Others: 0,
            };
          }
          expenses[date][data.category] += parseFloat(data.amount);
        });

        // Calculate totals for each category over the last 4 days
        const last4Days = Object.keys(expenses)
          .sort((a, b) => new Date(b) - new Date(a))
          .slice(0, 4);
        
        // Calculate daily expenses
        const dailyExpenses = last4Days.map((date) => ({ date, ...expenses[date] }));
        setExpenseData(dailyExpenses);
        setLoading(false);

        // Check if any day's Healthcare expenses exceed 1000
        let exceedsThreshold = false;
        dailyExpenses.forEach((day) => {
          if (day.Healthcare > 1000) {
            exceedsThreshold = true;
          }
        });

        if (exceedsThreshold) {
          setPopupMessage(
            "Your healthcare expenses seemed higher today. Consider taking health insurance by clicking on Recommendations!."
          );
          setShowPopup(true);
        }

      } catch (error) {
        console.error("Error fetching expense data: ", error);
        setLoading(false);
      }
    };

    fetchExpenses();
  }, [user]);

  const data = {
    labels: expenseData.map((d) => d.date),
    datasets: [
      {
        label: "Food",
        data: expenseData.map((d) => d.Food),
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
      {
        label: "Entertainment",
        data: expenseData.map((d) => d.Entertainment),
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
      {
        label: "Travel",
        data: expenseData.map((d) => d.Travel),
        backgroundColor: "rgba(255, 206, 86, 0.2)",
        borderColor: "rgba(255, 206, 86, 1)",
        borderWidth: 1,
      },
      {
        label: "Shopping",
        data: expenseData.map((d) => d.Shopping),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "Fuel",
        data: expenseData.map((d) => d.Fuel),
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 1,
      },
      {
        label: "Healthcare",
        data: expenseData.map((d) => d.Healthcare),
        backgroundColor: "rgba(255, 159, 64, 0.2)",
        borderColor: "rgba(255, 159, 64, 1)",
        borderWidth: 1,
      },
      {
        label: "Savings",
        data: expenseData.map((d) => d.Savings),
        backgroundColor: "rgba(245, 40, 145, 0.2)",
        borderColor: "rgba(245, 40, 145, 1)",
        borderWidth: 1,
      },
      {
        label: "Others",
        data: expenseData.map((d) => d.Others),
        backgroundColor: "rgba(199, 199, 199, 0.2)",
        borderColor: "rgba(199, 199, 199, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="dashboard-container">
      <Header2 />

      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <span className="close" onClick={() => setShowPopup(false)}>
              &times;
            </span>
            <p>{popupMessage}</p>
          </div>
        </div>
      )}

      {!showChatbot && (
        <img
          src={`${process.env.PUBLIC_URL}/Finhelplogo.png`}
          alt="FinMan"
          className="chatbot-image"
          onClick={() => setShowChatbot(!showChatbot)}
        />
      )}

      {showChatbot && (
        <div className="chatbot-container active">
          <Dialogflow url="https://your-deployed-project-url.com" />
        </div>
      )}

      {!showChatbot && (
        <>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <>
              <div className="bar-chart-container">
                <div className="bar-heading">Expense Distribution</div>
                <div className="bar-chart-wrapper">
                  <Bar data={data} />
                </div>
              </div>
            </>
          )}
        </>
      )}
      <div className="quote-container">
        <p className="quote-text">
          “Don't save what's left after spending, but spend what's left after
          saving”
        </p>
      </div>
    </div>
  );
}

export default Dashboard;