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
      payerName,
      registrationData // Full registration form data
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
      registrationData, // Store full registration data for team creation
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
 * @param {function} registerTeamCallback - Callback to register team in tournament store
 */
export const verifyPayment = async (paymentId, registerTeamCallback = null) => {
  try {
    const payments = JSON.parse(localStorage.getItem('pendingPayments') || '[]')
    const paymentIndex = payments.findIndex(p => p.id === paymentId)
    
    if (paymentIndex === -1) {
      throw new Error('Payment not found')
    }

    const payment = payments[paymentIndex]
    
    // Mark payment as verified
    payments[paymentIndex].status = 'verified'
    payments[paymentIndex].verifiedAt = new Date().toISOString()
    
    // Create team using the tournament store if registration data exists
    const registrationData = payment.registrationData
    let createdTeam = null
    
    if (registrationData && registerTeamCallback) {
      const teamData = {
        teamName: registrationData.teamName,
        players: [
          registrationData.player1Username,
          registrationData.player2Username,
          registrationData.player3Username,
          registrationData.player4Username
        ].filter(p => p && p.trim()), // Remove empty players
        contactEmail: registrationData.contactEmail || payment.contactEmail,
        contactNumber: `${registrationData.countryCode || '+91'}${registrationData.phoneNumber || payment.contactNumber}`,
        teamLogo: registrationData.teamLogo || null,
        paymentId: paymentId
      }
      
      // Register team using tournament store
      createdTeam = await registerTeamCallback(teamData)
      
      // Store team info in payment record
      payments[paymentIndex].teamNumber = createdTeam.teamNumber
      payments[paymentIndex].teamId = createdTeam.teamId
    }
    
    localStorage.setItem('pendingPayments', JSON.stringify(payments))
    
    if (createdTeam) {
      return {
        success: true,
        message: 'Payment verified and team created successfully',
        teamNumber: createdTeam.teamNumber,
        teamId: createdTeam.teamId
      }
    }
    
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
 * Get user's payment status by email
 * @param {string} email - User email
 */
export const getUserPaymentStatus = (email) => {
  try {
    const payments = JSON.parse(localStorage.getItem('pendingPayments') || '[]')
    const userPayment = payments.find(p => p.contactEmail === email)
    return userPayment || null
  } catch (error) {
    console.error('Error fetching user payment status:', error)
    return null
  }
}

/**
 * Reset payment to pending (Admin function)
 * @param {string} paymentId - Payment ID to reset
 */
export const resetPayment = (paymentId) => {
  try {
    const payments = JSON.parse(localStorage.getItem('pendingPayments') || '[]')
    const paymentIndex = payments.findIndex(p => p.id === paymentId)
    
    if (paymentIndex === -1) {
      throw new Error('Payment not found')
    }

    payments[paymentIndex].status = 'pending'
    payments[paymentIndex].verifiedAt = null
    payments[paymentIndex].rejectedAt = null
    payments[paymentIndex].rejectionReason = null
    
    localStorage.setItem('pendingPayments', JSON.stringify(payments))
    
    return {
      success: true,
      message: 'Payment reset to pending successfully'
    }
  } catch (error) {
    console.error('Error resetting payment:', error)
    throw error
  }
}

/**
 * Delete payment entry (Admin function)
 * @param {string} paymentId - Payment ID to delete
 */
export const deletePayment = (paymentId) => {
  try {
    const payments = JSON.parse(localStorage.getItem('pendingPayments') || '[]')
    const filtered = payments.filter(p => p.id !== paymentId)
    localStorage.setItem('pendingPayments', JSON.stringify(filtered))
    
    return {
      success: true,
      message: 'Payment deleted successfully'
    }
  } catch (error) {
    console.error('Error deleting payment:', error)
    throw error
  }
}

/**
 * Delete payment by team ID (Admin function)
 * @param {number} teamId - Team ID to find and delete payment
 */
export const deletePaymentByTeamId = (teamId) => {
  try {
    const payments = JSON.parse(localStorage.getItem('pendingPayments') || '[]')
    const filtered = payments.filter(p => p.teamId !== teamId)
    localStorage.setItem('pendingPayments', JSON.stringify(filtered))
    
    return {
      success: true,
      message: 'Payment deleted successfully'
    }
  } catch (error) {
    console.error('Error deleting payment by team ID:', error)
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
  getUserPaymentStatus,
  resetPayment,
  deletePayment,
  deletePaymentByTeamId,
  formatCurrency
}
