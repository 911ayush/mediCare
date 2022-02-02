import React, { useState, useEffect, useRef, prevState } from 'react'
import { Container, Card, CardGroup, Row, Form, Button, Accordion} from 'react-bootstrap';
import { useParams, useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { fetchConveId, getmessage, sendmessage } from '../../services/patientservice';
import style from './styl.css';

export const Gmessaging = () => {

    const params = useParams();
    const socket = useRef();
    const [id,setid]= useState(localStorage.getItem('id'));
    const [newmessage,setnewmessage] = useState('');
    const [newarivalmess, setnewarivalmess] = useState('');
    var [message,setmessage] = useState([]);
    const [towhomw, settowhomw] = useState(params.id);
    const [convId, setconvId] = useState(null);

    useEffect( async () => {
        try{
            const mess = await getmessage(convId);
            console.log(mess.data.messages);
            setmessage(mess.data.messages);
        }catch(err){
            alert("mesages cannot be found");
        }
    },[convId])

    useEffect(async ()=>{
        settowhomw(params.id);
        try{
            const convId = await fetchConveId({id1:params.id,id:localStorage.getItem('id')});
            setconvId(convId.data.conversationId.id);
            
        }catch(err){
            alert("user cannot be found");
        }
    },[params.id]);

    useEffect( () => {
        console.log(message);
    },[message])

    const sendmess = async (e) => {
        e.preventDefault();
        const mess = {
            "sender":id,
            "message":newmessage
        }
        try{
            const messagen = await sendmessage({
                convId,
                mess:{
                    "sender":id,
                    "message":newmessage
                }
            });
            socket.current.emit("send message",{
                to:towhomw,
                from:id,
                mess:messagen.data.message
            });
            setmess(messagen.data.message); 
        }catch(err){
            console.log(err);
            alert('please send again server error');
        }
    }
    const setmess = (data) => {
        setmessage((prev)=> [ ...prev, data]);
    }

    useEffect(()=>{
        setmess(newarivalmess);
    },[newarivalmess])

    useEffect(()=>{
        socket.current = io("ws://localhost:8900");
        socket.current.emit("adduser",id);
        socket.current.on(id,(data)=>{
            setnewarivalmess(data.mess);
        })
    },[id,towhomw]);
   
    
    return (
        <> 
        <Form.Control type="text" value={newmessage} onChange={e => setnewmessage(e.target.value)} placeholder="message" />
            {message.map(el => (
                <div style={style} className={el.sender === id ? 'me':'other'}>{el.message}</div>
            ))}
            <Button type="button" onClick={sendmess}>sendmess</Button>
        </>
    )
}
