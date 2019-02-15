import axios from 'axios';

const config = {
  withCredentials: true,
};

const axiosInstance = axios.create(config);

axiosInstance.interceptors.response.use(res => res.data, err => Promise.reject(err));

export default axiosInstance;
