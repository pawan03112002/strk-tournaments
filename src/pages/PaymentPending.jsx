import { useLocation, useNavigate } from 'react-router-dom'
import { Clock, Mail, Home } from 'lucide-react'
import { formatCurrency } from '../services/paymentService'

export default function PaymentPending() {
  const location = useLocation()
  const navigate = useNavigate()
  const { paymentId, teamName, amount } = location.state || {}

  if (!paymentId) {
    navigate('/')
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full">
        <div className="bg-gray-800 rounded-lg p-8 text-center">
          {/* Pending Icon */}
          <div className="inline-block p-4 bg-yellow-600/20 rounded-full mb-6">
            <Clock className="w-16 h-16 text-yellow-500" />
          </div>

          {/* Success Message */}
          <h1 className="text-3xl font-bold text-white mb-4">
            Payment Proof Submitted!
          </h1>
          <p className="text-gray-400 text-lg mb-8">
            Your payment is under verification
          </p>

          {/* Payment Details */}
          <div className="bg-gray-900 rounded-lg p-6 mb-6">
            <div className="space-y-3 text-left">
              <div className="flex justify-between items-center pb-3 border-b border-gray-700">
                <span className="text-gray-400">Payment ID</span>
                <span className="text-white font-mono text-sm">{paymentId}</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-gray-700">
                <span className="text-gray-400">Team Name</span>
                <span className="text-white font-bold">{teamName}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Amount</span>
                <span className="text-green-400 font-bold text-xl">{formatCurrency(amount)}</span>
              </div>
            </div>
          </div>

          {/* Status Info */}
          <div className="bg-yellow-600/10 border border-yellow-600/30 rounded-lg p-6 mb-6">
            <div className="flex items-start space-x-3">
              <Mail className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-1" />
              <div className="text-left">
                <h3 className="text-yellow-400 font-bold mb-2">What happens next?</h3>
                <ul className="text-gray-300 text-sm space-y-2">
                  <li>• Our team will verify your payment within 24 hours</li>
                  <li>• You'll receive a confirmation email once verified</li>
                  <li>• Your registration will be confirmed after verification</li>
                  <li>• Check your email regularly for updates</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Important Note */}
          <div className="bg-red-600/10 border border-red-600/30 rounded-lg p-4 mb-6">
            <p className="text-red-400 text-sm">
              <strong>Important:</strong> Please keep your payment screenshot and transaction ID safe. 
              You may need them for verification.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={() => navigate('/')}
              className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-3 px-6 rounded-lg transition-all"
            >
              <Home className="w-5 h-5" />
              <span>Back to Home</span>
            </button>
          </div>

          {/* Support Info */}
          <p className="text-gray-500 text-sm mt-6">
            Need help? Contact us at{' '}
            <a href="mailto:strk.tournaments@gmail.com" className="text-red-400 hover:text-red-300">
              strk.tournaments@gmail.com
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
