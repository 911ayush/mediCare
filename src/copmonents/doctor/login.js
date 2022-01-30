import React, { useState } from 'react'
import { Form, Button, Container} from 'react-bootstrap'
import { logInDoctor } from '../../services/doctorservice';



export const DoctorLogIn = () => {
    let mystyle = {
        width: "500px",
        margin: "auto"
    }
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const submit = (e) => {
        e.preventDefault();
        logInDoctor(email, password);
    }
    return (
        <>
            <div style={mystyle}>
                <Container fluid="xl" className='mb-3' >
                    <Form onSubmit={submit} >
                        <Form.Group className="mb-30" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
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
