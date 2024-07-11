import React from "react";
import { Card, Button } from "react-bootstrap";

const RecommendationCard = ({ title, description, color, onClick }) => {
  return (
    <Card style={{ borderColor: color }} className="m-2" onClick={onClick}>
      <Card.Body>
        <Card.Title style={{ color }}>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <Button variant="primary">Click here!</Button>
      </Card.Body>
    </Card>
  );
};

export default RecommendationCard;