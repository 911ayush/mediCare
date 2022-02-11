import React, { Component, useState, useEffect, useCallback, useRef } from 'react'
import { Navbar, Nav, Container, Card, Button, CardGroup } from 'react-bootstrap';
import { Link, useNavigate, useParams, Outlet } from "react-router-dom";
import { findPAppointment } from '../../../services/patientservice';


export const PatientAppointment = () => {
    const [Appointment, setAppointments] = useState([]);
    
    const navigate = useNavigate();
    const params = useParams();
    const [appointmentid,setappointmentid] = useState(params);

    const fetchAppointment = () => {
        findPAppointment().then(data => {
            localStorage.setItem('Appointments', JSON.stringify(data.data.appointment));
            setAppointments(data.data.appointment);
        }).catch(err => {
            console.log(err.message);
        })
    }
    const fetchfromlocalstorage = () => {
        console.log('fetched');
        setAppointments(JSON.parse(localStorage.getItem('Appointments')));
    }

    const toappointment = (id) => {
        navigate(id);
    }

    useEffect(()=>{
        setappointmentid(params)
    },[params])
    
    useEffect(() => {

        //appointmentid = params.id;
        console.log(params);
        if (localStorage.getItem('Appointments') === null) {
            console.log("No Avialable Appointments");
            fetchAppointment();
        } else {
            fetchfromlocalstorage();
        }
    }, [])


    return (
        <>
            <Outlet />
            {appointmentid.appointmentid ?
                ''
                :
                <Container className='p-0'>
                    <Button variant="secondary" type="button" className='mt-3 mb-3' onClick={fetchAppointment}>Refetch Appointments
                    </Button>
                    {Appointment.map(el => (
                        <CardGroup className='p-0' controlId={el.id} onClick={() => { toappointment(el.id) }}>
                            <Card style={{ width: "100%" }}>
                                <Card.Body><Card.Title className="mb-2" >{el.disease}</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">{el.doctor}</Card.Subtitle>
                                    <Card.Text >
                                        {el.discription}
                                    </Card.Text></Card.Body>
                            </Card>
                        </CardGroup>


                    ))}
                </Container>
            }

        </>
    )
}

