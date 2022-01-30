import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from "react-router-dom";
import './firstpage.css';
export const Firstpage = () => {
    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand >FindMyDoctor</Navbar.Brand>
                    <Nav className="me-auto">
                        <Navbar.Collapse className="justify-content-end">
                            <Navbar.Text>
                                Enter as: <a>Doctor</a>
                            </Navbar.Text>
                        </Navbar.Collapse>

                        <Nav.Link as={Link} to="/doctor/signup" >Sign Up</Nav.Link>
                        <Nav.Link as={Link} to="/doctor/login" >Log In</Nav.Link>
                    </Nav>
                    <Nav className="me-auto">
                        <Navbar.Collapse className="justify-content-end">
                            <Navbar.Text>
                                Enter as:  <a>Patient</a>
                            </Navbar.Text>
                        </Navbar.Collapse>
                        <Nav.Link as={Link} to="/patient/signup" >Sign Up</Nav.Link>
                        <Nav.Link as={Link} to="/patient/login" >Log In</Nav.Link>

                    </Nav>
                </Container>
            </Navbar>

        </>
    )
}