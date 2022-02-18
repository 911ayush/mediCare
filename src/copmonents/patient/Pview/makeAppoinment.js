import React, { useState, useEffect } from 'react'
import { Navbar, Nav, Container,Form,Button, Card, Row, Col } from 'react-bootstrap';
import { Link, useNavigate,useParams, Outlet } from "react-router-dom";
import { PFindNearBy } from './findnearby';
import { makeappointment } from './../../../services/patientservice';

export const PMakeappointment = () => {
    const params = useParams();
    const [disease, setdisease] = useState('');
    const [discription, setdiscription] = useState('');

    const createAppointment = () => {
        // console.log(disease);
        // console.log(discription);
         //console.log(params.doctorid);
        const appointmentdoc = {
            "disease":disease,
            "discription":discription,
            "patient":localStorage.getItem('id'),
            "doctor":params.doctorid
        }
        //console.log(appointmentdoc);
        makeappointment(appointmentdoc);
    }
    useEffect(() => {

    }, []);



    return (
        <>
            <Container>
                <Form >
                    <Form.Group className="mb-30" controlId="formBasicname">
                        <Form.Label className='p-2'>disease</Form.Label>
                        <Form.Control type="text" value={disease} onChange={e => setdisease(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-30" controlId="formBasicfile">
                        <Form.Label>discription</Form.Label>
                        <Form.Control type="text" value={discription} onChange={e => setdiscription(e.target.value)} />
                    </Form.Group>

                    <Button variant="primary" className='mt-2' onClick={createAppointment} type="button">
                        Submit
                    </Button>

                </Form>
            </Container>
        </>
    )
}