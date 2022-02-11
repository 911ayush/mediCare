import React from "react";
import { Navbar, Nav, Container, NavLink } from "react-bootstrap";
import { Link, useNavigate, Outlet } from "react-router-dom";

export const Topbar = () => {

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>Connect Here</Navbar.Brand>
        
      </Container>
    </Navbar>
  )

}