import React from "react";
import "./styles.css";
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function Header2() {
  function logoutFnc() {
    alert("Logout!");
  }
  const handleHomeClick = () => {
    window.location.reload();
  };
  return (
    <Navbar bg="danger" variant="dark" expand="lg">
      <Navbar.Brand href="#home">
      <img
          src={`${process.env.PUBLIC_URL}/FinManlogo.png`}
          width="80"
          height="80"
          className="logo"
          alt="Logo"
        />
        
        FinMan
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/Dashboard" onClick={handleHomeClick}>Home</Nav.Link>
          <Nav.Link href="setGoals">Set Goals</Nav.Link>
          <Nav.Link href="dailyChores">Daily Chores</Nav.Link>
          <Nav.Link href="recommendations">Recommendations</Nav.Link>
          <Nav.Link href="games">Games</Nav.Link>
          <Nav.Link href="trytrading">Try Trading</Nav.Link>
        </Nav>
        <Nav>
          <NavDropdown title="Settings" id="basic-nav-dropdown">
            <NavDropdown.Item href="#edit-profile">Edit Profile</NavDropdown.Item>
            <NavDropdown.Item href="#delete-profile">Delete Profile</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#logout" onClick={logoutFnc}>Logout</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header2;