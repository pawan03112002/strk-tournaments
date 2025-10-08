import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
// import IncognitoBlocker from './components/IncognitoBlocker' // DISABLED FOR TESTING
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'
import Downloads from './pages/Downloads'
import TournamentRegistration from './pages/TournamentRegistration'
import AdminPanel from './pages/AdminPanel'
import TermsAndConditions from './pages/TermsAndConditions'
import RefundPolicy from './pages/RefundPolicy'
import PrivacyPolicy from './pages/PrivacyPolicy'
import ShippingPolicy from './pages/ShippingPolicy'
import ContactUs from './pages/ContactUs'

function App() {
  return (
    // <IncognitoBlocker>
      <Router>
        <div className="min-h-screen bg-gaming-dark">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/downloads" element={<Downloads />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/tournament-registration" element={<TournamentRegistration />} />
          <Route path="/jai_shree_ram" element={<AdminPanel />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
          <Route path="/cancellation-refunds" element={<RefundPolicy />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/shipping-policy" element={<ShippingPolicy />} />
          <Route path="/shipping" element={<ShippingPolicy />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/contact" element={<ContactUs />} />
        </Routes>
        <Footer />
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#1f2937',
              color: '#fff',
              border: '1px solid #374151',
            },
          }}
        />
      </div>
    </Router>
    // </IncognitoBlocker>
  )
}

export default App
