import axios from 'axios';

const api = axios.create({
  baseURL: 'http://26.73.186.188:3333',
})

export default api