import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import RecommendationCard from "./RecommendationCard";
import Header2 from "../../components/Header2";
import './styles.css'
 // Import DialogflowChat component


 // Import your CSS file

 const cardData = [
  {
    title: "SCHOLARSHIPS",
    description: "Looking for scholarships to fund your education?",
    links: ["Link 1", "Link 2", "Link 3"],
    color: "green",
  },
  {
    title: "INSURANCE",
    description: "Need help choosing the right insurance plan for you? ",
    links: ["Link 1", "Link 2", "Link 3"],
    color: "blue",
  },
  {
    title: "MANAGE LOANS",
    description: "Looking for the best loan options?" ,
    links: ["Link 1", "Link 2", "Link 3"],
    color: "red",
  },
  {
    title: "SAVINGS ACCOUNT",
    description: "Discover smart ways to grow your savings!" ,
    links: ["Link 1", "Link 2", "Link 3"],
    color: "black",
  },
  {
    title: "INVESTMENT",
    description: "Want to know how to invest wisely? ",
    links: ["Link 1", "Link 2", "Link 3"],
    color: "purple",
  },
];

const Recommendations = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentLinks, setCurrentLinks] = useState([]);

  const openModal = (links) => {
    setCurrentLinks(links);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setCurrentLinks([]);
  };

  return (
    <div><Header2/>
    <div className="container">
      <div className="heading">Recommendations</div>
      <div className="row">
        {cardData.map((card, index) => (
          <div className="col-md-4" key={index}>
            <RecommendationCard
              title={card.title}
              description={card.description}
              color={card.color}
              onClick={() => openModal(card.links)}
            />
          </div>
        ))}
      </div>
      <Modal show={modalIsOpen} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Recommended Links</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul>
            {currentLinks.map((link, index) => (
              <li key={index}>{link}</li>
            ))}
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
    </div>
  );
};

export default Recommendations;