// Manual Payment Service

/**
 * Submit manual payment proof
 * @param {object} paymentData - Payment proof details
 */
export const submitManualPayment = async (paymentData) => {
  try {
    const {
      teamName,
      contactEmail,
      contactNumber,
      paymentMethod,
      transactionId,
      amount,
      paymentProof, // base64 image or file
      upiId,
      payerName
    } = paymentData

    // In a real app, this would save to Firebase/database
    // For now, we'll store in localStorage and show admin panel
    const paymentRecord = {
      id: `PAY_${Date.now()}`,
      teamName,
      contactEmail,
      contactNumber,
      paymentMethod,
      transactionId,
      amount,
      paymentProof,
      upiId,
      payerName,
      status: 'pending',
      submittedAt: new Date().toISOString(),
      verifiedAt: null
    }

    // Save to localStorage (you can replace with Firebase later)
    const existingPayments = JSON.parse(localStorage.getItem('pendingPayments') || '[]')
    existingPayments.push(paymentRecord)
    localStorage.setItem('pendingPayments', JSON.stringify(existingPayments))

    console.log('Payment submitted:', paymentRecord)

    return {
      success: true,
      paymentId: paymentRecord.id,
      message: 'Payment proof submitted successfully. Please wait for verification.'
    }
  } catch (error) {
    console.error('Manual payment submission error:', error)
    throw error
  }
}

/**
 * Get pending payments (Admin function)
 */
export const getPendingPayments = () => {
  try {
    const payments = JSON.parse(localStorage.getItem('pendingPayments') || '[]')
    return payments.filter(p => p.status === 'pending')
  } catch (error) {
    console.error('Error fetching pending payments:', error)
    return []
  }
}

/**
 * Get all payments (Admin function)
 */
export const getAllPayments = () => {
  try {
    return JSON.parse(localStorage.getItem('pendingPayments') || '[]')
  } catch (error) {
    console.error('Error fetching all payments:', error)
    return []
  }
}

/**
 * Verify payment (Admin function)
 * @param {string} paymentId - Payment ID to verify
 */
export const verifyPayment = (paymentId) => {
  try {
    const payments = JSON.parse(localStorage.getItem('pendingPayments') || '[]')
    const paymentIndex = payments.findIndex(p => p.id === paymentId)
    
    if (paymentIndex === -1) {
      throw new Error('Payment not found')
    }

    payments[paymentIndex].status = 'verified'
    payments[paymentIndex].verifiedAt = new Date().toISOString()
    
    localStorage.setItem('pendingPayments', JSON.stringify(payments))
    
    return {
      success: true,
      message: 'Payment verified successfully'
    }
  } catch (error) {
    console.error('Error verifying payment:', error)
    throw error
  }
}

/**
 * Reject payment (Admin function)
 * @param {string} paymentId - Payment ID to reject
 * @param {string} reason - Rejection reason
 */
export const rejectPayment = (paymentId, reason = '') => {
  try {
    const payments = JSON.parse(localStorage.getItem('pendingPayments') || '[]')
    const paymentIndex = payments.findIndex(p => p.id === paymentId)
    
    if (paymentIndex === -1) {
      throw new Error('Payment not found')
    }

    payments[paymentIndex].status = 'rejected'
    payments[paymentIndex].rejectedAt = new Date().toISOString()
    payments[paymentIndex].rejectionReason = reason
    
    localStorage.setItem('pendingPayments', JSON.stringify(payments))
    
    return {
      success: true,
      message: 'Payment rejected'
    }
  } catch (error) {
    console.error('Error rejecting payment:', error)
    throw error
  }
}

/**
 * Format currency for display
 */
export const formatCurrency = (amount) => {
  return `₹${amount}`
}

export default {
  submitManualPayment,
  getPendingPayments,
  getAllPayments,
  verifyPayment,
  rejectPayment,
  formatCurrency
}
