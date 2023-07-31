import axios, {AxiosInstance, AxiosError, AxiosResponse }from 'axios'


const instance: AxiosInstance = axios.create({
    withCredentials: true,
    timeout: 60 * 1000,
    baseURL: '/api',
});


instance.interceptors.response.use(
    (response: AxiosResponse) => {
        return response.data;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    },
);

export default instance;
