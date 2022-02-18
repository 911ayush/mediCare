import { alignPropType } from "react-bootstrap/esm/types";
import axios from 'axios'

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

export const getimg = (profilePic) => {
    console.log(profilePic.data);
    const arrayBufferToBase64 = (buffer) => {
        var binary = '';
        var bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return window.btoa(binary);
    };
    var base64Flag = 'data:image/jpeg;base64,';
    var imageStr = arrayBufferToBase64(profilePic.data);
    return base64Flag + imageStr;
}

export const arrayBufferToBase64 = (buffer) => {
    var binary = '';
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => binary += String.fromCharCode(b));
    return window.btoa(binary);
};

export const sendfirebasetoken = async (firebasetoken) => {
    console.log("ghh");
    try{
        const doc = await api.post('/notification/firebasetoken',firebasetoken);
        console.log(doc);

    }catch(err){
        console.log(err);
    }
};

export const removefirebasetoken = async (firebasetoken) => {
    try{
        const doc = await api.delete('/notification/firebasetoken',firebasetoken);
        console.log(doc);
    }catch(err){
        console.log(err);
    }
};