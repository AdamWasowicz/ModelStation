import axios from 'axios';

const request = axios.create({
    baseURL: 'https://localhost:44363',
    validateStatus: false
});

export default request;