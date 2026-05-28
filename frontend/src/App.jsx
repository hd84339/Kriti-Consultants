import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes'
import ScrollProgress from './components/common/ScrollProgress'
import CustomCursor from './components/common/CustomCursor'
import Loader from './components/common/Loader'
import WhatsAppButton from './components/common/WhatsAppButton'

function App() {
  return (
    <BrowserRouter>
      <Loader />
      <ScrollProgress />
      <CustomCursor />
      <AppRoutes />
      <WhatsAppButton />
    </BrowserRouter>
  )
}

export default App
