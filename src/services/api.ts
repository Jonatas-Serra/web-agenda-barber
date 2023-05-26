import axios from 'axios'

const api = axios.create({
  // baseURL: 'https://apiagendabarber.brazilsouth.cloudapp.azure.com/',
  baseURL: 'http://146.190.177.83/',
})

export default api
