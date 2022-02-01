import React, { useState, useEffect } from 'react'
import { Navbar, Nav, Container, Button,Row, Col } from 'react-bootstrap';
import { Link, Outlet, useNavigate } from "react-router-dom";


export const DoctorPage = () => {
    const navigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        navigate('/');
    }
    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand >FindMyDoctor</Navbar.Brand>
                    <Nav className="justify-content-right">


                        <Nav.Link className="justify-content-right" as={Link} to="profile" > Doctor about  </Nav.Link>
                        <Nav.Link className="justify-content-right" as={Link} to="appointments" >Appointments</Nav.Link>
                        <Nav.Link className="justify-content-right" as={Link} to="messenger" >Messenger</Nav.Link>
                    </Nav>
                    <Nav className="justify-content-right">
                        <Button variant="dark" onClick={logout} >BACK</Button>
                    </Nav>
                </Container>
            </Navbar>
            <Container className='mt-3 mb-3'>
                <Row>
                    <Col></Col>
                    <Col xs={6}><Outlet /></Col>
                    <Col>3 of 3</Col>
                </Row>
            </Container>

        </>
    )
}
