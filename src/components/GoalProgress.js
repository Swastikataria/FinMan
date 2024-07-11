import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import '../pages/DailyChores/ExpenseChart.css';

function GoalProgress({ dailyGoal, weeklyGoal, monthlyGoal }) {
  const [savings, setSavings] = useState({ daily: 0, weekly: 0, monthly: 0 });
  const [coins, setCoins] = useState(0);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchSavings = async () => {
      try {
        const expenseData = await db.collection('expenses').get();
        const expenseArray = expenseData.docs.map(doc => doc.data());

        const today = new Date();
        const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

        let dailySavings = 0;
        let weeklySavings = 0;
        let monthlySavings = 0;

        expenseArray.forEach(expense => {
          const expenseDate = new Date(expense.date);
          if (expense.category === 'Savings') {
            if (expenseDate.toDateString() === new Date().toDateString()) {
              dailySavings += parseFloat(expense.amount);
            }
            if (expenseDate >= startOfWeek) {
              weeklySavings += parseFloat(expense.amount);
            }
            if (expenseDate >= startOfMonth) {
              monthlySavings += parseFloat(expense.amount);
            }
          }
        });

        setSavings({ daily: dailySavings, weekly: weeklySavings, monthly: monthlySavings });
      } catch (error) {
        console.error('Error fetching savings data: ', error);
      }
    };

    fetchSavings();
  }, []);

  useEffect(() => {
    let newCoins = 0;
    let newMessage = '';

    if (savings.daily >= dailyGoal && dailyGoal > 0) {
      newCoins += 10;
      newMessage += 'Daily goal achieved! ';
    }
    if (savings.weekly >= weeklyGoal && weeklyGoal > 0) {
      newCoins += 50;
      newMessage += 'Weekly goal achieved! ';
    }
    if (savings.monthly >= monthlyGoal && monthlyGoal > 0) {
      newCoins += 100;
      newMessage += 'Monthly goal achieved! ';
    }

    setCoins(newCoins);
    if (newMessage) {
      setMessage(newMessage);
      setTimeout(() => {
        setMessage('');
      }, 5000);
    }
  }, [savings, dailyGoal, weeklyGoal, monthlyGoal]);

  const chartData = {
    labels: ['Daily', 'Weekly', 'Monthly'],
    datasets: [
      {
        label: 'Savings',
        data: [savings.daily, savings.weekly, savings.monthly],
        backgroundColor: '#36A2EB',
      },
      {
        label: 'Goals',
        data: [dailyGoal, weeklyGoal, monthlyGoal],
        backgroundColor: '#FF6384',
      }
    ]
  };

  const chartOptions = {
    indexAxis: 'y',
    scales: {
      x: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="goal-progress-container">
      <div className="coins">
        <span>{coins} 🪙</span>
      </div>
      {message && <p className="message">{message}</p>}
      <h2>Goal Progress</h2>
      <div className="goal-bars">
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
}

export default GoalProgress;