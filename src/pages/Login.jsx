import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Lock, LogIn, Shield, ArrowLeft } from 'lucide-react'
import useAuthStore from '../store/authStore'
import toast from 'react-hot-toast'
import { sendOTPEmail } from '../services/emailService'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [forgotPasswordMode, setForgotPasswordMode] = useState(false)
  const [resetStep, setResetStep] = useState(1) // 1: Email, 2: OTP, 3: New Password
  const [resetEmail, setResetEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [generatedOTP, setGeneratedOTP] = useState('')
  const [otpExpiry, setOtpExpiry] = useState(null)
  const [timeRemaining, setTimeRemaining] = useState(0)
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')
  
  const navigate = useNavigate()
  const login = useAuthStore((state) => state.login)
  const users = useAuthStore((state) => state.users)
  const sendPasswordReset = useAuthStore((state) => state.sendPasswordReset)
  const fetchUsers = useAuthStore((state) => state.fetchUsers)

  // Fetch users on mount
  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  // OTP Timer
  useEffect(() => {
    if (otpExpiry && resetStep === 2) {
      const interval = setInterval(() => {
        const remaining = Math.max(0, Math.floor((otpExpiry - Date.now()) / 1000))
        setTimeRemaining(remaining)
        if (remaining === 0) clearInterval(interval)
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [otpExpiry, resetStep])

  const isGmailAddress = (email) => email.toLowerCase().endsWith('@gmail.com')

  const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString()

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validate Gmail address
    if (!isGmailAddress(formData.email)) {
      toast.error('Only Gmail addresses are allowed!')
      return
    }
    
    try {
      // Use Firebase authentication
      const result = await login(formData.email, formData.password)
      
      if (result.success) {
        toast.success('Login successful!')
        navigate('/dashboard')
      } else {
        toast.error(result.error || 'Login failed. Please check your credentials.')
      }
    } catch (error) {
      toast.error('Login failed. Please check your credentials.')
    }
  }

  const handleForgotPassword = async (e) => {
    e.preventDefault()
    if (!isGmailAddress(resetEmail)) {
      toast.error('Only Gmail addresses are allowed!')
      return
    }
    
    toast.loading('Sending password reset email...', { id: 'reset' })
    
    const result = await sendPasswordReset(resetEmail)
    
    if (result.success) {
      toast.success(`Password reset link sent to ${resetEmail}! Check your inbox.`, { id: 'reset', duration: 6000 })
      setForgotPasswordMode(false)
      setResetEmail('')
    } else {
      toast.error('Failed to send reset email. Please try again.', { id: 'reset' })
    }
  }

  const handleVerifyOTP = (e) => {
    e.preventDefault()
    if (!otp) {
      toast.error('Please enter the OTP!')
      return
    }
    if (timeRemaining === 0) {
      toast.error('OTP has expired!')
      return
    }
    if (otp !== generatedOTP) {
      toast.error('Invalid OTP!')
      return
    }
    setResetStep(3)
  }

  const handleResetPassword = (e) => {
    e.preventDefault()
    if (newPassword.length < 6) {
      toast.error('Password must be at least 6 characters!')
      return
    }
    if (newPassword !== confirmNewPassword) {
      toast.error('Passwords do not match!')
      return
    }
    
    // Update password in store
    if (updateUserPassword) {
      updateUserPassword(resetEmail, newPassword)
    }
    
    toast.success('Password reset successful! Please login.')
    setForgotPasswordMode(false)
    setResetStep(1)
    setResetEmail('')
    setOtp('')
    setNewPassword('')
    setConfirmNewPassword('')
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
              <LogIn className="w-8 h-8 text-white" />
            </motion.div>
            <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
            <p className="text-gray-400">Login to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
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
                  placeholder="your@email.com"
                />
              </div>
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
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="w-4 h-4 text-red-600 bg-gray-800 border-gray-700 rounded focus:ring-red-500" />
                <span className="ml-2 text-sm text-gray-400">Remember me</span>
              </label>
              <button
                type="button"
                onClick={() => setForgotPasswordMode(true)}
                className="text-sm text-red-500 hover:text-red-400"
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              className="w-full btn-primary"
            >
              Login
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Don't have an account?{' '}
              <Link to="/register" className="text-red-500 hover:text-red-400 font-medium">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </motion.div>

      {/* Forgot Password Modal */}
      <AnimatePresence>
        {forgotPasswordMode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => {
              setForgotPasswordMode(false)
              setResetStep(1)
            }}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-md w-full"
            >
              <div className="card">
                <button
                  onClick={() => {
                    setForgotPasswordMode(false)
                    setResetStep(1)
                  }}
                  className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <ArrowLeft className="w-5 h-5 text-gray-400" />
                </button>

                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-red-500/20 rounded-full mb-3">
                    <Shield className="w-8 h-8 text-red-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Reset Password</h3>
                  <p className="text-gray-400 text-sm">
                    Enter your Gmail and we'll send you a password reset link
                  </p>
                </div>

                {/* Enter Email to Send Reset Link */}
                <form onSubmit={handleForgotPassword} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Gmail Address <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        value={resetEmail}
                        onChange={(e) => setResetEmail(e.target.value)}
                        className="input-field pl-12"
                        placeholder="yourname@gmail.com"
                        required
                      />
                    </div>
                    <p className="text-xs text-gray-400 mt-2">
                      🔐 We'll send you a secure link to reset your password
                    </p>
                  </div>
                  <button type="submit" className="w-full btn-primary">
                    Send Reset Link
                  </button>
                  
                  <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                    <p className="text-yellow-400 text-xs text-center">
                      ⚠️ <strong>Important:</strong> If you don't see the email in your inbox, please check your <strong>Spam/Junk folder</strong>. Password reset emails might be filtered.
                    </p>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Login
