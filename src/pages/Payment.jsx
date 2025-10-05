import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CreditCard, Lock, CheckCircle, IndianRupee, Smartphone } from 'lucide-react'
import useAuthStore from '../store/authStore'
import toast from 'react-hot-toast'

const Payment = () => {
  const { tournamentId } = useParams()
  const navigate = useNavigate()
  const user = useAuthStore((state) => state.user)
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [processing, setProcessing] = useState(false)

  // Mock tournament data
  const tournament = {
    id: tournamentId,
    name: 'Weekend Warriors Championship',
    entryFee: 50,
    date: '2025-10-10T18:00:00'
  }

  const [cardData, setCardData] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  })

  const [upiData, setUpiData] = useState({
    upiId: ''
  })

  const handleCardChange = (e) => {
    setCardData({
      ...cardData,
      [e.target.name]: e.target.value
    })
  }

  const handleUpiChange = (e) => {
    setUpiData({
      ...upiData,
      [e.target.name]: e.target.value
    })
  }

  const handlePayment = async (e) => {
    e.preventDefault()
    setProcessing(true)

    // Mock payment processing
    setTimeout(() => {
      setProcessing(false)
      toast.success('Payment successful! You are registered for the tournament.')
      navigate('/dashboard')
    }, 2000)
  }

  if (!user) {
    navigate('/login')
    return null
  }

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto mt-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
              Complete Payment
            </h1>
            <p className="text-gray-400">Secure payment for tournament registration</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Payment Form */}
            <div className="lg:col-span-2">
              <div className="card">
                <div className="flex items-center gap-2 mb-6">
                  <Lock className="w-5 h-5 text-green-500" />
                  <span className="text-sm text-gray-400">Secure Payment - Your data is encrypted</span>
                </div>

                {/* Payment Method Selection */}
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-white mb-4">Select Payment Method</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => setPaymentMethod('card')}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        paymentMethod === 'card'
                          ? 'border-red-500 bg-red-500/10'
                          : 'border-gray-700 bg-gray-800/50'
                      }`}
                    >
                      <CreditCard className="w-6 h-6 text-red-500 mx-auto mb-2" />
                      <span className="text-white text-sm font-medium">Credit/Debit Card</span>
                    </button>

                    <button
                      onClick={() => setPaymentMethod('upi')}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        paymentMethod === 'upi'
                          ? 'border-purple-500 bg-purple-500/10'
                          : 'border-gray-700 bg-gray-800/50'
                      }`}
                    >
                      <Smartphone className="w-6 h-6 text-purple-500 mx-auto mb-2" />
                      <span className="text-white text-sm font-medium">UPI</span>
                    </button>
                  </div>
                </div>

                <form onSubmit={handlePayment}>
                  {paymentMethod === 'card' ? (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Card Number
                        </label>
                        <input
                          type="text"
                          name="cardNumber"
                          required
                          value={cardData.cardNumber}
                          onChange={handleCardChange}
                          placeholder="1234 5678 9012 3456"
                          maxLength="19"
                          className="input-field"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Cardholder Name
                        </label>
                        <input
                          type="text"
                          name="cardName"
                          required
                          value={cardData.cardName}
                          onChange={handleCardChange}
                          placeholder="John Doe"
                          className="input-field"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Expiry Date
                          </label>
                          <input
                            type="text"
                            name="expiryDate"
                            required
                            value={cardData.expiryDate}
                            onChange={handleCardChange}
                            placeholder="MM/YY"
                            maxLength="5"
                            className="input-field"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            CVV
                          </label>
                          <input
                            type="text"
                            name="cvv"
                            required
                            value={cardData.cvv}
                            onChange={handleCardChange}
                            placeholder="123"
                            maxLength="3"
                            className="input-field"
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          UPI ID
                        </label>
                        <input
                          type="text"
                          name="upiId"
                          required
                          value={upiData.upiId}
                          onChange={handleUpiChange}
                          placeholder="yourname@upi"
                          className="input-field"
                        />
                      </div>

                      <div className="p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                        <p className="text-sm text-gray-300">
                          Enter your UPI ID and complete the payment on your UPI app
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="mt-6 flex items-start gap-3">
                    <input
                      type="checkbox"
                      required
                      className="w-4 h-4 mt-1 text-red-600 bg-gray-800 border-gray-700 rounded focus:ring-red-500"
                    />
                    <label className="text-sm text-gray-400">
                      I agree to the tournament terms and conditions and authorize the payment
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={processing}
                    className="w-full btn-primary mt-6 text-lg flex items-center justify-center gap-2"
                  >
                    {processing ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-5 h-5" />
                        Pay ₹{tournament.entryFee}
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="card sticky top-24">
                <h3 className="text-xl font-bold text-white mb-6">Order Summary</h3>

                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Tournament</p>
                    <p className="text-white font-bold">{tournament.name}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-400 mb-1">Player</p>
                    <p className="text-white font-bold">{user.username}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-400 mb-1">Free Fire ID</p>
                    <p className="text-white font-bold">{user.ffId}</p>
                  </div>

                  <div className="border-t border-gray-700 pt-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-400">Entry Fee</span>
                      <span className="text-white">₹{tournament.entryFee}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-400">Processing Fee</span>
                      <span className="text-white">₹0</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-gray-700">
                      <span className="text-lg font-bold text-white">Total</span>
                      <div className="flex items-center gap-1">
                        <IndianRupee className="w-5 h-5 text-yellow-500" />
                        <span className="text-2xl font-bold text-yellow-500">{tournament.entryFee}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-gray-300">
                      Your payment is secured with 256-bit SSL encryption
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Payment
