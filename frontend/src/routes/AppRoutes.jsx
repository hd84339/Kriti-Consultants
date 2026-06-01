import { Routes, Route } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import Home from '../pages/Home/Home'
import About from '../pages/About/About'
import Services from '../pages/Services/Services'
import Blog from '../pages/Blog/Blog'
import Contact from '../pages/Contact/Contact'
import AdminLogin from '../pages/Admin/AdminLogin'
import AdminDashboard from '../pages/Admin/AdminDashboard'
import ProtectedRoute from '../components/auth/ProtectedRoute'
import NotFound from '../pages/NotFound/NotFound'

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
      </Route>
      
      {/* Admin Routes without Public Navbar/Footer */}
      <Route path="/admin/login" element={<AdminLogin />} />
      
      <Route element={<ProtectedRoute />}>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
