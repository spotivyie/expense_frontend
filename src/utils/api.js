import axios from 'axios'
import { BASE_URL, API_PATHS } from './apiPaths'

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

export default api
