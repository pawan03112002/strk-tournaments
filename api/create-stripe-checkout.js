// Vercel Serverless Function - Create Stripe Checkout Session
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { amount, currency, teamName, email, metadata } = req.body

    // Validate required fields
    if (!amount || !currency || !email) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: currency.toLowerCase(),
            product_data: {
              name: 'STRK Tournament Registration',
              description: `Team: ${teamName} - Free Fire PC BR Squad Tournament`,
              images: ['https://strk-tournaments.vercel.app/strk-logo.png'],
            },
            unit_amount: amount, // Amount in smallest currency unit (paise/cents)
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://strk-tournaments.vercel.app'}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://strk-tournaments.vercel.app'}/tournament-registration?payment=cancelled`,
      customer_email: email,
      metadata: {
        teamName: teamName,
        ...metadata
      },
      // Enable Indian payment methods
      payment_method_options: {
        card: {
          request_three_d_secure: 'automatic',
        },
      },
    })

    console.log('Stripe session created:', session.id)

    return res.status(200).json({
      id: session.id,
      url: session.url
    })

  } catch (error) {
    console.error('Stripe checkout creation error:', error)
    return res.status(500).json({
      error: 'Failed to create checkout session',
      message: error.message
    })
  }
}
