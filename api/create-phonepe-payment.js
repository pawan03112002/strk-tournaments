// Vercel Serverless Function - Create PhonePe Payment
import crypto from 'crypto'
import axios from 'axios'

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { amount, transactionId, merchantUserId, teamName, contactEmail, contactNumber } = req.body

    // Validate required fields
    if (!amount || !transactionId || !merchantUserId) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    // PhonePe configuration
    const merchantId = process.env.VITE_PHONEPE_MERCHANT_ID
    const saltKey = process.env.PHONEPE_SALT_KEY
    const saltIndex = process.env.VITE_PHONEPE_SALT_INDEX || '1'
    const apiEndpoint = process.env.VITE_PHONEPE_ENV === 'production'
      ? 'https://api.phonepe.com/apis/hermes/pg/v1/pay'
      : 'https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay'

    // Callback URL - where PhonePe will redirect after payment
    const callbackUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'https://strk-tournaments.vercel.app'}/payment-callback`
    const redirectUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'https://strk-tournaments.vercel.app'}/payment-success`

    // Create payment payload
    const paymentPayload = {
      merchantId: merchantId,
      merchantTransactionId: transactionId,
      merchantUserId: merchantUserId,
      amount: amount, // Amount in paise
      redirectUrl: redirectUrl,
      redirectMode: 'POST',
      callbackUrl: callbackUrl,
      mobileNumber: contactNumber || '',
      paymentInstrument: {
        type: 'PAY_PAGE'
      }
    }

    // Convert payload to base64
    const payloadBase64 = Buffer.from(JSON.stringify(paymentPayload)).toString('base64')

    // Generate X-VERIFY checksum
    const string = payloadBase64 + '/pg/v1/pay' + saltKey
    const sha256 = crypto.createHash('sha256').update(string).digest('hex')
    const checksum = sha256 + '###' + saltIndex

    // Make request to PhonePe
    const options = {
      method: 'POST',
      url: apiEndpoint,
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        'X-VERIFY': checksum
      },
      data: {
        request: payloadBase64
      }
    }

    const response = await axios.request(options)

    console.log('PhonePe Response:', response.data)

    if (response.data.success && response.data.data.instrumentResponse.redirectInfo) {
      return res.status(200).json({
        success: true,
        redirectUrl: response.data.data.instrumentResponse.redirectInfo.url,
        transactionId: transactionId
      })
    } else {
      throw new Error('Failed to get redirect URL from PhonePe')
    }

  } catch (error) {
    console.error('PhonePe payment creation error:', error.response?.data || error.message)
    return res.status(500).json({
      success: false,
      error: 'Failed to create payment',
      message: error.message
    })
  }
}
