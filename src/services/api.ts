import axios from 'axios'

const api = axios.create({
  baseURL: 'https://apiagendabarber.brazilsouth.cloudapp.azure.com/',
})

export default api
