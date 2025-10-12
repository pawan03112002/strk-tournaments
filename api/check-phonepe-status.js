// Vercel Serverless Function - Check PhonePe Payment Status
import crypto from 'crypto'
import axios from 'axios'

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { transactionId } = req.body

    if (!transactionId) {
      return res.status(400).json({
        success: false,
        error: 'Transaction ID is required'
      })
    }

    // PhonePe configuration
    const merchantId = process.env.VITE_PHONEPE_MERCHANT_ID
    const saltKey = process.env.PHONEPE_SALT_KEY
    const saltIndex = process.env.VITE_PHONEPE_SALT_INDEX || '1'
    const apiEndpoint = process.env.VITE_PHONEPE_ENV === 'production'
      ? `https://api.phonepe.com/apis/hermes/pg/v1/status/${merchantId}/${transactionId}`
      : `https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/status/${merchantId}/${transactionId}`

    // Generate X-VERIFY checksum for status check
    const string = `/pg/v1/status/${merchantId}/${transactionId}` + saltKey
    const sha256 = crypto.createHash('sha256').update(string).digest('hex')
    const checksum = sha256 + '###' + saltIndex

    // Make status check request to PhonePe
    const options = {
      method: 'GET',
      url: apiEndpoint,
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        'X-VERIFY': checksum,
        'X-MERCHANT-ID': merchantId
      }
    }

    const response = await axios.request(options)

    console.log('PhonePe Status Response:', response.data)

    if (response.data.success) {
      const paymentState = response.data.data.state
      const paymentCode = response.data.code

      return res.status(200).json({
        success: true,
        paymentState: paymentState,
        code: paymentCode,
        transactionId: transactionId,
        amount: response.data.data.amount,
        paymentInstrument: response.data.data.paymentInstrument
      })
    } else {
      return res.status(200).json({
        success: false,
        code: response.data.code,
        message: response.data.message
      })
    }

  } catch (error) {
    console.error('PhonePe status check error:', error.response?.data || error.message)
    return res.status(500).json({
      success: false,
      error: 'Failed to check payment status',
      message: error.message
    })
  }
}
