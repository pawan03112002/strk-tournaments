import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, Lock, UserPlus, Shield, CheckCircle } from 'lucide-react'
import useAuthStore from '../store/authStore'
import toast from 'react-hot-toast'
import { sendOTPEmail } from '../services/emailService'

const Register = () => {
  const [step, setStep] = useState(1) // 1: Form, 2: OTP Verification
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [otp, setOtp] = useState('')
  const [generatedOTP, setGeneratedOTP] = useState('')
  const [otpExpiry, setOtpExpiry] = useState(null)
  const [timeRemaining, setTimeRemaining] = useState(0)
  const [isResending, setIsResending] = useState(false)
  
  const navigate = useNavigate()
  const register = useAuthStore((state) => state.register)

  // Timer for OTP expiry
  useEffect(() => {
    if (otpExpiry && step === 2) {
      const interval = setInterval(() => {
        const remaining = Math.max(0, Math.floor((otpExpiry - Date.now()) / 1000))
        setTimeRemaining(remaining)
        if (remaining === 0) {
          clearInterval(interval)
        }
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [otpExpiry, step])

  const isGmailAddress = (email) => {
    return email.toLowerCase().endsWith('@gmail.com')
  }

  const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString()
  }

  const sendOTP = async () => {
    const newOTP = generateOTP()
    setGeneratedOTP(newOTP)
    setOtpExpiry(Date.now() + 5 * 60 * 1000) // 5 minutes
    
    // Send OTP via email service
    const userName = formData.email.split('@')[0]
    const result = await sendOTPEmail(formData.email, newOTP, userName)
    
    if (result.success) {
      toast.success(`OTP sent to ${formData.email}!\nCheck your inbox.`)
    } else {
      // Fallback: Show OTP in console for testing
      console.log('OTP:', newOTP)
      toast.success(`OTP sent to ${formData.email}!\nCheck console (Email service not configured)`)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validate Gmail address
    if (!isGmailAddress(formData.email)) {
      toast.error('Only Gmail addresses are allowed!')
      return
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match!')
      return
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters!')
      return
    }

    // Send OTP and move to verification step
    sendOTP()
    setStep(2)
  }

  const handleVerifyOTP = async (e) => {
    e.preventDefault()

    if (!otp) {
      toast.error('Please enter the OTP!')
      return
    }

    if (timeRemaining === 0) {
      toast.error('OTP has expired! Please request a new one.')
      return
    }

    if (otp !== generatedOTP) {
      toast.error('Invalid OTP! Please try again.')
      return
    }

    // OTP verified, proceed with registration
    try {
      await register(formData.email, formData.password, formData.email.split('@')[0])
      toast.success('Registration successful! Please login.')
      navigate('/login')
    } catch (error) {
      toast.error(error.message || 'Registration failed. Please try again.')
    }
  }

  const handleResendOTP = () => {
    if (isResending) return
    
    setIsResending(true)
    sendOTP()
    setOtp('')
    
    setTimeout(() => {
      setIsResending(false)
    }, 3000)
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-red-500/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full relative z-10"
      >
        <div className="card">
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-red-600 to-orange-600 rounded-full mb-4"
            >
              <UserPlus className="w-8 h-8 text-white" />
            </motion.div>
            <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
            <p className="text-gray-400 mb-3">Join the <span className="text-yellow-400 font-bold">FIRST EVER</span> Free Fire PC Tournament</p>
            <div className="flex flex-col gap-2 items-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-yellow-500/20 border border-yellow-500 rounded-full animate-pulse">
                <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
                <span className="text-yellow-400 font-bold text-xs">HISTORIC FIRST</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/20 border border-blue-500 rounded-full">
                <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V4z"/>
                </svg>
                <span className="text-blue-400 font-semibold text-xs">PC PLAYERS ONLY</span>
              </div>
            </div>
          </div>

          {step === 1 && (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Gmail Address <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="input-field pl-12"
                    placeholder="yourname@gmail.com"
                  />
                </div>
                <p className="text-xs text-yellow-400 mt-1">
                  ⚠️ Only Gmail addresses (@gmail.com) are accepted
                </p>
              </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="input-field pl-12"
                  placeholder="Create a password"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  name="confirmPassword"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="input-field pl-12"
                  placeholder="Confirm your password"
                />
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                required
                className="w-4 h-4 text-red-600 bg-gray-800 border-gray-700 rounded focus:ring-red-500"
              />
              <label className="ml-2 text-sm text-gray-400">
                I agree to the{' '}
                <a href="#" className="text-red-500 hover:text-red-400">
                  Terms & Conditions
                </a>
              </label>
            </div>

            <button
              type="submit"
              className="w-full btn-primary"
            >
              Send OTP
            </button>
          </form>
          )}

          {step === 2 && (
            <form onSubmit={handleVerifyOTP} className="space-y-5">
              <div className="text-center mb-4">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500/20 rounded-full mb-3">
                  <Shield className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Verify Your Email</h3>
                <p className="text-gray-400 text-sm">
                  We've sent a 6-digit OTP to<br />
                  <span className="text-white font-medium">{formData.email}</span>
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Enter OTP
                </label>
                <div className="relative">
                  <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    className="input-field pl-12 text-center text-2xl tracking-widest"
                    placeholder="000000"
                    maxLength={6}
                    required
                  />
                </div>
                <div className="flex justify-between items-center mt-2">
                  <p className="text-xs text-gray-400">
                    {timeRemaining > 0 ? (
                      <>
                        <span className="text-green-400">⏱ Expires in: </span>
                        <span className="font-mono">{Math.floor(timeRemaining / 60)}:{String(timeRemaining % 60).padStart(2, '0')}</span>
                      </>
                    ) : (
                      <span className="text-red-400">⚠️ OTP Expired</span>
                    )}
                  </p>
                  <button
                    type="button"
                    onClick={handleResendOTP}
                    disabled={isResending || timeRemaining > 240}
                    className="text-xs text-red-500 hover:text-red-400 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isResending ? 'Sending...' : 'Resend OTP'}
                  </button>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 px-4 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="flex-1 btn-primary"
                  disabled={otp.length !== 6}
                >
                  Verify & Register
                </button>
              </div>
            </form>
          )}

          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Already have an account?{' '}
              <Link to="/login" className="text-red-500 hover:text-red-400 font-medium">
                Login
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Register
