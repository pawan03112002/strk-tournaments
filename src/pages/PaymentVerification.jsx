import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Check, X, Eye, ArrowLeft, RefreshCw } from 'lucide-react'
import { getPendingPayments, getAllPayments, verifyPayment, rejectPayment, formatCurrency } from '../services/paymentService'
import toast from 'react-hot-toast'

export default function PaymentVerification() {
  const navigate = useNavigate()
  const [payments, setPayments] = useState([])
  const [filter, setFilter] = useState('pending') // 'all', 'pending', 'verified', 'rejected'
  const [selectedPayment, setSelectedPayment] = useState(null)
  const [loading, setLoading] = useState(false)
  const [rejectionReason, setRejectionReason] = useState('')

  const loadPayments = () => {
    const allPayments = getAllPayments()
    
    let filtered = allPayments
    if (filter === 'pending') {
      filtered = allPayments.filter(p => p.status === 'pending')
    } else if (filter === 'verified') {
      filtered = allPayments.filter(p => p.status === 'verified')
    } else if (filter === 'rejected') {
      filtered = allPayments.filter(p => p.status === 'rejected')
    }
    
    setPayments(filtered.sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt)))
  }

  useEffect(() => {
    loadPayments()
  }, [filter])

  const handleVerify = async (paymentId) => {
    if (!confirm('Verify this payment?')) return

    setLoading(true)
    try {
      await verifyPayment(paymentId)
      toast.success('Payment verified successfully!')
      loadPayments()
      setSelectedPayment(null)
    } catch (error) {
      toast.error('Failed to verify payment')
    } finally {
      setLoading(false)
    }
  }

  const handleReject = async (paymentId) => {
    if (!rejectionReason.trim()) {
      toast.error('Please enter rejection reason')
      return
    }

    if (!confirm('Reject this payment?')) return

    setLoading(true)
    try {
      await rejectPayment(paymentId, rejectionReason)
      toast.success('Payment rejected')
      loadPayments()
      setSelectedPayment(null)
      setRejectionReason('')
    } catch (error) {
      toast.error('Failed to reject payment')
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'text-yellow-400 bg-yellow-400/10'
      case 'verified':
        return 'text-green-400 bg-green-400/10'
      case 'rejected':
        return 'text-red-400 bg-red-400/10'
      default:
        return 'text-gray-400 bg-gray-400/10'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/admin')}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-3xl font-bold text-white">Payment Verification</h1>
          </div>
          <button
            onClick={loadPayments}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <RefreshCw className="w-4 h-4 text-white" />
            <span className="text-white">Refresh</span>
          </button>
        </div>

        {/* Filters */}
        <div className="flex space-x-2 mb-6 overflow-x-auto">
          {[
            { value: 'pending', label: 'Pending', count: getAllPayments().filter(p => p.status === 'pending').length },
            { value: 'verified', label: 'Verified', count: getAllPayments().filter(p => p.status === 'verified').length },
            { value: 'rejected', label: 'Rejected', count: getAllPayments().filter(p => p.status === 'rejected').length },
            { value: 'all', label: 'All', count: getAllPayments().length }
          ].map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                filter === f.value
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:text-white'
              }`}
            >
              {f.label} ({f.count})
            </button>
          ))}
        </div>

        {/* Payments List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Payments List */}
          <div className="space-y-4">
            {payments.length === 0 ? (
              <div className="bg-gray-800 rounded-lg p-8 text-center">
                <p className="text-gray-400">No payments found</p>
              </div>
            ) : (
              payments.map((payment) => (
                <div
                  key={payment.id}
                  onClick={() => setSelectedPayment(payment)}
                  className={`bg-gray-800 rounded-lg p-4 cursor-pointer transition-all hover:bg-gray-750 ${
                    selectedPayment?.id === payment.id ? 'ring-2 ring-red-600' : ''
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-white font-bold">{payment.teamName}</h3>
                      <p className="text-sm text-gray-400">{payment.contactEmail}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${getStatusColor(payment.status)}`}>
                      {payment.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm mt-3">
                    <div>
                      <span className="text-gray-500">Amount:</span>
                      <span className="text-green-400 font-bold ml-2">{formatCurrency(payment.amount)}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Method:</span>
                      <span className="text-white ml-2">{payment.paymentMethod === 'upi' ? 'UPI' : 'Bank'}</span>
                    </div>
                    <div className="col-span-2">
                      <span className="text-gray-500">TXN ID:</span>
                      <span className="text-white ml-2 font-mono text-xs">{payment.transactionId}</span>
                    </div>
                    <div className="col-span-2">
                      <span className="text-gray-500">Submitted:</span>
                      <span className="text-white ml-2">{new Date(payment.submittedAt).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Payment Details */}
          <div className="lg:sticky lg:top-4 lg:h-fit">
            {selectedPayment ? (
              <div className="bg-gray-800 rounded-lg p-6">
                <h2 className="text-xl font-bold text-white mb-4">Payment Details</h2>
                
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="text-gray-400 text-sm">Payment ID</label>
                    <p className="text-white font-mono text-sm">{selectedPayment.id}</p>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm">Team Name</label>
                    <p className="text-white font-bold">{selectedPayment.teamName}</p>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm">Email</label>
                    <p className="text-white">{selectedPayment.contactEmail}</p>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm">Phone</label>
                    <p className="text-white">{selectedPayment.contactNumber}</p>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm">Payer Name</label>
                    <p className="text-white font-bold">{selectedPayment.payerName}</p>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm">Amount</label>
                    <p className="text-green-400 font-bold text-xl">{formatCurrency(selectedPayment.amount)}</p>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm">Payment Method</label>
                    <p className="text-white">{selectedPayment.paymentMethod === 'upi' ? 'UPI Payment' : 'Bank Transfer'}</p>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm">Transaction ID / UTR</label>
                    <p className="text-white font-mono">{selectedPayment.transactionId}</p>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm">Status</label>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase mt-1 ${getStatusColor(selectedPayment.status)}`}>
                      {selectedPayment.status}
                    </span>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm">Submitted At</label>
                    <p className="text-white">{new Date(selectedPayment.submittedAt).toLocaleString()}</p>
                  </div>
                  {selectedPayment.verifiedAt && (
                    <div>
                      <label className="text-gray-400 text-sm">Verified At</label>
                      <p className="text-green-400">{new Date(selectedPayment.verifiedAt).toLocaleString()}</p>
                    </div>
                  )}
                  {selectedPayment.rejectedAt && (
                    <div>
                      <label className="text-gray-400 text-sm">Rejected At</label>
                      <p className="text-red-400">{new Date(selectedPayment.rejectedAt).toLocaleString()}</p>
                    </div>
                  )}
                  {selectedPayment.rejectionReason && (
                    <div>
                      <label className="text-gray-400 text-sm">Rejection Reason</label>
                      <p className="text-red-400">{selectedPayment.rejectionReason}</p>
                    </div>
                  )}
                </div>

                {/* Payment Screenshot */}
                <div className="mb-6">
                  <label className="text-gray-400 text-sm block mb-2">Payment Screenshot</label>
                  {selectedPayment.paymentProof ? (
                    <a
                      href={selectedPayment.paymentProof}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <img
                        src={selectedPayment.paymentProof}
                        alt="Payment proof"
                        className="w-full rounded-lg border-2 border-gray-700 hover:border-red-600 transition-colors"
                      />
                    </a>
                  ) : (
                    <p className="text-gray-500">No screenshot available</p>
                  )}
                </div>

                {/* Actions */}
                {selectedPayment.status === 'pending' && (
                  <div className="space-y-3">
                    <button
                      onClick={() => handleVerify(selectedPayment.id)}
                      disabled={loading}
                      className="w-full flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg transition-colors disabled:opacity-50"
                    >
                      <Check className="w-5 h-5" />
                      <span>Verify Payment</span>
                    </button>

                    <div>
                      <input
                        type="text"
                        value={rejectionReason}
                        onChange={(e) => setRejectionReason(e.target.value)}
                        placeholder="Enter rejection reason..."
                        className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white mb-2 focus:border-red-600 focus:outline-none"
                      />
                      <button
                        onClick={() => handleReject(selectedPayment.id)}
                        disabled={loading || !rejectionReason.trim()}
                        className="w-full flex items-center justify-center space-x-2 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg transition-colors disabled:opacity-50"
                      >
                        <X className="w-5 h-5" />
                        <span>Reject Payment</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-gray-800 rounded-lg p-8 text-center">
                <Eye className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                <p className="text-gray-400">Select a payment to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
