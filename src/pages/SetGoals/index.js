import React, { useState, useEffect } from "react";
import Header2 from "../../components/Header2";
import GoalProgress from "../../components/GoalProgress";
import { db } from "../../firebase";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import "./styles.css";

function SetGoals() {
  const [dailyGoal, setDailyGoal] = useState(0);
  const [weeklyGoal, setWeeklyGoal] = useState(0);
  const [monthlyGoal, setMonthlyGoal] = useState(0);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const goalsDoc = await getDoc(doc(collection(db, 'goals'), 'user-goals'));
        const goalsData = goalsDoc.data();
        if (goalsData) {
          setDailyGoal(goalsData.daily || 0);
          setWeeklyGoal(goalsData.weekly || 0);
          setMonthlyGoal(goalsData.monthly || 0);
        }
      } catch (error) {
        console.error('Error fetching goals: ', error);
      }
    };

    fetchGoals();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await setDoc(doc(collection(db, 'goals'), 'user-goals'), {
        daily: dailyGoal,
        weekly: weeklyGoal,
        monthly: monthlyGoal,
      });
      setMessage('Goals set successfully!');
    } catch (error) {
      console.error('Error setting goals: ', error);
      setMessage('Error setting goals');
    }
  };

  return (
    <div>
      <Header2 />
      <div className="set-goals-container">
        <div className="goals-setting">
          <h2>Set Your Goals</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Daily Goal:</label>
              <input type="number" value={dailyGoal} onChange={(e) => setDailyGoal(e.target.value)} />
            </div>
            <div>
              <label>Weekly Goal:</label>
              <input type="number" value={weeklyGoal} onChange={(e) => setWeeklyGoal(e.target.value)} />
            </div>
            <div>
              <label>Monthly Goal:</label>
              <input type="number" value={monthlyGoal} onChange={(e) => setMonthlyGoal(e.target.value)} />
            </div>
            <button type="submit">Set Goals</button>
          </form>
          {message && <p className="message">{message}</p>}
        </div>
        <div className="goal-progress">
          <GoalProgress dailyGoal={dailyGoal} weeklyGoal={weeklyGoal} monthlyGoal={monthlyGoal} />
        </div>
      </div>
    </div>
  );
}

export default SetGoals;