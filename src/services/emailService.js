import emailjs from '@emailjs/browser'

// EmailJS Configuration
// Sign up at https://www.emailjs.com/ for free
const EMAILJS_CONFIG = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID',
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID',
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY'
}

// Initialize EmailJS
emailjs.init(EMAILJS_CONFIG.publicKey)

/**
 * Send OTP via Email
 * @param {string} email - Recipient email
 * @param {string} otp - 6-digit OTP
 * @param {string} name - User name (optional)
 */
export const sendOTPEmail = async (email, otp, name = 'User') => {
  try {
    const templateParams = {
      to_email: email,
      to_name: name,
      otp_code: otp,
      from_name: 'STRK Tournaments'
    }

    const response = await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templateId,
      templateParams
    )

    if (response.status === 200) {
      return { success: true, message: 'OTP sent successfully!' }
    } else {
      throw new Error('Failed to send OTP')
    }
  } catch (error) {
    console.error('Email send error:', error)
    return { 
      success: false, 
      message: 'Failed to send OTP. Please try again.',
      error: error.message 
    }
  }
}

/**
 * Send Payment Confirmation Email
 * @param {string} email - Recipient email
 * @param {object} details - Payment and team details
 */
export const sendPaymentConfirmation = async (email, details) => {
  try {
    const templateParams = {
      to_email: email,
      team_name: details.teamName,
      team_number: details.teamNumber,
      amount: details.amount,
      transaction_id: details.transactionId,
      payment_date: new Date().toLocaleString()
    }

    const response = await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      'payment_confirmation_template', // Separate template for payments
      templateParams
    )

    return response.status === 200
  } catch (error) {
    console.error('Payment confirmation email error:', error)
    return false
  }
}

export default {
  sendOTPEmail,
  sendPaymentConfirmation
}
