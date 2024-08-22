import axios from "axios";
const BASE_USRL = 'http://localhost:9000/api'

export default axios.create({
  baseURL:BASE_USRL
})

export const axiosPrivate = axios.create({
  baseURL:BASE_USRL,
  headers:{'Content-Type':'application/json'},
  withCredentials:true
})