// Payment Gateway Configuration

// Razorpay (for Indian payments)
export const razorpayConfig = {
  keyId: import.meta.env.VITE_RAZORPAY_KEY_ID || "YOUR_RAZORPAY_KEY_ID",
  keySecret: import.meta.env.VITE_RAZORPAY_KEY_SECRET || "YOUR_RAZORPAY_KEY_SECRET",
}

// Stripe (for international payments)
export const stripeConfig = {
  publishableKey: import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || "YOUR_STRIPE_PUBLISHABLE_KEY",
  secretKey: import.meta.env.VITE_STRIPE_SECRET_KEY || "YOUR_STRIPE_SECRET_KEY",
}

// Payment amounts
export const paymentAmounts = {
  INR: 500,
  USD: 7,
}

// Currency detection based on user location
export const detectCurrency = () => {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
  return timezone.includes('Asia/Kolkata') || timezone.includes('Asia/Calcutta') ? 'INR' : 'USD'
}
