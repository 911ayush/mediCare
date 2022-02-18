import React, { useState, useEffect } from 'react'
import { Navbar, Nav, Container, Card, Row, Col, Button } from 'react-bootstrap';
import { Link, useNavigate, Outlet, useLocation, useParams } from "react-router-dom";
import { getimg } from '../../../services/genralservice';
import { fetchdoctinfo } from '../../../services/patientservice';
import { PFindNearBy } from './findnearby'; 


export const PDoc = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [id, setid] = useState(params.id);
    const [docinfo, setdocinfo] = useState({});
    const [profilePic, setprofilePic] = useState('');
    const fetchdocinfo = async (id) => {
        try {
            const info = await fetchdoctinfo(id);
            console.log('fired');
            setdocinfo(info.data.data);
        } catch (err) {
            console.log(err);
        }
    }
    
    const dotalk = () => {
        if (!docinfo) {
            return;
        }
        navigate(`/patient/messenger/${docinfo.id}`);
    }

    const makeappointment = () => {
        navigate(`/patient/appointments/create-appointment/${docinfo.id}`);
    }

    useEffect(() => {
        if (docinfo.profilePic) {
            setprofilePic(getimg(docinfo.profilePic));
        }
    }, [docinfo]);

    useEffect(() => {
        setid(params.id);
        fetchdocinfo(id);
    }, [id, params.id]);



    return (
        <>
            <Container className='mb-5'>
                <Card >
                    <Card.Img variant="top" src={profilePic} />
                    <Card.Body className="text-center">

                        <Card.Title>{docinfo.name}</Card.Title>
                        <Card.Subtitle className='mb-1'>Email: {docinfo.email}</Card.Subtitle>
                        <Card.Subtitle className='mb-1'>Specialization: {docinfo.specialization}</Card.Subtitle>
                        <Card.Subtitle className='mb-1'>Address: {docinfo.address}</Card.Subtitle>
                        <Card.Subtitle className='mb-1'>Pin Code: {docinfo.pincode}</Card.Subtitle>
                        <Card.Subtitle className='mb-1'>Phone No: {docinfo.phoneCode} {docinfo.phoneNo}</Card.Subtitle>
                        <Button className='mb-1 mt-2' onClick={dotalk} variant="primary">Message</Button>
                        <Button className='mb-1 mt-2' onClick={makeappointment} variant="primary">Make Appointment</Button>
                    
                    </Card.Body>
                </Card>
            </Container>
        </>
    )
}
