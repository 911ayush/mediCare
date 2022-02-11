import React, { useState, useEffect } from 'react'
import { Row, Container, Nav, Navbar, Dropdown, Col } from 'react-bootstrap';
import { useNavigate, Link, Outlet } from "react-router-dom";
import { PDoc } from './Pview/Pdoc';

export const Appointment = () => {





    return (
        <>
            <Container>
                <Row>
                <Navbar bg="light" variant="light">
                    <Container>
                        <Navbar.Brand >Doctor Name</Navbar.Brand>
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/messenger/jhjk" >Message</Nav.Link>
                            <Dropdown>
                                <Dropdown.Toggle variant="Secondary" id="dropdown-basic">
                                    Documents
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item as={Link} to="document">Document of this Appointment</Dropdown.Item>
                                    <Dropdown.Item as={Link} to="alldocument">All Documents</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            <Nav.Link as={Link} to="upload-document" >Upload Document</Nav.Link>
                        </Nav>
                    </Container>
                </Navbar>
                </Row>
                <Row>
                    <Col>
                    <Outlet />
                    </Col>
                    
                    <Col>

                    </Col>
                </Row>
                
                
            </Container>
        </>
    )
}
