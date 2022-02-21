import React, { useState, useEffect } from 'react'
import { Row, Container, Nav, Navbar, Dropdown, Col } from 'react-bootstrap';
import { useNavigate, Link, Outlet, useParams } from "react-router-dom";
import { PDoc } from './Pview/Pdoc';

export const Appointment = () => {
    const params = useParams();
    const [doctor,setDoctor] = useState({});

    useEffect(()=>{
        console.log(doctor.doctor);
    },[doctor])

    useEffect(()=>{
        if(localStorage.getItem('Appointments')){
             const id = params.appointmentid;
             const a = JSON.parse(localStorage.getItem('Appointments'));
             console.log(a)
            a.map(e => {
                if(e.id === id){
                    setDoctor(e);
                    
                    return;
                }
            })
        }
    },[])



    return (
        <>
            <Container>
                <Row>
                <Navbar bg="light" variant="light">
                    <Container>
                        <Navbar.Brand >{doctor.doctorname}</Navbar.Brand>
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to={"/messenger/"+doctor.doctor} >Message</Nav.Link>
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
