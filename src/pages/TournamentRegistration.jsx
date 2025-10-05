import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Users, Mail, Phone, CreditCard, User, Trophy, Globe, Image, Upload, CheckCircle, X, AlertCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import useAuthStore from '../store/authStore'
import useTournamentStore from '../store/tournamentStore'

const TournamentRegistration = () => {
  const navigate = useNavigate()
  const user = useAuthStore((state) => state.user)
  const registerTeam = useTournamentStore((state) => state.registerTeam)
  const getTeamByEmail = useTournamentStore((state) => state.getTeamByEmail)
  const getTotalTeams = useTournamentStore((state) => state.getTotalTeams)
  
  const [currency, setCurrency] = useState('INR')
  const [teamLogo, setTeamLogo] = useState(null)
  const [logoPreview, setLogoPreview] = useState(null)
  const [isProcessingPayment, setIsProcessingPayment] = useState(false)
  const [paymentSuccess, setPaymentSuccess] = useState(false)
  const [assignedTeamNumber, setAssignedTeamNumber] = useState(null)
  const [showExistingTeamModal, setShowExistingTeamModal] = useState(false)
  const [existingTeam, setExistingTeam] = useState(null)

  const [formData, setFormData] = useState({
    teamName: '',
    player1Username: '',
    player2Username: '',
    player3Username: '',
    player4Username: '',
    contactEmail: user?.email || '',
    countryCode: '+91',
    phoneNumber: ''
  })

  const countryCodes = [
    { code: '+91', country: 'India', flag: '🇮🇳' },
    { code: '+1', country: 'USA', flag: '🇺🇸' },
    { code: '+44', country: 'UK', flag: '🇬🇧' },
    { code: '+61', country: 'Australia', flag: '🇦🇺' },
    { code: '+86', country: 'China', flag: '🇨🇳' },
    { code: '+81', country: 'Japan', flag: '🇯🇵' },
    { code: '+82', country: 'South Korea', flag: '🇰🇷' },
    { code: '+65', country: 'Singapore', flag: '🇸🇬' },
    { code: '+60', country: 'Malaysia', flag: '🇲🇾' },
    { code: '+62', country: 'Indonesia', flag: '🇮🇩' },
    { code: '+63', country: 'Philippines', flag: '🇵🇭' },
    { code: '+66', country: 'Thailand', flag: '🇹🇭' },
    { code: '+880', country: 'Bangladesh', flag: '🇧🇩' },
    { code: '+92', country: 'Pakistan', flag: '🇵🇰' },
    { code: '+94', country: 'Sri Lanka', flag: '🇱🇰' },
  ]

  const paymentAmounts = {
    INR: '₹500',
    USD: '$7'
  }

  // Check if user already has a registered team on mount
  useEffect(() => {
    if (user?.email) {
      const team = getTeamByEmail(user.email)
      if (team) {
        setExistingTeam(team)
        setShowExistingTeamModal(true)
        toast.error('You have already registered for this tournament!')
      }
    }
  }, [user, getTeamByEmail])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleLogoUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error('Please upload an image file!')
        return
      }
      
      // Validate file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        toast.error('Image size should be less than 2MB!')
        return
      }

      setTeamLogo(file)
      
      // Create preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setLogoPreview(reader.result)
      }
      reader.readAsDataURL(file)
      
      toast.success('Logo uploaded successfully!')
    }
  }

  const removeLogo = () => {
    setTeamLogo(null)
    setLogoPreview(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Check if user already registered
    const existingTeam = getTeamByEmail(formData.contactEmail)
    if (existingTeam) {
      toast.error(`You have already registered as ${existingTeam.teamNumber}!`)
      return
    }

    // Validation
    if (!formData.teamName.trim()) {
      toast.error('Please enter team name!')
      return
    }

    if (!formData.player1Username || !formData.player2Username || !formData.player3Username || !formData.player4Username) {
      toast.error('Please enter all 4 player usernames!')
      return
    }

    if (!formData.phoneNumber) {
      toast.error('Please enter contact number!')
      return
    }

    // Simulate payment processing
    setIsProcessingPayment(true)
    toast.loading('Processing payment...', { id: 'payment' })

    // Simulate payment gateway delay
    setTimeout(() => {
      // Payment successful - Register team automatically
      const registeredTeam = registerTeam({
        teamName: formData.teamName,
        players: [
          formData.player1Username,
          formData.player2Username,
          formData.player3Username,
          formData.player4Username
        ],
        contactEmail: formData.contactEmail,
        contactNumber: `${formData.countryCode}${formData.phoneNumber}`,
        teamLogo: logoPreview || null,
        currency: currency,
        amount: currency === 'INR' ? '₹500' : '$7',
        userId: user?.id
      })

      setIsProcessingPayment(false)
      setPaymentSuccess(true)
      setAssignedTeamNumber(registeredTeam.teamNumber)
      
      toast.success(`Payment successful! You are ${registeredTeam.teamNumber}`, { id: 'payment' })
      
      // Auto redirect after 5 seconds
      setTimeout(() => {
        navigate('/dashboard')
      }, 5000)
    }, 2000)
  }

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      {/* Existing Team Modal */}
      <AnimatePresence>
        {showExistingTeamModal && existingTeam && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => {
              setShowExistingTeamModal(false)
              navigate('/dashboard')
            }}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-lg w-full"
            >
              <div className="card">
                {/* Close Button */}
                <button
                  onClick={() => {
                    setShowExistingTeamModal(false)
                    navigate('/dashboard')
                  }}
                  className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>

                {/* Icon */}
                <div className="flex justify-center mb-6">
                  <div className="w-20 h-20 bg-yellow-500/20 rounded-full flex items-center justify-center">
                    <AlertCircle className="w-12 h-12 text-yellow-500" />
                  </div>
                </div>

                {/* Title */}
                <h2 className="text-3xl font-bold text-white mb-2 text-center">
                  Already Registered!
                </h2>
                <p className="text-gray-400 text-center mb-6">
                  You have already registered for this tournament
                </p>

                {/* Team Details */}
                <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-2 border-yellow-500/50 rounded-xl p-6 mb-6">
                  <div className="text-center mb-4">
                    <p className="text-gray-400 text-sm mb-2">Your Team Number</p>
                    <h3 className="text-4xl font-black bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                      {existingTeam.teamNumber}
                    </h3>
                  </div>

                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Team Name:</span>
                      <span className="text-white font-bold">{existingTeam.teamName}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Contact Email:</span>
                      <span className="text-white text-xs">{existingTeam.contactEmail}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Contact Number:</span>
                      <span className="text-white">{existingTeam.contactNumber}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Payment Status:</span>
                      <span className="text-green-500 font-bold flex items-center gap-1">
                        <CheckCircle className="w-4 h-4" />
                        Completed
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Tournament Stage:</span>
                      <span className="text-blue-500 font-bold capitalize">{existingTeam.stage}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Registered On:</span>
                      <span className="text-white">
                        {new Date(existingTeam.registeredAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Players List */}
                <div className="bg-gray-800/50 rounded-lg p-4 mb-6">
                  <h4 className="text-white font-bold mb-3 flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Squad Members
                  </h4>
                  <div className="space-y-2">
                    {existingTeam.players.map((player, index) => (
                      <div key={index} className="flex items-center gap-2 text-gray-300">
                        <span className="text-orange-500 font-bold">#{index + 1}</span>
                        <span>{player}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Button */}
                <button
                  onClick={() => navigate('/dashboard')}
                  className="w-full btn-primary py-3"
                >
                  Go to Dashboard
                </button>

                <p className="text-center text-gray-500 text-xs mt-4">
                  You cannot register multiple teams with the same email
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-3xl mx-auto mt-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-red-500 to-orange-500 rounded-full mb-4"
            >
              <Trophy className="w-10 h-10 text-white" />
            </motion.div>
            <h1 className="text-4xl font-bold text-white mb-2">Tournament Registration</h1>
            <p className="text-gray-400">Register your squad for the Free Fire PC Tournament</p>
          </div>

          {/* Success Screen */}
          {paymentSuccess ? (
            <div className="card text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', duration: 0.5 }}
              >
                <div className="flex justify-center mb-6">
                  <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-16 h-16 text-green-500" />
                  </div>
                </div>

                <h2 className="text-4xl font-bold text-white mb-4">Payment Successful!</h2>
                <p className="text-gray-400 mb-6">Your team has been registered</p>

                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-2 border-yellow-500/50 rounded-xl p-8 mb-6"
                >
                  <p className="text-gray-400 mb-2">You are assigned as</p>
                  <h3 className="text-5xl font-black bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                    {assignedTeamNumber}
                  </h3>
                </motion.div>

                <div className="space-y-3 text-left bg-gray-800/50 rounded-lg p-6 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Team Name:</span>
                    <span className="text-white font-bold">{formData.teamName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Contact Email:</span>
                    <span className="text-white">{formData.contactEmail}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Total Teams:</span>
                    <span className="text-white font-bold">{getTotalTeams()} / 20,736</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Stage:</span>
                    <span className="text-green-500 font-bold">Enrolled</span>
                  </div>
                </div>

                <p className="text-gray-500 text-sm mb-4">
                  Redirecting to dashboard in 5 seconds...
                </p>

                <button
                  onClick={() => navigate('/dashboard')}
                  className="btn-primary w-full"
                >
                  Go to Dashboard Now
                </button>
              </motion.div>
            </div>
          ) : (
            /* Registration Form */
            <div className="card">
              <form onSubmit={handleSubmit} className="space-y-6">
              {/* Team Name */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Team Name *
                </label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="teamName"
                    value={formData.teamName}
                    onChange={handleChange}
                    className="input-field pl-12"
                    placeholder="Enter your team name"
                    required
                  />
                </div>
              </div>

              {/* Team Logo (Optional) */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Team Logo (Optional)
                </label>
                <div className="flex items-start gap-4">
                  {/* Logo Preview */}
                  <div className="flex-shrink-0">
                    <div className="w-24 h-24 rounded-lg border-2 border-dashed border-gray-600 bg-gray-800 flex items-center justify-center overflow-hidden">
                      {logoPreview ? (
                        <img src={logoPreview} alt="Team Logo" className="w-full h-full object-cover" />
                      ) : (
                        <Image className="w-8 h-8 text-gray-600" />
                      )}
                    </div>
                  </div>

                  {/* Upload Controls */}
                  <div className="flex-1">
                    <input
                      type="file"
                      id="teamLogo"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="hidden"
                    />
                    <div className="flex gap-3">
                      <label
                        htmlFor="teamLogo"
                        className="flex-1 cursor-pointer inline-flex items-center justify-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors"
                      >
                        <Upload className="w-4 h-4" />
                        {teamLogo ? 'Change Logo' : 'Upload Logo'}
                      </label>
                      {teamLogo && (
                        <button
                          type="button"
                          onClick={removeLogo}
                          className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      Max 2MB. Formats: JPG, PNG, GIF
                    </p>
                  </div>
                </div>
              </div>

              {/* Player Usernames */}
              <div className="border-t border-gray-700 pt-6">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Squad Members (4 Players)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map((num) => (
                    <div key={num}>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Player {num} Username *
                      </label>
                      <input
                        type="text"
                        name={`player${num}Username`}
                        value={formData[`player${num}Username`]}
                        onChange={handleChange}
                        className="input-field"
                        placeholder={`Enter Player ${num} Free Fire Username`}
                        required
                      />
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  * All 4 players must provide their Free Fire usernames
                </p>
              </div>

              {/* Contact Information */}
              <div className="border-t border-gray-700 pt-6">
                <h3 className="text-xl font-bold text-white mb-4">Contact Information</h3>
                
                {/* Email */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Contact Email *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      name="contactEmail"
                      value={formData.contactEmail}
                      onChange={handleChange}
                      className="input-field pl-12"
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Tournament updates will be sent to this email
                  </p>
                </div>

                {/* Phone Number with Country Code */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Contact Number *
                  </label>
                  <div className="flex gap-3">
                    {/* Country Code Selector */}
                    <div className="relative w-40">
                      <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                      <select
                        name="countryCode"
                        value={formData.countryCode}
                        onChange={handleChange}
                        className="input-field pl-10 pr-3 appearance-none cursor-pointer"
                      >
                        {countryCodes.map((country) => (
                          <option key={country.code} value={country.code}>
                            {country.flag} {country.code}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    {/* Phone Number */}
                    <div className="relative flex-1">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="tel"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        className="input-field pl-12"
                        placeholder="Enter phone number"
                        required
                      />
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    WhatsApp number preferred for quick updates
                  </p>
                </div>
              </div>

              {/* Payment Section */}
              <div className="border-t border-gray-700 pt-6">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Registration Fee
                </h3>
                
                {/* Currency Toggle */}
                <div className="flex gap-3 mb-4">
                  <button
                    type="button"
                    onClick={() => setCurrency('INR')}
                    className={`flex-1 py-3 px-4 rounded-lg font-bold transition-all ${
                      currency === 'INR'
                        ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white'
                        : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                    }`}
                  >
                    🇮🇳 India - ₹500
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrency('USD')}
                    className={`flex-1 py-3 px-4 rounded-lg font-bold transition-all ${
                      currency === 'USD'
                        ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white'
                        : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                    }`}
                  >
                    🌍 International - $7
                  </button>
                </div>

                {/* Payment Info Box */}
                <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-lg p-4 mb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-300 text-sm">Registration Fee</p>
                      <p className="text-3xl font-bold text-white">{paymentAmounts[currency]}</p>
                    </div>
                    <div className="text-5xl">💳</div>
                  </div>
                </div>

                <p className="text-xs text-gray-500 mb-4">
                  * One-time registration fee per team. Securely processed via payment gateway.
                </p>

                {/* Fee Refund Offer */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-2 border-green-500/50 rounded-lg p-4 mb-4"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      💰
                    </motion.div>
                    <p className="text-green-400 font-bold">SPECIAL OFFER: 100% Fee Refund!</p>
                  </div>
                  <p className="text-gray-300 text-sm">
                    Reach <span className="text-yellow-400 font-bold">Quarter Finals</span> from Enrollment round and get your <span className="text-white font-bold">{paymentAmounts[currency]}</span> registration fee refunded completely!
                  </p>
                </motion.div>

                {/* Submit & Pay Button */}
                <motion.button
                  type="submit"
                  disabled={isProcessingPayment}
                  whileHover={{ scale: isProcessingPayment ? 1 : 1.02 }}
                  whileTap={{ scale: isProcessingPayment ? 1 : 0.98 }}
                  className={`w-full btn-primary py-4 text-lg font-bold flex items-center justify-center gap-3 ${
                    isProcessingPayment ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  <CreditCard className="w-6 h-6" />
                  {isProcessingPayment ? 'Processing Payment...' : `Proceed to Pay ${paymentAmounts[currency]}`}
                </motion.button>
              </div>

              {/* Terms */}
              <div className="text-center text-xs text-gray-500">
                By registering, you agree to the tournament rules and regulations
              </div>
            </form>
          </div>
          )}

          {/* Back Button */}
          <div className="mt-6 text-center">
            <button
              onClick={() => navigate('/dashboard')}
              className="text-gray-400 hover:text-white transition-colors"
            >
              ← Back to Dashboard
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default TournamentRegistration
