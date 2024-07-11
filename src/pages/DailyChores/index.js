import React, { useState, useContext } from "react";
import { AuthContext } from "../../AuthContext"; // Adjust the path if needed
import Header2 from "../../components/Header2";
import { db } from "../../firebase";
import { collection, addDoc, getDocs, query, where, Timestamp } from "firebase/firestore";
import "./styles.css";

function DailyChores() {
  const { user } = useContext(AuthContext); // Get user from context
  const categories = [
    { name: 'Food', icon: '🍽️' },
    { name: 'Entertainment', icon: '🎬' },
    { name: 'Travel', icon: '📍' },
    { name: 'Shopping', icon: '🛍️' },
    { name: 'Fuel', icon: '⛽' },
    { name: 'Healthcare', icon: '🏥' },
    { name: 'Savings', icon: '💸' },
    { name: 'Others', icon: '📦' }
  ];

  const [expenses, setExpenses] = useState(
    categories.reduce((acc, category) => {
      acc[category.name] = '';
      return acc;
    }, {})
  );

  const [date, setDate] = useState('');
  const [message, setMessage] = useState('');

  const handleChange = (e, category) => {
    const { value } = e.target;
    setExpenses({
      ...expenses,
      [category]: value
    });
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Check if expenses already exist for the selected date and user
      const q = query(collection(db, "expenses"), 
        where("date", "==", Timestamp.fromDate(new Date(date))),
        where("userId", "==", user.uid)
      );
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        setMessage('Expenses for this date already exist. Please choose another date.');
        return;
      }

      // Add new expenses if no existing expenses are found for the date
      for (const category of categories) {
        const amount = expenses[category.name];
        if (amount && date) {
          await addDoc(collection(db, 'expenses'), {
            category: category.name,
            amount: parseFloat(amount),
            date: Timestamp.fromDate(new Date(date)),
            userId: user.uid // Include user ID
          });
          console.log(`Added expense: Category: ${category.name}, Amount: ${amount}, Date: ${date}`);
        }
      }
      console.log('Expenses added successfully');
      setMessage('Expenses added successfully');
      setExpenses(
        categories.reduce((acc, category) => {
          acc[category.name] = '';
          return acc;
        }, {})
      );
      setDate('');
    } catch (error) {
      console.error('Error adding expense: ', error);
      setMessage('Error adding expenses');
    }
  };

  return (
    <div>
      <Header2 />
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <table className="expense-table">
            <thead>
              <tr>
                <th>Category</th>
                <th>Update Your Expenses (in Rs)</th>
              </tr>
            </thead>
            <tbody>
              {categories.map(category => (
                <tr key={category.name}>
                  <td className="category-cell">
                    <span role="img" aria-label={category.name} className="category-icon">
                      {category.icon}
                    </span>
                    {category.name}
                  </td>
                  <td>
                    <input
                      type="number"
                      value={expenses[category.name]}
                      onChange={(e) => handleChange(e, category.name)}
                      placeholder="Amount"
                      required
                      className="expense-input"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="date-container">
            <label>Date:</label>
            <input
              type="date"
              value={date}
              onChange={handleDateChange}
              required
              className="expense-input"
            />
          </div>
          <button type="submit" className="submit-button">Add Expenses</button>
        </form>
      </div>
      {message && <p className="message">{message}</p>}
      <div className="video-tutorials">
        <h2>Financial Advisor Tutorials</h2>
        <ul>
          <li><a href="LINK_TO_VIDEO_1" target="_blank" rel="noopener noreferrer">Video Tutorial 1</a></li>
          <li><a href="LINK_TO_VIDEO_2" target="_blank" rel="noopener noreferrer">Video Tutorial 2</a></li>
          <li><a href="LINK_TO_VIDEO_3" target="_blank" rel="noopener noreferrer">Video Tutorial 3</a></li>
        </ul>
      </div>
    </div>
  );
}

export default DailyChores;