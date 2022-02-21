import React, { useState } from 'react'
import { Form, Button, Container,Row } from 'react-bootstrap'
import { useNavigate } from "react-router-dom";
import { logInPatient, loginRutine, socialAuthFacebook } from '../../services/patientservice'


import FacebookLogin from 'react-facebook-login';


export const PatientLogIn = () => {
    let mystyle = {
        width: "500px",
        margin: "auto"
    }
    const navigate = useNavigate();
    const login = () => {
        logInPatient(logcred).then(data => {
            console.log(data);
            if (data.status === 200) {
                navigate('../../patient');
            }
        }).catch(err => {
            console.log(err)
        });
    }

    const [logcred, setcred] = useState({ email: '', password: '' });

    const responseFacebook = async (response) => {
        console.log(response);
        if(response.accessToken&&response.email&&response.name){
            const doc = {
                "email":response.email,
                "name":response.name,
                "accessToken":response.accessToken
            }
            const info = await socialAuthFacebook(doc);
            loginRutine(info.data)
            console.log(info);
            if (info.status === 200) {
                navigate('../../patient');
            }
            //console.log(info);
        }else{
            alert('cannot login through social auth please do it manually');
        }
        
    }
    const componentClicked = () => {
        console.log("clicked");
    }
    const submit = (e) => {
        e.preventDefault();
        login();
    }


    return (
        <>
            <div style={mystyle}>
                <Container fluid="xl" className='mb-3' >
                    <Row>
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
                    </Row>
                    <Row className='mt-4'>
                    <FacebookLogin
                appId="1027670411439380"
                autoLoad={true}
                fields="name,email"
                onClick={componentClicked}
                callback={responseFacebook} />
                    </Row>

                    
                </Container>
            </div>
            
            
            
        </>
    )
}
