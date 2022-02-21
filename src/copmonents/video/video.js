import React, { useState, useEffect, useRef } from 'react'
import { Navbar, Nav, Container, Card, Row, Col, Button, Modal } from 'react-bootstrap';
import { getOverlayDirection } from 'react-bootstrap/esm/helpers';
import { Link, useNavigate, useParams, URLSearchParamsInit, Outlet } from "react-router-dom";
import Peer from "peerjs";

export const Videocall = () => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(false);



    let params = useParams();
    const [id, setid] = useState(localStorage.getItem('id'));
    const [mypeerjsid, setmypeerjsid] = useState('');
    const [otherid, setotherid] = useState('');
    const [otherName,setothername] =useState('');
    let peerinst = useRef(new Peer(id));
    let callinst = useRef(null);
    let peercon = useRef(null);

    peerinst.current.on('open', () => {
        console.log("hash value",peerinst.current.hashValue);
    })
    peerinst.current.on('error',(error)=>{
        console.log(error);
    })
    
    useEffect(() => {
        console.log(params);
        console.log(peerinst.current);
        peerinst.current._id = id;
        console.log(peerinst.current);

        peerinst.current.on('connection', (conn) => {
            conn.on('open', () => {
                if (peercon.current !== null) {
                    conn.send('On Another Call');
                    conn.close();
                } else {
                    peercon.current = conn;
                    conn.on('data', (d) => {
                        console.log(d);
                        if (d.id !== null) {
                            setotherid(d.id);
                            setothername(d.name);
                            setShow(true);
                        } else if (d === 'Failed to connect') {
                            console.log('d');
                        }
                    })
                    conn.on('close', () => {
                        console.log('closed');
                        peercon.current = null;
                    })

                }
            })
        })
        peerinst.current.on('call', (call) => {
            console.log("got called66666666666666666666666666666666666666666666666666666666666666666666666666666666666666666")
            let myvideo = document.createElement('video');
            myvideo.muted = true;
            navigator.mediaDevices.getUserMedia({
                video: true,
                audio: false
            }).then(stream => {
                getVideo(myvideo, stream);
                call.answer(stream);
            }).catch(err => {
                console.log(err.message);
                peercon.current.send('Failed to connect');
                peercon.current.close();
                call.close();
                callinst.current = null;
                peercon.current = null;
            })
            let video = document.createElement('video');
            call.on('stream', (rstream) => {
                getVideo(video, rstream);
            })
            call.on('close', () => {
                video.remove();
                myvideo.remove();
                callinst.current = null;
            })
            callinst.current = call;
        })
    }, [id])

    const check = () => {

    }

    const videocall = () => {
        let peerconnection = peerinst.current.connect(otherid);
        if (peerconnection) {
            peerconnection.on('open', () => {
                console.log("fgh");
                peerconnection.send({ id,'name':(JSON.parse(localStorage.getItem('data'))).name });
                peerconnection.on('data', d => {
                    console.log(d);
                    if (d === 'accepted') {
                        let myvideo = document.createElement('video');
                        myvideo.muted = true;
                        navigator.mediaDevices.getUserMedia({
                            video: true,
                            audio: false
                        }).then(stream => {
                            getVideo(myvideo, stream);
                            let call = peerinst.current.call(otherid, stream);
                            callinst.current = call;
                            console.log(call);
                            let video = document.createElement('video');
                            call.on('stream', (rstream) => {
                                getVideo(video, rstream);
                            })
                            call.on('close', () => {
                                callinst.current = null;
                                if (video) {
                                    video.remove();
                                }
                                myvideo.remove();
                            })
                        }).catch(err => {
                            console.log(err.message);
                            peerconnection.send('Failed to connect');
                            peerconnection.close();
                        })
                    } else if (d === 'rejected') {
                        console.log('rejected');
                    }
                })
                peerconnection.on('close', () => {
                    console.log('Connection is cut');
                    peerconnection = null;
                    peercon.current = null;
                    console.log(peercon.current);
                })
            })
            peercon.current = peerconnection;
        }else{
            console.log("no done");
        }
        
    }

    const rejectCall = () => {
        peercon.current.send('rejected');
        peercon.current.close();
        peercon.current = null;
        handleClose();
    }

    const acceptCall = () => {
        peercon.current.send('accepted');
        handleClose();
    }
    const cutcall = () => {
        callinst.current.close();
        callinst.current = null;
        peercon.current.close();
    }

    const getVideo = (video, stream) => {
        video.srcObject = stream
        video.addEventListener('loadedmetadata', () => {
            video.play()
        })
        let videoframe = document.getElementById('video-frame');
        videoframe.append(video)
    }




    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Video Call</Modal.Title>
                </Modal.Header>
                <Modal.Body>{otherName}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={acceptCall}>
                        Accept
                    </Button>
                    <Button variant="primary" onClick={rejectCall}>
                        Reject
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>


            <Container>
                <Row>
                    <label>your id</label>
                    <input type="text" value={mypeerjsid} onChange={e => setmypeerjsid(e.target.value)}></input>
                    <label>other id</label>
                    <input type="text" value={otherid} onChange={e => setotherid(e.target.value)}></input>
                    <button type="button" onClick={check}>check</button>
                    <Button type="button" onClick={videocall}>Video Call</Button>
                    {
                        callinst.current ? <Button varient="danger" type="button" onClick={cutcall} >END CALL</Button> : ''
                    }
                    <div id='video-frame'>
                        videoframe
                    </div>
                </Row>

            </Container>


        </>
    )
}
