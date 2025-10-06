// Vercel Serverless Function - Create Razorpay Order
import Razorpay from 'razorpay'

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { amount, currency, receipt, notes } = req.body

    // Validate required fields
    if (!amount || !currency) {
      return res.status(400).json({ error: 'Amount and currency are required' })
    }

    // Initialize Razorpay with production keys
    const razorpay = new Razorpay({
      key_id: process.env.VITE_RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET // This is server-side only!
    })

    // Create order
    const order = await razorpay.orders.create({
      amount: amount, // Amount in smallest currency unit (paise for INR)
      currency: currency,
      receipt: receipt || `receipt_${Date.now()}`,
      notes: notes || {}
    })

    console.log('Order created:', order.id)

    return res.status(200).json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency
    })

  } catch (error) {
    console.error('Order creation error:', error)
    return res.status(500).json({
      success: false,
      error: 'Failed to create order',
      message: error.message
    })
  }
}
