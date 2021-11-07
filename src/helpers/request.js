import axios from 'axios';

const request = axios.create({
    baseURL: 'https://localhost:44363',
});

export default request;