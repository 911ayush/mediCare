import axios from 'axios'
import { apperror } from './error'
import React, { useState } from 'react'
import { useLocation } from 'react-router'
const api = axios.create({
    baseURL: 'http://localhost:8000/api/v1/'
})


api.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        config.headers.authorization = `Bearer ${token}`;
        return config;
    },
    error => {
        return Promise.reject(error);
    }
)

export const signUpPatient = async (doc) => {
    try {
        let res = await api.post('patient/signup', doc);
        console.log(res.status);
    } catch (err) {
        console.log(err.message);
    }
}

export const logInPatient = async (props) => {
    try {
        const data = await api.post('patient/login', props)
        localStorage.setItem('token', data.data.token);
        localStorage.setItem('id', data.data.doc.id);
        localStorage.setItem('data', JSON.stringify(data.data.doc));
        console.log(data);
        return data;
    } catch (err) {
        return err;
    }
}

export const getPatients = async () => {
    try {
        const patients = await api.get('patient');
        console.log(patients.data);
    } catch (err) {
        console.log(err.message);
    }
}

export const findPAppointment = async () => {
    try {
        if (localStorage.getItem('token') === null) {
            return new apperror(400, 'token not found');
        }
        let appointments = await api.get('patient/appointments');
        //props.setAppointments(appointments);
        return appointments;
    } catch (err) {
        console.log(err);
    }

}

export const findnearByDoc = async (props) => {
    try {
       console.log(props);
       const data = await api.get(`doctor/nearby/${props.distance}/center/${props.latitude},${props.longitude}/unit/mi`);
      // console.log(data);
       return data;
    } catch (err) {
        console.log(err);
    }
}

export const updatePatient = async (props) => {
    try {
       //console.log(props);
       const data = await api.patch('patient',props);
       //console.log(data);
      //return;
      return data;
    } catch (err) {
        console.log(err.response);
        return err.response;
    }

}

export const updateuserdataLocalStorage = (props) => {
    localStorage.removeItem('data');
    console.log(props);
    localStorage.setItem('data',JSON.stringify(props));   
}

export const fetchdoctinfo = async (props) => {
       try{
           const docinfo = await api.get(`doctor/${props}`);
           return docinfo;
       }catch(err){
           console.log(err.response);
           return err.response;
       }
}

export const fetchConveId = async (props) => {
   // console.log(props);
    try{
        const convId = await api.post(`messenger/${props.id1}/${props.id}`);
        console.log(convId);
        return convId;
    }catch(err){
       // console.log(err.response);
        return err;
    }
}

export const sendmessage = async (props) => {
    try{
        const message = await api.post(`messenger/message/${props.convId}`,props.formdata,{});
        return message;
    }catch(err){
        console.log(err.response);
        return err.response;
    }
}

export const getmessage = async (props) => {
    try{
        const messages = await api.get(`messenger/message/${props}`);
        return messages;
    }catch(err){
       // console.log(err.response);
        return err;
    }
}

export const postDocument = async (props) => {
    try{
        console.log(props);
        const document = await api.post('document',props,{});
        return document;
    }catch(err){
       // console.log(err.response);
        return err.response;
    }
}

export const getDocument = async () => {
    try{
        const document = await api.get('document');
        return document;
    }catch(err){
        return err.response;
    }
}