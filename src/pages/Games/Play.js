import React, { useState } from 'react';
import './PlayStyles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faUnlock, faStar } from '@fortawesome/free-solid-svg-icons';
import Header2 from "../../components/Header2";


const levels = [
  { level: 1, question: 'A person sold a stove for Rs. 423 and incurred a loss of 6%. At what price would it be sold so as to earn a profit of 8%?', options: ['Rs. 525', 'Rs. 500', 'Rs. 490', 'Rs. 486'], answer: 'Rs. 486' },
  { level: 2, question: 'A shopkeeper sold an article for Rs. 240 at a loss of 20%. What was the cost price of the article?', options: ['Rs. 300', 'Rs. 280', 'Rs. 250', 'Rs. 320'], answer: 'Rs. 300' },
  { level: 3, question: 'If the cost price of 20 articles is equal to the selling price of 15 articles, find the profit percentage.', options: ['25%', '30%', '33.33%', '40%'], answer: '33.33%' },
  { level: 4, question: 'A man bought a horse for Rs. 1500 and sold it for Rs. 1800. Find the profit percentage.', options: ['15%', '20%', '25%', '30%'], answer: '20%' },
  { level: 5, question: 'A man bought an article for Rs. 780 and sold it for Rs. 1000. Find the profit percentage.', options: ['25%', '28%', '30%', '35%'], answer: '28%' },
  { level: 6, question: 'If the selling price of an article is Rs. 2400 and the profit is 20%, what is the cost price?', options: ['Rs. 2000', 'Rs. 2200', 'Rs. 1800', 'Rs. 2500'], answer: 'Rs. 2000' },
  { level: 7, question: 'If a man bought a radio for Rs. 400 and sold it for Rs. 500, find the profit percentage.', options: ['20%', '25%', '30%', '35%'], answer: '25%' },
  { level: 8, question: 'A man sold an article for Rs. 240 at a loss of 20%. What was the cost price of the article?', options: ['Rs. 300', 'Rs. 280', 'Rs. 250', 'Rs. 320'], answer: 'Rs. 300' },
  { level: 9, question: 'If the cost price of an article is Rs. 1500 and the profit is 20%, what is the selling price?', options: ['Rs. 1700', 'Rs. 1750', 'Rs. 1800', 'Rs. 1850'], answer: 'Rs. 1800' },
  { level: 10, question: 'A shopkeeper sold an article for Rs. 350 and gained 25%. What was the cost price of the article?', options: ['Rs. 280', 'Rs. 290', 'Rs. 300', 'Rs. 320'], answer: 'Rs. 280' },
];

const badgeEmojis = ['🎗️', '🎖️', '🏆'];

function Play() {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [stars, setStars] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [badges, setBadges] = useState([]);
  const [isLevelCleared, setIsLevelCleared] = useState(false);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setAttempts(attempts + 1);

    if (option === levels[currentLevel].answer) {
      if (attempts === 0) {
        setStars(stars + 3);
      } else {
        setStars(stars + 2);
      }
      setIsLevelCleared(true);
      if ((currentLevel + 1) % 3 === 0) {
        setBadges([...badges, badgeEmojis[Math.floor(currentLevel / 3)]]);
      }
    }
  };

  const handleNextLevel = () => {
    setCurrentLevel(currentLevel + 1);
    setSelectedOption('');
    setAttempts(0);
    setIsLevelCleared(false);
  };

  return (
    <div>
      <Header2 />
      <div className="play-page container">
        <div className="row">
          <div className="col-md-3 sidebar">
            <h3>Levels</h3>
            <ul className="list-group">
              {levels.map((level, index) => (
                <li
                  key={index}
                  className={`list-group-item ${index <= currentLevel ? 'unlocked' : 'locked'}`}
                  style={{ backgroundColor: index <= currentLevel ? '#90ee90' : '#f4f4f4' }}
                >
                  {index <= currentLevel ? (
                    <>
                      <FontAwesomeIcon icon={faUnlock} /> Level {index + 1}
                    </>
                  ) : (
                    <>
                      <FontAwesomeIcon icon={faLock} /> Locked
                    </>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div className="col-md-6 main">
            <h2>Level {currentLevel + 1}</h2>
            <p>{levels[currentLevel].question}</p>
            <div className="options">
              {levels[currentLevel].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleOptionSelect(option)}
                  disabled={isLevelCleared}
                  className={`btn btn-block btn-option ${selectedOption === option ? 'selected' : ''}`}
                >
                  {option}
                </button>
              ))}
            </div>
            {isLevelCleared && (
              <div className="result mt-3">
                <p className="alert alert-success">
                  Correct! You earned {attempts === 0 ? '3' : '2'} stars.
                </p>
                <button className="btn btn-primary" onClick={handleNextLevel}>Next Level</button>
              </div>
            )}
          </div>
          <div className="col-md-3 stars">
            <h3>Stars: {stars} <FontAwesomeIcon icon={faStar} className="text-warning" /></h3>
            <div className="badges mt-3">
              <h3>Badges Earned</h3>
              <ul className="list-group">
                {badges.map((badge, index) => (
                  <li key={index} className="list-group-item">{badge}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Play;