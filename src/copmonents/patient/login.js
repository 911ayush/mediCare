import React, { useState } from 'react'
import { Form, Button, Container } from 'react-bootstrap'
import {  useNavigate } from "react-router-dom";
import { logInPatient } from '../../services/patientservice'



export const PatientLogIn = () => {
    let mystyle = {
        width: "500px",
        margin: "auto"
    }
    const navigate = useNavigate();
    const login = () => {
        logInPatient(logcred).then(data => {
                console.log(data);
                if(data.status === 200){
                    navigate('../../patient');
                }
            }).catch(err => {
                console.log(err)
            });
    }

    const [logcred, setcred] = useState({ email: '', password: '' });
    const submit = (e) => {
        e.preventDefault();
        login();
    }


    return (
        <>
            <div style={mystyle}>
                <Container fluid="xl" className='mb-3' >
                    <Form onSubmit={submit} >
                        <Form.Group className="mb-30" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" value={logcred.email} onChange={(e) => setcred({ ...logcred, email: e.target.value })} placeholder="Enter email" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" value={logcred.password} onChange={(e) => setcred({ ...logcred, password: e.target.value })} placeholder="Password" />
                        </Form.Group>

                        <Button variant="primary " type="submit">
                            Submit
                        </Button>
                    </Form>
                </Container>
            </div>


        </>
    )
}
