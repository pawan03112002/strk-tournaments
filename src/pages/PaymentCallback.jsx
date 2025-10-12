import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { checkPhonePeStatus } from '../services/paymentService'

export default function PaymentCallback() {
  const [status, setStatus] = useState('checking')
  const [message, setMessage] = useState('Verifying your payment...')
  const navigate = useNavigate()

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        // Get transaction details from session storage
        const transactionData = sessionStorage.getItem('phonepe_transaction')
        
        if (!transactionData) {
          setStatus('error')
          setMessage('Transaction details not found')
          return
        }

        const { transactionId } = JSON.parse(transactionData)

        // Check payment status with PhonePe
        const result = await checkPhonePeStatus(transactionId)

        if (result.success && result.paymentState === 'COMPLETED') {
          setStatus('success')
          setMessage('Payment successful! Redirecting...')
          
          // Clear transaction data
          sessionStorage.removeItem('phonepe_transaction')
          
          // Redirect to success page after 2 seconds
          setTimeout(() => {
            navigate('/payment-success', {
              state: {
                transactionId: transactionId,
                amount: result.amount
              }
            })
          }, 2000)
        } else {
          setStatus('failed')
          setMessage('Payment failed or was cancelled')
          
          setTimeout(() => {
            navigate('/tournament-registration')
          }, 3000)
        }
      } catch (error) {
        console.error('Payment verification error:', error)
        setStatus('error')
        setMessage('Error verifying payment. Please contact support.')
      }
    }

    verifyPayment()
  }, [navigate])

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-gray-800 rounded-lg p-8 text-center">
        {status === 'checking' && (
          <>
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-600 mx-auto mb-4"></div>
            <h2 className="text-2xl font-bold text-white mb-2">Verifying Payment</h2>
            <p className="text-gray-400">{message}</p>
          </>
        )}

        {status === 'success' && (
          <>
            <div className="text-green-500 text-6xl mb-4">✓</div>
            <h2 className="text-2xl font-bold text-white mb-2">Payment Successful!</h2>
            <p className="text-gray-400">{message}</p>
          </>
        )}

        {status === 'failed' && (
          <>
            <div className="text-red-500 text-6xl mb-4">✕</div>
            <h2 className="text-2xl font-bold text-white mb-2">Payment Failed</h2>
            <p className="text-gray-400">{message}</p>
            <button
              onClick={() => navigate('/tournament-registration')}
              className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Try Again
            </button>
          </>
        )}

        {status === 'error' && (
          <>
            <div className="text-yellow-500 text-6xl mb-4">⚠</div>
            <h2 className="text-2xl font-bold text-white mb-2">Error</h2>
            <p className="text-gray-400">{message}</p>
            <button
              onClick={() => navigate('/tournament-registration')}
              className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Go Back
            </button>
          </>
        )}
      </div>
    </div>
  )
}
