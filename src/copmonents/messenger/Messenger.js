import React, { useEffect, useState } from 'react';
import { Topbar } from './../topbar/Topbar';
import { Conversations } from './../conversations/Conversations';
import { Message } from './../message/Message';
import { Navbar, Nav, Container, NavLink, Col, Row } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";
import { getmyconversations } from '../../services/messaging';

export const Messenger = () => {
    const [id, setid] = useState(localStorage.getItem('id'));
    const [conversations, setconversations] = useState([]);

    useEffect(async () => {
        try {
            const res = await getmyconversations();
            console.log(res);
            setconversations(res.data.conversationId);
        } catch (err) {
            console.log(err);
        }
    }, [id])

    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand>Your Messages</Navbar.Brand>
                </Container>
            </Navbar>
            <Container>
                {conversations.map(el => (
                    <Container>
                        <Nav.Link as={Link} to={el.id} >{el.id}</Nav.Link>
                    </Container>
                ))}

            </Container>
        </>
    )
}
