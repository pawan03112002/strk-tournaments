# 📧 Email OTP & 💳 Payment Integration Setup Guide

This guide will help you set up email OTP verification and payment processing for your tournament website.

---

## 📧 Email OTP Setup (EmailJS - FREE)

### Step 1: Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click **"Sign Up"** (It's FREE - 200 emails/month)
3. Verify your email address

### Step 2: Add Email Service

1. Go to **Email Services** in dashboard
2. Click **"Add New Service"**
3. Choose **Gmail** (recommended)
4. Follow OAuth connection process
5. Copy the **Service ID** (e.g., `service_abc123`)

### Step 3: Create Email Templates

#### OTP Template:
1. Go to **Email Templates**
2. Click **"Create New Template"**
3. **Template Name:** `OTP Verification`
4. **Subject:** `Your OTP for STRK Tournaments`
5. **Content:**
```
Hello {{to_name}},

Your OTP for registration is: {{otp_code}}

This OTP will expire in 5 minutes.

If you didn't request this, please ignore this email.

Best regards,
STRK Tournaments Team
```
6. Copy the **Template ID** (e.g., `template_xyz789`)

#### Payment Confirmation Template (Optional):
1. Create another template
2. **Template Name:** `Payment Confirmation`
3. **Subject:** `Payment Successful - Team {{team_number}}`
4. **Content:**
```
Hello,

Your payment for STRK Tournament has been successfully processed!

Team Details:
- Team Name: {{team_name}}
- Team Number: {{team_number}}
- Amount Paid: {{amount}}
- Transaction ID: {{transaction_id}}

See you in the tournament!

Best regards,
STRK Tournaments Team
```

### Step 4: Get Public Key

1. Go to **Account** → **General**
2. Copy your **Public Key**

### Step 5: Update Environment Variables

Create a `.env` file in your project root (copy from `.env.example`):

```env
VITE_EMAILJS_SERVICE_ID=service_abc123
VITE_EMAILJS_TEMPLATE_ID=template_xyz789
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

---

## 💳 Payment Integration

### 🇮🇳 Razorpay Setup (for Indian Payments - INR)

#### Step 1: Create Account

1. Go to [https://razorpay.com/](https://razorpay.com/)
2. Sign up for an account
3. Complete KYC verification

#### Step 2: Get API Keys

1. Go to **Settings** → **API Keys**
2. Generate **Test Mode** keys (for testing)
3. Copy **Key ID** and **Key Secret**

#### Step 3: Update Environment Variables

```env
VITE_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxx
VITE_RAZORPAY_KEY_SECRET=your_secret_key
```

#### Step 4: Test Payment

- Use test card: `4111 1111 1111 1111`
- CVV: Any 3 digits
- Expiry: Any future date

#### Step 5: Go Live (Production)

1. Switch to **Live Mode** in Razorpay dashboard
2. Generate **Live API Keys**
3. Update `.env` with live keys
4. Deploy to production

---

### 🌍 Stripe Setup (for International Payments - USD, EUR, etc.)

#### Step 1: Create Account

1. Go to [https://stripe.com/](https://stripe.com/)
2. Sign up for an account
3. Complete business verification

#### Step 2: Get API Keys

1. Go to **Developers** → **API Keys**
2. Copy **Publishable Key** and **Secret Key** (Test mode)

#### Step 3: Create Backend Endpoint (IMPORTANT!)

Stripe requires a backend to create checkout sessions. Create a simple backend:

**Create `server/index.js`:**

```javascript
import express from 'express'
import Stripe from 'stripe'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

app.use(cors())
app.use(express.json())

app.post('/api/create-checkout-session', async (req, res) => {
  try {
    const { amount, currency, teamName, email } = req.body

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: currency.toLowerCase(),
            product_data: {
              name: `Tournament Registration - ${teamName}`,
              description: 'Free Fire PC Tournament Entry Fee',
            },
            unit_amount: amount * 100, // Convert to cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${req.headers.origin}/dashboard?payment=success`,
      cancel_url: `${req.headers.origin}/tournament-registration?payment=cancelled`,
      customer_email: email,
    })

    res.json({ id: session.id })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
```

#### Step 4: Update Environment Variables

```env
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxxxxxxx
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxx
```

#### Step 5: Run Backend Server

```bash
npm run server
```

#### Step 6: Test Payment

- Use test card: `4242 4242 4242 4242`
- CVV: Any 3 digits
- Expiry: Any future date
- ZIP: Any 5 digits

---

## 🚀 Deployment

### Vercel Deployment

#### Add Environment Variables:

1. Go to your Vercel project
2. Navigate to **Settings** → **Environment Variables**
3. Add all variables:
   - `VITE_EMAILJS_SERVICE_ID`
   - `VITE_EMAILJS_TEMPLATE_ID`
   - `VITE_EMAILJS_PUBLIC_KEY`
   - `VITE_RAZORPAY_KEY_ID`
   - `VITE_STRIPE_PUBLISHABLE_KEY`
   - `STRIPE_SECRET_KEY` (for backend)

#### Deploy Backend (if using Stripe):

Option 1: Deploy to Vercel Serverless Functions
Option 2: Deploy to Heroku/Railway/Render (recommended for simplicity)

---

## 🧪 Testing Flow

### 1. Registration with OTP:
1. Go to `/register`
2. Enter Gmail address
3. Check email for OTP (or console if EmailJS not configured)
4. Enter OTP and complete registration

### 2. Tournament Registration with Payment:
1. Login to your account
2. Go to `/tournament-registration`
3. Fill team details
4. Click "Register Team"
5. Complete payment via Razorpay (INR) or Stripe (USD)
6. Receive confirmation email

---

## 💰 Payment Amounts

- **India (INR):** ₹500 via Razorpay
- **International (USD):** $7 via Stripe

The system automatically detects user location and selects the appropriate payment gateway.

---

## 🔐 Security Notes

1. **Never commit `.env` file** to Git (already in `.gitignore`)
2. **Use test keys** for development
3. **Switch to live keys** only in production
4. **Verify payments** on backend before registering teams
5. **Keep Secret Keys** secure and never expose them in frontend code

---

## 📊 Free Tier Limits

### EmailJS (FREE):
- 200 emails/month
- Upgrade: $7/month for 1,000 emails

### Razorpay (FREE):
- No setup fees
- Transaction fee: 2% + ₹2 per transaction
- First ₹50,000: FREE processing

### Stripe (FREE):
- No setup fees
- Transaction fee: 2.9% + $0.30 per transaction
- No monthly fees

---

## 🆘 Troubleshooting

### Email Not Sending:
- Check EmailJS dashboard for quota
- Verify email service is connected
- Check browser console for errors
- Make sure environment variables are set

### Razorpay Payment Failing:
- Ensure Razorpay script is loaded
- Check API keys are correct
- Use test cards in test mode
- Check browser console for errors

### Stripe Payment Failing:
- Ensure backend server is running
- Check `/api/create-checkout-session` endpoint
- Verify Stripe keys are correct
- Check network tab for API errors

---

## 📞 Support

- EmailJS: [https://www.emailjs.com/docs/](https://www.emailjs.com/docs/)
- Razorpay: [https://razorpay.com/docs/](https://razorpay.com/docs/)
- Stripe: [https://stripe.com/docs](https://stripe.com/docs)

---

**Your tournament website now has production-ready email OTP and payment processing! 🎉**
