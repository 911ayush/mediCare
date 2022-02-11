import React, { useState, useEffect, useRef } from 'react'
import { Navbar, Nav, Container, Card, Row, Col, Button } from 'react-bootstrap';
import { getOverlayDirection } from 'react-bootstrap/esm/helpers';
import { Link, useNavigate, Outlet } from "react-router-dom";
import Peer from "peerjs";

export const Videocall = () => {
    const [id, setid] = useState(localStorage.getItem('id'));
    const [mypeerjsid, setmypeerjsid] = useState('');
    const [otherid, setotherid] = useState('');
    const peerinst = useRef(null);
    const [peers, setpeers] = useState({});
    const callinst = useRef(null);
    const [url, setUrl] = useState('');



    useEffect(() => {
        const mypeer = new Peer(id);
        if (mypeer.is === null) {
            mypeer.id = id;
        }

        mypeer.on('open', (id) => {
            console.log(id);
            setmypeerjsid(id);
        })

        mypeer.on('call', (call) => {
            console.log("got called66666666666666666666666666666666666666666666666666666666666666666666666666666666666666666")
            if (callinst.current != null) {
                console.log("another call is coming");
                call.close();
            } else {
                const myvideo = document.createElement('video');
                myvideo.muted = true;
                navigator.mediaDevices.getUserMedia({
                    video: true,
                    audio: false
                }).then(stream => {
                    getVideo(myvideo, stream);
                    call.answer(stream);
                })
                const video = document.createElement('video');
                call.on('stream', (rstream) => {
                    getVideo(video, rstream);
                })
                call.on('close', () => {
                    video.remove();
                    myvideo.remove();
                    callinst.current = null;
                })
                callinst.current = call;
            }

        })
        peerinst.current = mypeer;
    }, [id])



    const videocall = () => {
        const myvideo = document.createElement('video');
        myvideo.muted = true;
        navigator.mediaDevices.getUserMedia({
            video: true,
            audio: false
        }).then(stream => {
            getVideo(myvideo, stream);
            const call = peerinst.current.call(otherid, stream);
            console.log(call);
            const video = document.createElement('video');
            call.on('stream', (rstream) => {
                getVideo(video, rstream);
            })
            call.on('close', () => {
                if (video) {
                    video.remove();
                }

                myvideo.remove();
                callinst.current = null;
            })
        }).catch(err => {
            console.log(err.message);
        })
    }

    const cutcall = () => {
        callinst.current.close();
        callinst.current = null;
    }

    const getVideo = (video, stream) => {
        video.srcObject = stream
        video.addEventListener('loadedmetadata', () => {
            video.play()
        })
        const videoframe = document.getElementById('video-frame');
        videoframe.append(video)
    }




    return (
        <>
            {/* <label>your id</label>
            <input type="text" value={mypeerjsid} onChange={e => setmypeerjsid(e.target.value)}></input>
            <label>other id</label>
            <input type="text" value={otherid} onChange={e => setotherid(e.target.value)}></input>
            <Button type="button" onClick={videocall}>Video Call</Button>
            {
                callinst.current ? <Button varient="danger" type="button" onClick={cutcall} >END CALL</Button> : ''
            }
            <div id='video-frame'>
                videoframe
            </div> */}



        </>
    )
}
