import { loadStripe } from '@stripe/stripe-js'

// Payment Configuration
const RAZORPAY_KEY = import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_YOUR_KEY'
const STRIPE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_YOUR_KEY'

// Initialize Stripe
let stripePromise = null
const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(STRIPE_KEY)
  }
  return stripePromise
}

/**
 * Process Razorpay Payment (for INR)
 * @param {object} orderDetails - Order details
 */
export const processRazorpayPayment = (orderDetails) => {
  return new Promise((resolve, reject) => {
    // Check if Razorpay is loaded
    if (typeof window.Razorpay === 'undefined') {
      reject(new Error('Razorpay SDK not loaded. Please refresh the page.'))
      return
    }

    const options = {
      key: RAZORPAY_KEY,
      amount: orderDetails.amount * 100, // Convert to paise
      currency: 'INR',
      name: 'STRK Tournaments',
      description: `Tournament Registration - ${orderDetails.teamName}`,
      image: '/logo.png', // Your logo
      // Note: order_id removed for test mode - works without backend
      handler: function (response) {
        resolve({
          success: true,
          paymentId: response.razorpay_payment_id,
          orderId: orderDetails.orderId, // Use client-generated ID
          signature: response.razorpay_signature
        })
      },
      prefill: {
        name: orderDetails.name || '',
        email: orderDetails.email || '',
        contact: orderDetails.phone || ''
      },
      notes: {
        team_name: orderDetails.teamName,
        tournament: 'Free Fire PC Tournament'
      },
      theme: {
        color: '#DC2626' // Red theme matching your website
      },
      modal: {
        ondismiss: function() {
          reject(new Error('Payment cancelled by user'))
        }
      }
    }

    const rzp = new window.Razorpay(options)
    
    rzp.on('payment.failed', function (response) {
      reject({
        error: true,
        code: response.error.code,
        description: response.error.description,
        reason: response.error.reason
      })
    })

    rzp.open()
  })
}

/**
 * Process Stripe Payment (for USD and other currencies)
 * @param {object} orderDetails - Order details
 */
export const processStripePayment = async (orderDetails) => {
  try {
    const stripe = await getStripe()
    
    if (!stripe) {
      throw new Error('Stripe failed to initialize')
    }

    // In production, you need to create a checkout session on your backend
    // For now, using Stripe Checkout (requires backend endpoint)
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: orderDetails.amount,
        currency: orderDetails.currency || 'USD',
        teamName: orderDetails.teamName,
        email: orderDetails.email
      })
    })

    const session = await response.json()

    // Redirect to Stripe Checkout
    const result = await stripe.redirectToCheckout({
      sessionId: session.id
    })

    if (result.error) {
      throw new Error(result.error.message)
    }

    return { success: true }
  } catch (error) {
    console.error('Stripe payment error:', error)
    throw error
  }
}

/**
 * Detect user's currency based on location
 */
export const detectCurrency = () => {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
  const indianTimezones = ['Asia/Kolkata', 'Asia/Calcutta']
  
  if (indianTimezones.some(tz => timezone.includes(tz))) {
    return 'INR'
  }
  
  return 'USD'
}

/**
 * Get payment amount based on currency
 */
export const getPaymentAmount = (currency) => {
  const amounts = {
    INR: 500,
    USD: 7
  }
  return amounts[currency] || amounts.USD
}

/**
 * Format currency for display
 */
export const formatCurrency = (amount, currency) => {
  const symbols = {
    INR: '₹',
    USD: '$'
  }
  return `${symbols[currency] || '$'}${amount}`
}

/**
 * Load Razorpay script dynamically
 */
export const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    // Check if already loaded
    if (typeof window.Razorpay !== 'undefined') {
      resolve(true)
      return
    }

    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.async = true
    script.onload = () => resolve(true)
    script.onerror = () => resolve(false)
    document.body.appendChild(script)
  })
}

export default {
  processRazorpayPayment,
  processStripePayment,
  detectCurrency,
  getPaymentAmount,
  formatCurrency,
  loadRazorpayScript
}
