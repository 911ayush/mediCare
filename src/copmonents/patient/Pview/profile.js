import React, { useState, useEffect } from 'react'
import { Form, Container, Card, Accordion, Button, Modal } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { updatePatient, updateuserdataLocalStorage } from '../../../services/patientservice';
//import EditIcon from '@material-ui/icons/Edit';
export const PatientProfile = () => {

    const navigate = useNavigate();
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const present = 'true';
    const disabled = 'true';
    const [name, setname] = useState('');
    const [email, setemail] = useState('');
    const [address, setaddress] = useState('');
    const [longitude, setlongitude] = useState('');
    const [latitude, setlatitude] = useState('');
    const getLocation = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            setlatitude(position.coords.latitude);
            setlongitude(position.coords.longitude);
        })
    }
    const savelocation = (e) => {
        e.preventDefault();
        updatePatient({ patientAddress: { coordinates: [latitude, longitude] } }).then((data, err) => {
            if (data.status != 200) {
                alert(`Failed to upload ${data.data.message}`);
                return;
            }
            setShow(true);
            updateuserdataLocalStorage(data.data.doc);
        }).catch(err => {
            console.log("Failed to update Loction")
        })
    }


    useEffect(() => {
        if (localStorage.getItem('data') === null) {
            navigate('../');
        } else {
            const data = JSON.parse(localStorage.getItem('data'));
            setname(data.name);
            setemail(data.email);
            setaddress(data.address);
            if(!(data.patientAddress.coordinates.length === 0 || data.patientAddress.coordinates[0] === null || data.patientAddress.coordinates[1] === null)){
                setlongitude(data.patientAddress.coordinates[1]);
                setlatitude(data.patientAddress.coordinates[0]);
            }
        }
    }, []);



    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Success</Modal.Title>
                </Modal.Header>
                <Modal.Body>Your Location is uploaded!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
            <Container >
                <Card style={{ width: "100%" }}>
                    <Card.Body>
                        <Card.Title>
                            {name}
                        </Card.Title>
                        <Card.Subtitle>
                            {email}
                        </Card.Subtitle>
                        <Card.Text>
                            {address}
                        </Card.Text>
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Body>
                        <Accordion defaultActiveKey="0">
                            <Accordion.Item eventKey="1">
                                <Accordion.Header>
                                    Your saved Geo Location
                                </Accordion.Header>
                                <Accordion.Body>
                                    <Form onSubmit={savelocation} className='text-center'>
                                        <Form.Group className="mb-3" controlId="formBasicdistance">
                                            <Form.Control type="text" value={latitude} onChange={e => setlatitude(e.target.value)} placeholder="longitude" />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="formBasicdistance">

                                            <Form.Control type="text" value={longitude} onChange={e => setlongitude(e.target.value)} placeholder="longitude" />
                                        </Form.Group>
                                        <Button type="submit" className='m-2' >Save Location</Button>
                                        <Button variant="success" typpe="button" className='m-2 mb-2' onClick={getLocation}>Get Location</Button>
                                    </Form>


                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </Card.Body>
                </Card>
            </Container>
        </>
    )
}
