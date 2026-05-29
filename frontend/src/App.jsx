import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes'
import ScrollProgress from './components/common/ScrollProgress'
import CustomCursor from './components/common/CustomCursor'
import Loader from './components/common/Loader'
import WhatsAppButton from './components/common/WhatsAppButton'
import { ContactModalProvider } from './context/ContactModalContext'
import ContactModal from './components/ui/ContactModal'

function App() {
  return (
    <BrowserRouter>
      <ContactModalProvider>
        <Loader />
        <ScrollProgress />
        <CustomCursor />
        <AppRoutes />
        <WhatsAppButton />
        <ContactModal />
      </ContactModalProvider>
    </BrowserRouter>
  )
}

export default App
