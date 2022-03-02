import React, { useState, useEffect, useRef, prevState } from 'react'
import { Container, Card, CardGroup, Row, Form, Button, Accordion, Col, Navbar, Nav } from 'react-bootstrap';
import { useParams, useNavigate, Link, Outlet} from "react-router-dom";
import { io } from "socket.io-client";
import { fetchConveId, getmessage, sendmessage } from '../../services/patientservice';
import style from './styl.css';
import { format } from "timeago.js"
import { Topbar } from '../topbar/Topbar';
import bsCustomFileInput from "bs-custom-file-input"
import { arrayBufferToBase64 } from '../../services/genralservice';

export const Gmessaging = () => {

    const params = useParams();
    const navigate = useNavigate();
    const socket = useRef();
    const [id, setid] = useState(localStorage.getItem('id'));
    const [loading, setloading] = useState(false);
    const [newmessage, setnewmessage] = useState('');
    const [newarivalmess, setnewarivalmess] = useState('');
    var [message, setmessage] = useState(null);
    const [towhomw, settowhomw] = useState(params.id);
    const [convId, setconvId] = useState(null);
    const [newimg, setnewimg] = useState(null);
    const scrollRef = useRef();


    const setimg = (e) => {
        setnewimg(e.target.files[0]);
    }
    const sendmess = async (e) => {
        e.preventDefault();
        // console.log(newimg);
        const mess = {
            "sender": id,
            "message": newmessage
        }
        let formdata = new FormData();
        formdata.append("pic", newimg);
        setnewimg(null);
        //console.log(newimg);
        formdata.append('sender', id);
        formdata.append('message', newmessage);
        try {
            const messagen = await sendmessage({
                convId,
                formdata: formdata
            });

            socket.current.emit("send message", {
                to: towhomw,
                from: id,
                mess: messagen.data.messagedoc
            });
            console.log(messagen.data.messagedoc);
            appendmess(messagen.data.messagedoc);
        } catch (err) {
            console.log(err);
            //  alert('please send again server error');
        }
    }
    const setmess = (data) => {
        if (data.length) {
            data.forEach(e => {
                if (e.pic) {
                    var base64Flag = 'data:image/jpeg;base64,';
                    var imageStr = arrayBufferToBase64(e.pic.data);
                    e.pic = base64Flag + imageStr;
                }
            });
        } else {
            if (data.pic) {
                var base64Flag = 'data:image/jpeg;base64,';
                var imageStr = arrayBufferToBase64(data.pic.data);
                data.pic = base64Flag + imageStr;
            }
        }

        setmessage(data);
    }


    const appendmess = (data) => {
        if (data.pic) {
            console.log(data.pic);
            var base64Flag = 'data:image/jpeg;base64,';
            var imageStr = arrayBufferToBase64(data.pic.data);
            data.pic = base64Flag + imageStr;
        }
        if (message) {
            setmessage((prev) => [...prev, data]);
        } else {
            setmessage(data);
        }

    }

    const doVideoCall = () => {
        console.log(params);
        navigate(`/video-call/${params.id}`);
    }


    useEffect(() => { 
        bsCustomFileInput.init();
        console.log("params",params);
    }, [])

    useEffect(async () => {
        try {
            setloading(false);
            const mess = await getmessage(convId);
            setloading(true);
            console.log(mess.data.messages);
            setmess(mess.data.messages);
        } catch (err) {
            //alert("mesages cannot be found");
        }
    }, [convId])

    useEffect(async () => {
        settowhomw(params.id);
        try {
            setloading(false);
            const convId = await fetchConveId({ id1: params.id, id: localStorage.getItem('id') });
            setconvId(convId.data.conversationId.id);
        } catch (err) {
            // alert("user cannot be found");
        }
    }, [params.id]);

    useEffect(() => {
        console.log(message);
    }, [message])

 

    


    useEffect(() => {
        appendmess(newarivalmess);
    }, [newarivalmess])

    useEffect(() => {
        socket.current = io("https://pacific-bayou-88396.herokuapp.com");
        socket.current.emit("adduser", id);
        socket.current.on(id, (data) => {
            setnewarivalmess(data.mess);
        })
    }, [id, towhomw]);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [message]);

    useEffect(() => {
        if (message) {
            console.log(message);
        }
    }, []);
    return (
        <>
            <Topbar />

            <Container className="border border-dark p-0">
                <Navbar bg="dark" variant="dark">
                    <Navbar.Brand className="p-1">{towhomw}</Navbar.Brand>
                    <Nav>
                        <Nav.Link  onClick={doVideoCall}>Do Video Call</Nav.Link>
                    </Nav>
                </Navbar>

                <div className="hf">{
                    loading ? message ?
                        (message.map(el => (
                            <div ref={scrollRef} key={el.id} className={el.sender === id ? 'message-con me' : 'message-con other'}>
                                <div className='message-box'>
                                    <Card.Img variant="top" src={el.pic} />
                                    <div key={el.id + el.message} className='message'>
                                        {el.message}
                                    </div>
                                </div>
                                <div key={el.id + el.createdAt} className='timestamp'>{format(el.createdAt)}</div>
                            </div>
                        )))
                        :
                        (<div>no message to show
                        </div>)
                        :
                        <Container>Connecting</Container>
                }
                </div>
                <div><Form.Control type="file" onChange={e => setimg(e)}></Form.Control></div>
                <div className='wf'>
                    <Form.Control type="text" className='wi-8' value={newmessage} onChange={e => setnewmessage(e.target.value)} placeholder="message" />
                    <Button type="button" className='wi-2' onClick={sendmess}>Send</Button>
                </div>

            </Container>
            <Container>
                <Outlet />
            </Container>

        </>
    )
}
