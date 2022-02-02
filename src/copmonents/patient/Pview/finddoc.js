import React, { useState, useEffect } from 'react'
import { Navbar, Nav, Container, Card,Row, Col } from 'react-bootstrap';
import { Link ,useNavigate,Outlet } from "react-router-dom";
import { PFindNearBy } from './findnearby';

export const PFindDoc = () => {
    
    const navigate = useNavigate();
    const [lat,setlat] = useState('');
    const [long , setlong] = useState('');
    useEffect(() => {
      
    },[]);
   
   
    
    return (
        <>
            <Container>
            <Row><Outlet /></Row>
            <Row>
                <PFindNearBy />
            </Row>
            </Container>
        </>
    )
}
