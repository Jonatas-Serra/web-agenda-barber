import axios from 'axios'

const api = axios.create({
  // baseURL: 'https://apiagendabarber.brazilsouth.cloudapp.azure.com/',
  baseURL: 'http://localhost:3000/',
})

export default api
