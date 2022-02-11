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

export const getmyconversations = async () => {
    try{
        const conv = await api.get('messenger');
        return conv;
    }catch(err){
        return err.response;
    }
    
}