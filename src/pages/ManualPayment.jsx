import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { ArrowLeft, Upload, Check, Copy } from 'lucide-react'
import { submitManualPayment, formatCurrency } from '../services/paymentService'
import { paymentMethods, upiConfig } from '../config/payment'
import useSettingsStore from '../store/settingsStore'
import toast from 'react-hot-toast'

export default function ManualPayment() {
  const navigate = useNavigate()
  const location = useLocation()
  const registrationData = location.state?.registrationData || {}

  // Get settings from store
  const paymentSettings = useSettingsStore((state) => state.paymentSettings)
  const tournamentSettings = useSettingsStore((state) => state.tournamentSettings)

  const [selectedMethod, setSelectedMethod] = useState(paymentMethods.UPI)
  const [transactionId, setTransactionId] = useState('')
  const [payerName, setPayerName] = useState('')
  const [paymentProof, setPaymentProof] = useState(null)
  const [previewUrl, setPreviewUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  // Get amount from tournament settings
  const amount = tournamentSettings?.registrationFee || 500

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size should be less than 5MB')
        return
      }

      const reader = new FileReader()
      reader.onloadend = () => {
        setPaymentProof(reader.result)
        setPreviewUrl(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    toast.success('Copied to clipboard!')
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!transactionId.trim()) {
      toast.error('Please enter transaction ID/UTR number')
      return
    }

    if (!payerName.trim()) {
      toast.error('Please enter payer name')
      return
    }

    if (!paymentProof) {
      toast.error('Please upload payment screenshot')
      return
    }

    setLoading(true)

    try {
      const paymentData = {
        teamName: registrationData.teamName || 'Unknown',
        contactEmail: registrationData.contactEmail || '',
        contactNumber: registrationData.contactNumber || '',
        paymentMethod: selectedMethod,
        transactionId: transactionId.trim(),
        amount: amount,
        paymentProof: paymentProof,
        upiId: selectedMethod === paymentMethods.UPI ? upiConfig.upiId : null,
        payerName: payerName.trim()
      }

      const result = await submitManualPayment(paymentData)

      if (result.success) {
        toast.success('Payment proof submitted successfully!')
        navigate('/payment-pending', {
          state: {
            paymentId: result.paymentId,
            teamName: registrationData.teamName,
            amount: amount
          }
        })
      }
    } catch (error) {
      console.error('Payment submission error:', error)
      toast.error('Failed to submit payment proof. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-400 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Complete Payment</h1>
          <p className="text-gray-400">Choose your payment method and submit proof</p>
          <div className="mt-4 inline-block bg-red-600 px-6 py-3 rounded-lg">
            <span className="text-white text-2xl font-bold">
              Amount: {formatCurrency(amount)}
            </span>
          </div>
        </div>

        {/* Payment Method Selection */}
        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-white mb-4">Select Payment Method</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* UPI Option */}
            <button
              onClick={() => setSelectedMethod(paymentMethods.UPI)}
              className={`p-4 rounded-lg border-2 transition-all ${
                selectedMethod === paymentMethods.UPI
                  ? 'border-red-600 bg-red-600/10'
                  : 'border-gray-700 hover:border-gray-600'
              }`}
            >
              <div className="text-left">
                <h3 className="text-lg font-bold text-white mb-1">UPI Payment</h3>
                <p className="text-sm text-gray-400">Google Pay, PhonePe, Paytm, etc.</p>
              </div>
            </button>

            {/* Bank Transfer Option */}
            <button
              onClick={() => setSelectedMethod(paymentMethods.BANK_TRANSFER)}
              className={`p-4 rounded-lg border-2 transition-all ${
                selectedMethod === paymentMethods.BANK_TRANSFER
                  ? 'border-red-600 bg-red-600/10'
                  : 'border-gray-700 hover:border-gray-600'
              }`}
            >
              <div className="text-left">
                <h3 className="text-lg font-bold text-white mb-1">Bank Transfer</h3>
                <p className="text-sm text-gray-400">NEFT, IMPS, RTGS</p>
              </div>
            </button>
          </div>
        </div>

        {/* Payment Details */}
        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          {selectedMethod === paymentMethods.UPI ? (
            <>
              <h2 className="text-xl font-bold text-white mb-4">UPI Payment Details</h2>
              
              {/* QR Code */}
              <div className="bg-white p-6 rounded-lg mb-4 text-center">
                <p className="text-gray-800 font-bold mb-4">Scan QR Code to Pay</p>
                <div className="inline-block bg-gray-200 p-4 rounded-lg">
                  <img
                    src={paymentSettings?.upiQrCodeUrl || '/upi-qr-code.png'}
                    alt="UPI QR Code"
                    className="w-48 h-48 mx-auto"
                    onError={(e) => {
                      e.target.style.display = 'none'
                      e.target.nextSibling.style.display = 'block'
                    }}
                  />
                  <div style={{ display: 'none' }} className="w-48 h-48 flex items-center justify-center text-gray-600">
                    QR Code
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-2">Scan with any UPI app</p>
              </div>

              {/* UPI ID */}
              <div className="bg-gray-900 p-4 rounded-lg">
                <p className="text-gray-400 text-sm mb-2">Or pay using UPI ID:</p>
                <div className="flex items-center justify-between">
                  <code className="text-lg text-white font-mono">{paymentSettings?.upiId || 'yourname@paytm'}</code>
                  <button
                    onClick={() => copyToClipboard(paymentSettings?.upiId || 'yourname@paytm')}
                    className="flex items-center px-3 py-1 bg-red-600 hover:bg-red-700 rounded transition-colors"
                  >
                    {copied ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4 text-white" />}
                    <span className="ml-2 text-white text-sm">{copied ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <p className="text-gray-500 text-sm mt-2">Name: STRK Tournaments</p>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-xl font-bold text-white mb-4">Bank Transfer Details</h2>
              <div className="space-y-3">
                <div className="bg-gray-900 p-4 rounded-lg">
                  <p className="text-gray-400 text-sm">Account Name</p>
                  <p className="text-white font-bold">{paymentSettings?.bankAccountName || 'Your Name'}</p>
                </div>
                <div className="bg-gray-900 p-4 rounded-lg">
                  <p className="text-gray-400 text-sm">Account Number</p>
                  <div className="flex items-center justify-between">
                    <p className="text-white font-bold font-mono">{paymentSettings?.bankAccountNumber || '1234567890'}</p>
                    <button
                      onClick={() => copyToClipboard(paymentSettings?.bankAccountNumber || '1234567890')}
                      className="text-red-600 hover:text-red-500"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="bg-gray-900 p-4 rounded-lg">
                  <p className="text-gray-400 text-sm">IFSC Code</p>
                  <div className="flex items-center justify-between">
                    <p className="text-white font-bold font-mono">{paymentSettings?.bankIfsc || 'SBIN0001234'}</p>
                    <button
                      onClick={() => copyToClipboard(paymentSettings?.bankIfsc || 'SBIN0001234')}
                      className="text-red-600 hover:text-red-500"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="bg-gray-900 p-4 rounded-lg">
                  <p className="text-gray-400 text-sm">Bank Name</p>
                  <p className="text-white font-bold">{paymentSettings?.bankName || 'State Bank of India'}</p>
                </div>
                <div className="bg-gray-900 p-4 rounded-lg">
                  <p className="text-gray-400 text-sm">Branch</p>
                  <p className="text-white font-bold">{paymentSettings?.bankBranch || 'Main Branch'}</p>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Payment Proof Form */}
        <form onSubmit={handleSubmit} className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-bold text-white mb-4">Submit Payment Proof</h2>
          
          <div className="space-y-4">
            {/* Payer Name */}
            <div>
              <label className="block text-gray-300 mb-2">Payer Name *</label>
              <input
                type="text"
                value={payerName}
                onChange={(e) => setPayerName(e.target.value)}
                placeholder="Name as per bank/UPI account"
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:border-red-600 focus:outline-none"
                required
              />
            </div>

            {/* Transaction ID */}
            <div>
              <label className="block text-gray-300 mb-2">
                {selectedMethod === paymentMethods.UPI ? 'UPI Transaction ID / UTR Number *' : 'Transaction Reference Number *'}
              </label>
              <input
                type="text"
                value={transactionId}
                onChange={(e) => setTransactionId(e.target.value)}
                placeholder="Enter transaction ID"
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:border-red-600 focus:outline-none"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                {selectedMethod === paymentMethods.UPI 
                  ? 'Find this in your UPI app transaction history'
                  : 'Find this in your bank transaction receipt'
                }
              </p>
            </div>

            {/* Payment Screenshot */}
            <div>
              <label className="block text-gray-300 mb-2">Payment Screenshot *</label>
              <div className="border-2 border-dashed border-gray-700 rounded-lg p-6 text-center hover:border-red-600 transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  id="payment-proof"
                  required
                />
                <label htmlFor="payment-proof" className="cursor-pointer">
                  {previewUrl ? (
                    <div>
                      <img src={previewUrl} alt="Payment proof" className="max-h-64 mx-auto rounded-lg mb-2" />
                      <p className="text-sm text-green-400">Screenshot uploaded ✓</p>
                      <p className="text-xs text-gray-500 mt-1">Click to change</p>
                    </div>
                  ) : (
                    <div>
                      <Upload className="w-12 h-12 mx-auto text-gray-500 mb-2" />
                      <p className="text-gray-400">Click to upload payment screenshot</p>
                      <p className="text-xs text-gray-600 mt-1">PNG, JPG up to 5MB</p>
                    </div>
                  )}
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-4 px-6 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Submitting...' : 'Submit Payment Proof'}
            </button>

            <p className="text-xs text-gray-500 text-center">
              Your payment will be verified within 24 hours. You'll receive confirmation via email.
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}
