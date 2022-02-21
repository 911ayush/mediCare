import React, { Component, useState, useEffect, useCallback, useRef } from 'react'
import { Navbar, Nav, Container, Card, Button, CardGroup, Dropdown } from 'react-bootstrap';
import { Link, useNavigate, useParams, Outlet } from "react-router-dom";
import { fetchdoctinfo, findPAppointment } from '../../../services/patientservice';


export const PatientAppointment = () => {
    const [Appointment, setAppointments] = useState([]);
    
    const navigate = useNavigate();
    const params = useParams();
    const [appointmentid,setappointmentid] = useState(params);
    const [doctorName ,setDoctorName] = useState(null);
    const fetchAppointment = () => {
        findPAppointment().then(async data => {
            //localStorage.setItem('Appointments', JSON.stringify(data.data.appointment));
            let appoint = data.data.appointment;
            appoint = await fillfield(appoint);
            console.log("appointm",appoint);
            localStorage.setItem('Appointments', JSON.stringify(appoint));
            setAppointments(appoint);
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
    
    const fillfield = async (appointment) => {
        for(let i = 0;i<appointment.length;i++){
            const docinfo = await fetchdoctinfo(appointment[i].doctor);
            appointment[i].doctorname = docinfo.data.data.name;
            console.log(docinfo.data.data);
        }
        return appointment;
    }

    useEffect(()=>{
        setappointmentid(params);
        
    },[params])
    
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
            
            {appointmentid.appointmentid ?
                 <>
                 {doctorName !== null ? 
                 <Container>
                     <Card.Title className='ml-1'>{doctorName}</Card.Title>
                 </Container>
                 
                 : 
                 ''
                 }
                 <Outlet />
                 </>
                 
                :
                <Container className='p-0'>
                    <Button variant="secondary" type="button" className='mt-3 mb-3' onClick={fetchAppointment}>Refetch Appointments
                    </Button>
                    {Appointment.map(el => (
                        <CardGroup className='p-0' controlId={el.id} onClick={() => { toappointment(el.id) }}>
                            <Card style={{ width: "100%" }}>
                                <Card.Body><Card.Title className="mb-2" >{el.disease}</Card.Title>
                                {el.doctorname !== null ? <Card.Subtitle className="mb-2 text-muted">{el.doctorname}</Card.Subtitle>:''}
                                    
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

