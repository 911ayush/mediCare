import React, { Component, useState, useEffect, useCallback } from 'react'
import { Navbar, Nav, Container, Card, Button, CardGroup } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { findDAppointment } from '../../../services/doctorservice';


export const DoctorAppointment = () => {
    const [Appointment, setAppointments] = useState([]);
    const fetchAppointment = () => { 
        findDAppointment().then(data => {
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
    useEffect(() => {
        if (localStorage.getItem('Appointments') === null) {
            console.log("No Avialable Appointments");
            fetchAppointment();
        } else {
            fetchfromlocalstorage();
        }
    }, [])


    return (
        <>
            <Container className='p-0'>
                <Button variant="secondary" type="button" className='mt-3 mb-3' onClick={fetchAppointment}>Refetch Appointments
                 </Button>
                {Appointment.map(el => (
                    <CardGroup className='p-0' controlId={el.id}>
                        <Card style={{width:"100%"}}>
                            <Card.Body><Card.Title className="mb-2" >{el.disease}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">{el.doctor}</Card.Subtitle>
                                <Card.Text >
                                    {el.discription}
                                </Card.Text></Card.Body>
                        </Card>
                    </CardGroup>


                ))}
            </Container>
        </>
    )
}

