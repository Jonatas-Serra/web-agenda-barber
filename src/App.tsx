import { BrowserRouter } from 'react-router-dom'
import AppProvider from './hooks'
import { Router } from './routes/Router'

function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Router />
      </AppProvider>
    </BrowserRouter>
  )
}

export default App
