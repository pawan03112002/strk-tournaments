// Vercel Serverless Function - Verify Razorpay Payment
import crypto from 'crypto'

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    } = req.body

    // Validate required fields
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({
        success: false,
        error: 'Missing required payment parameters'
      })
    }

    // Verify signature
    const keySecret = process.env.RAZORPAY_KEY_SECRET

    const generatedSignature = crypto
      .createHmac('sha256', keySecret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex')

    if (generatedSignature !== razorpay_signature) {
      console.error('Signature verification failed')
      return res.status(400).json({
        success: false,
        error: 'Invalid payment signature'
      })
    }

    console.log('Payment verified successfully:', razorpay_payment_id)

    // Payment is verified
    return res.status(200).json({
      success: true,
      message: 'Payment verified successfully',
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id
    })

  } catch (error) {
    console.error('Payment verification error:', error)
    return res.status(500).json({
      success: false,
      error: 'Payment verification failed',
      message: error.message
    })
  }
}
