import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api/rest/'
});

api.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Wrong Services')
);

export default api;