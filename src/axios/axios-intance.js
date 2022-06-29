import React from 'react'
import axios from "axios";

const baseURL = 'http://localhost:8081'
let authToken = localStorage.getItem('token')

const instance = axios.create({
    baseURL,
    headers: {
        Authorization: `Bearer ${authToken}`
    }
});

instance.interceptors.request.use(req => {
    let credentials = btoa('admin@gmail.com' + ':' + '123456');
    let basicAuth = 'Basic ' + credentials;
    req.headers.Authorization = basicAuth
    return req
}, error => {
    console.log("This is the error");
    throw error
})

export default instance
