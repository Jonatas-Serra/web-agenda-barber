import axios from 'axios'

const api = axios.create({
  baseURL: 'https://agendabarber.up.railway.app',
})

export default api
