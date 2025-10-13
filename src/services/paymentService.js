// Payment Service - Firebase Firestore Integration
import { db } from '../config/firebase'
import { 
  collection, 
  addDoc, 
  getDocs, 
  getDoc,
  doc, 
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy
} from 'firebase/firestore'

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

    const paymentRecord = {
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
      verifiedAt: null,
      teamNumber: null,
      teamId: null
    }

    // Save to Firebase Firestore
    if (db) {
      const docRef = await addDoc(collection(db, 'payments'), paymentRecord)
      console.log('Payment submitted to Firestore:', docRef.id)
      
      return {
        success: true,
        paymentId: docRef.id,
        message: 'Payment proof submitted successfully. Please wait for verification.'
      }
    } else {
      throw new Error('Firebase not initialized. Please configure Firebase.')
    }
  } catch (error) {
    console.error('Manual payment submission error:', error)
    throw error
  }
}

/**
 * Get pending payments (Admin function)
 */
export const getPendingPayments = async () => {
  try {
    if (!db) {
      throw new Error('Firebase not initialized')
    }
    
    const q = query(
      collection(db, 'payments'),
      where('status', '==', 'pending'),
      orderBy('submittedAt', 'desc')
    )
    
    const querySnapshot = await getDocs(q)
    const payments = []
    querySnapshot.forEach((doc) => {
      payments.push({
        id: doc.id,
        ...doc.data()
      })
    })
    
    return payments
  } catch (error) {
    console.error('Error fetching pending payments:', error)
    return []
  }
}

/**
 * Get all payments (Admin function)
 */
export const getAllPayments = async () => {
  try {
    if (!db) {
      throw new Error('Firebase not initialized')
    }
    
    const querySnapshot = await getDocs(collection(db, 'payments'))
    const payments = []
    querySnapshot.forEach((doc) => {
      payments.push({
        id: doc.id,
        ...doc.data()
      })
    })
    
    // Sort by submittedAt desc
    payments.sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt))
    
    return payments
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
    if (!db) {
      throw new Error('Firebase not initialized')
    }
    
    const paymentRef = doc(db, 'payments', paymentId)
    const paymentDoc = await getDoc(paymentRef)
    
    if (!paymentDoc.exists()) {
      throw new Error('Payment not found')
    }

    const payment = paymentDoc.data()
    
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
      
      // Update payment record with team info
      await updateDoc(paymentRef, {
        status: 'verified',
        verifiedAt: new Date().toISOString(),
        teamNumber: createdTeam.teamNumber,
        teamId: createdTeam.teamId
      })
      
      return {
        success: true,
        message: 'Payment verified and team created successfully',
        teamNumber: createdTeam.teamNumber,
        teamId: createdTeam.teamId
      }
    }
    
    // Mark payment as verified without team creation
    await updateDoc(paymentRef, {
      status: 'verified',
      verifiedAt: new Date().toISOString()
    })
    
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
export const rejectPayment = async (paymentId, reason = '') => {
  try {
    if (!db) {
      throw new Error('Firebase not initialized')
    }
    
    const paymentRef = doc(db, 'payments', paymentId)
    const paymentDoc = await getDoc(paymentRef)
    
    if (!paymentDoc.exists()) {
      throw new Error('Payment not found')
    }

    await updateDoc(paymentRef, {
      status: 'rejected',
      rejectedAt: new Date().toISOString(),
      rejectionReason: reason
    })
    
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
export const getUserPaymentStatus = async (email) => {
  try {
    if (!db) {
      return null
    }
    
    const q = query(
      collection(db, 'payments'),
      where('contactEmail', '==', email)
    )
    
    const querySnapshot = await getDocs(q)
    if (querySnapshot.empty) {
      return null
    }
    
    // Return the first payment (most recent if multiple exist)
    const doc = querySnapshot.docs[0]
    return {
      id: doc.id,
      ...doc.data()
    }
  } catch (error) {
    console.error('Error fetching user payment status:', error)
    return null
  }
}

/**
 * Reset payment to pending (Admin function)
 * @param {string} paymentId - Payment ID to reset
 */
export const resetPayment = async (paymentId) => {
  try {
    if (!db) {
      throw new Error('Firebase not initialized')
    }
    
    const paymentRef = doc(db, 'payments', paymentId)
    const paymentDoc = await getDoc(paymentRef)
    
    if (!paymentDoc.exists()) {
      throw new Error('Payment not found')
    }

    await updateDoc(paymentRef, {
      status: 'pending',
      verifiedAt: null,
      rejectedAt: null,
      rejectionReason: null
    })
    
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
export const deletePayment = async (paymentId) => {
  try {
    if (!db) {
      throw new Error('Firebase not initialized')
    }
    
    const paymentRef = doc(db, 'payments', paymentId)
    await deleteDoc(paymentRef)
    
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
export const deletePaymentByTeamId = async (teamId) => {
  try {
    if (!db) {
      throw new Error('Firebase not initialized')
    }
    
    const q = query(
      collection(db, 'payments'),
      where('teamId', '==', teamId)
    )
    
    const querySnapshot = await getDocs(q)
    
    // Delete all matching payments
    const deletePromises = []
    querySnapshot.forEach((doc) => {
      deletePromises.push(deleteDoc(doc.ref))
    })
    
    await Promise.all(deletePromises)
    
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
