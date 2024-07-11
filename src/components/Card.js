import React from 'react';
import './Card.css';

const Card = ({ title, description, link }) => {
  return (
    <div className="card" onClick={() => window.location.href = link}>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default Card;