import React, { useState, useEffect } from 'react'
import { Form, Container, Nav, Navbar, Dropdown, Button } from 'react-bootstrap';
import { useNavigate, Link, Outlet, useParams } from "react-router-dom";
import { postDocument } from '../../services/patientservice';

export const UploadDocument = () => {

    const [document, setdocument] = useState(null);
    const [name, setname] = useState(null);
    const params = useParams();

    const uploadtoapi = async () => {
        const formdata = new FormData();
        formdata.append("document", document);
        formdata.append("name", name);
        if (params.appointmentid) {
            formdata.append("appointmentid", params.appointmentid)
        }
        try {
            const doc = await postDocument(formdata);
            console.warn(doc);
        } catch (err) {
            console.log(err);
        }
    }

    const adddocument = (e) => {
        setdocument(e.target.files[0]);
    }


    return (
        <>
            <Container>
                <Form >
                    <Form.Group className="mb-30" controlId="formBasicname">
                        <Form.Label className='p-2'>Please enter the name of TEST/DOCUMENT you are uploaing</Form.Label>
                        <Form.Control type="text" value={name} onChange={e => setname(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-30" controlId="formBasicfile">
                        <Form.Label></Form.Label>
                        <Form.Control type="file" onChange={e => { adddocument(e) }} />
                    </Form.Group>

                    <Button variant="primary" className='mt-2' onClick={uploadtoapi} type="button">
                        Submit
                    </Button>

                </Form>
            </Container>
        </>
    )
}
