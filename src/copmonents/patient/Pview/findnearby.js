import React, { useState, useEffect } from 'react'
import { Container, Card, CardGroup, Row, Form, Button, Accordion} from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { findnearByDoc } from '../../../services/patientservice';
import { Gmessaging } from '../../message/messagin';
import { getimg } from '../../../services/genralservice';

const conditionalrender = (props) => {
    if (props.length)
        return (<Accordion.Header>Get Your Doctors Here</Accordion.Header>)
}

export const PFindNearBy = () => {

    const navigate = useNavigate();
    const [latitude, setlat] = useState('');
    const [longitude, setlong] = useState('');
    const [distance, setdistance] = useState('');
    let show = true;
    const [doctor, setdoc] = useState([]);

    const checkdoc = (id) => {
        console.log(id);
        navigate(id);
    }

    const finddoc = () => {
        if (!latitude || !longitude || !distance) {
            alert('please provide latitude, longitude and distance');
            return;
        }
        //  findnearByDoc({latitude,longitude,distance});
        findnearByDoc({ latitude, longitude, distance }).then(data => {
            console.log(data.data.doc);
            setdoc(data.data.doc);
        }).catch(err => {
            console.log(err);
        })
    }
    const setandfind = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            setlat(position.coords.latitude);
            setlong(position.coords.longitude);
            setTimeout(finddoc(), 200);

        })
    }
    const findSaved = () => {
        if (!localStorage.getItem('data')) {
            console.log("login again");
            return;
        }
        const data = JSON.parse(localStorage.getItem('data'));
        if (data.patientAddress.coordinates.length === 0 || data.patientAddress.coordinates[0] === null || data.patientAddress.coordinates[1] === null) {
            console.log("login again");
            return;
        }
        console.log(data.patientAddress.coordinates[0]);
        setlat(data.patientAddress.coordinates[0]);
        setlong(data.patientAddress.coordinates[1]);
        setTimeout(finddoc(), 200);
    }

    useEffect(() => {
        console.log(doctor);
        doctor.map(e => (
            e.profilePic ? document.getElementById(e.id).src = getimg(e.profilePic) : console.log("no pic found")
        
        )
            
            );
            console.log(doctor);
    },[doctor]);
    
    return (
        <>
            <Container>
                <Form.Group className="mb-3" controlId="formBasicdistance">
                    <Form.Label>Add the Distance in which you want to find Doctor in meter </Form.Label>
                    <Form.Control type="text" value={distance} onChange={e => setdistance(e.target.value)} placeholder="distance" />
                </Form.Group>

                <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>Find Doctor From Current Geo Location</Accordion.Header>
                        <Accordion.Body>
                            <Form >
                                <Form.Label>Add your location to find doctor near by You!!</Form.Label>
                                <Form.Group className="mb-3" controlId="formBasicLatitude">
                                    <Form.Label>Latitude</Form.Label>
                                    <Form.Control type="text" value={latitude} onChange={e => setlat(e.target.value)} placeholder="Latitude" />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicLongitude">
                                    <Form.Label>Longitude</Form.Label>
                                    <Form.Control type="text" value={longitude} onChange={e => setlong(e.target.value)} placeholder="Longitude" />
                                </Form.Group>

                                <Button variant="primary" className='m-3' onClick={finddoc} type="button">
                                    Find
                                </Button>
                                <Button variant="secondary" className='m-3' onClick={setandfind} type="button">
                                    Add Location
                                </Button>
                            </Form>
                        </Accordion.Body>
                    </Accordion.Item>
                    <CardGroup className='p-0'>
                        <Card style={{ width: "100%" }}>
                            <Card.Body>
                                <Card.Title className="mb-2" >Find Doctor Using Saved Location</Card.Title>
                                <Button variant="success" onClick={findSaved} type="button">
                                    Find Doctor
                                </Button>
                            </Card.Body>
                        </Card>
                    </CardGroup>
                    <Accordion.Item eventKey="2" >
                        {conditionalrender(doctor)}
                        {

                            doctor.map(el => (<Accordion.Body onClick={()=>{checkdoc(el.id)}}>
                                <Card style={{ width: "100%" }}>
                                    <Card.Body>
                                    <Card.Img variant="top" id={el.id} src={el.profilePic}/>
                                        <Card.Title className="mb-2" >{el.name}</Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">Address:{el.address}</Card.Subtitle>
                                        <Card.Text className='m=0'>
                                            Gender:{el.gender}
                                            </Card.Text>
                                            <Card.Text className='m=0'>
                                            Email:{el.email}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Accordion.Body>))
                        }

                    </Accordion.Item>
                </Accordion>
            </Container>
        </>
    )
}
