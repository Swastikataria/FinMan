import React, { useEffect, useState } from 'react';
import { db } from '../../firebase'; // Ensure correct relative path to your Firebase configuration
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import './ExpenseChart.css'; // Import your CSS file
import './styles.css'

function ExpenseChart() {
  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const expenseData = await db.collection('expenses').get();
        const expenseArray = expenseData.docs.map(doc => doc.data());

        const categories = [
          'Food', 'Entertainment', 'Travel', 'Shopping', 'Fuel', 'Healthcare', 'Savings','Others'
        ];

        const categoryTotals = categories.reduce((acc, category) => {
          acc[category] = 0;
          return acc;
        }, {});

        expenseArray.forEach(expense => {
          if (categories.includes(expense.category)) {
            categoryTotals[expense.category] += parseFloat(expense.amount);
          }
        });

        const data = {
          labels: categories,
          datasets: [
            {
              label: 'Expenses',
              data: Object.values(categoryTotals),
              backgroundColor: [
                '#FF6384', '#36A2EB', '#FFCE56', '#FF5733', '#33FF57', '#3357FF', '#F933FF','#F5289133'
              ]
            }
          ]
        };

        setChartData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching expense data: ', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="chart-container">
      <h2>Expense Distribution</h2>
      {loading ? <p>Loading...</p> : <Bar data={chartData} />}
    </div>
  );
}

export default ExpenseChart;