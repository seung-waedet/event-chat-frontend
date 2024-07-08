import axios from "axios";

const axiosInstance = axios.create ({
     baseURL: 'http://localhost:3000'
});

axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('token')

        if (accessToken && config.headers) {
            config.headers.authorization = `Bearer: ${accessToken}`
        };
        
        return config;
    }
)


export default axiosInstance;
export const useAxios = () => axiosInstance;
