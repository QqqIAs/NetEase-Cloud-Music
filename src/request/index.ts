import axios from 'axios';

const instance = axios.create({
    withCredentials: true,
    timeout: 60 * 1000,
    baseURL: '/api',
});


instance.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        return Promise.reject(error);
    },
);

export default instance;
