import axios from "axios";

const axiosNoAuth = axios.create({
    baseURL: process.env.BASE_URL || 'http://localhost:8080/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosNoAuth;