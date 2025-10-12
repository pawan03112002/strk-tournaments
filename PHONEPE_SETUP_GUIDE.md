# PhonePe Payment Gateway Setup Guide

## 📱 Overview

This project now uses **PhonePe Payment Gateway** for Indian payments (INR) instead of Razorpay. PhonePe is a popular UPI-based payment platform in India.

## 🔑 Getting Started with PhonePe

### Step 1: Create PhonePe Business Account

1. Visit [PhonePe Business](https://business.phonepe.com/)
2. Sign up for a business account
3. Complete KYC verification
4. Submit required business documents

### Step 2: Get API Credentials

Once your account is approved, you'll receive:
- **Merchant ID**: Your unique merchant identifier
- **Salt Key**: Secret key for API authentication
- **Salt Index**: Index number (usually 1)

### Step 3: Choose Environment

PhonePe offers two environments:

1. **Sandbox (UAT)** - For testing
   - API Endpoint: `https://api-preprod.phonepe.com/apis/pg-sandbox`
   - Use test cards and UPI IDs
   - No real money transactions

2. **Production** - For live payments
   - API Endpoint: `https://api.phonepe.com/apis/hermes`
   - Real money transactions
   - Requires approval from PhonePe

## 🔧 Configuration

### Update Environment Variables

Create a `.env` file in your project root:

```env
# PhonePe Configuration
VITE_PHONEPE_MERCHANT_ID=your_merchant_id_here
VITE_PHONEPE_SALT_KEY=your_salt_key_here
VITE_PHONEPE_SALT_INDEX=1
VITE_PHONEPE_ENV=sandbox

# For backend only - keep this secret!
PHONEPE_SALT_KEY=your_salt_key_here

# Base URL for callbacks
NEXT_PUBLIC_BASE_URL=https://strk-tournaments.vercel.app
```

### Vercel Environment Variables

Add these in Vercel Dashboard → Settings → Environment Variables:

1. `VITE_PHONEPE_MERCHANT_ID` - Your Merchant ID
2. `VITE_PHONEPE_SALT_KEY` - Your Salt Key (frontend)
3. `PHONEPE_SALT_KEY` - Your Salt Key (backend - keep secret!)
4. `VITE_PHONEPE_SALT_INDEX` - Usually `1`
5. `VITE_PHONEPE_ENV` - `sandbox` or `production`
6. `NEXT_PUBLIC_BASE_URL` - Your website URL

## 📋 How PhonePe Integration Works

### Payment Flow:

```
1. User clicks "Pay Now"
   ↓
2. Frontend calls /api/create-phonepe-payment
   ↓
3. Backend creates payment request with PhonePe
   ↓
4. PhonePe returns redirect URL
   ↓
5. User is redirected to PhonePe payment page
   ↓
6. User completes payment (UPI/Card/Netbanking)
   ↓
7. PhonePe redirects back to your website
   ↓
8. Frontend calls /api/check-phonepe-status
   ↓
9. Backend verifies payment with PhonePe
   ↓
10. Show success/failure message
```

### Key Differences from Razorpay:

| Feature | Razorpay | PhonePe |
|---------|----------|---------|
| **UI** | Modal popup | Full page redirect |
| **Script** | Requires JS SDK | API-only (no script) |
| **Payment** | Inline checkout | Redirect to PhonePe |
| **Verification** | Webhook + API | API status check |
| **Fee** | 2% + GST | Competitive rates |

## 🧪 Testing in Sandbox

### Test UPI IDs:
- `success@ybl` - Successful payment
- `failure@ybl` - Failed payment

### Test Cards:
PhonePe provides test card numbers in their dashboard.

### Test Flow:
1. Set `VITE_PHONEPE_ENV=sandbox`
2. Use test credentials
3. Complete payment with test UPI/card
4. Verify in PhonePe sandbox dashboard

## 🚀 Going Live

### Checklist:

- [ ] Complete business KYC
- [ ] Get production credentials
- [ ] Update environment variables
- [ ] Set `VITE_PHONEPE_ENV=production`
- [ ] Test with small amount first
- [ ] Monitor PhonePe dashboard
- [ ] Set up webhooks (optional)

### Production Deployment:

```bash
# 1. Update .env
VITE_PHONEPE_ENV=production

# 2. Update Vercel environment variables
# Go to Vercel Dashboard → Settings → Environment Variables
# Change VITE_PHONEPE_ENV to "production"

# 3. Redeploy
vercel --prod
```

## 📊 Payment Status Codes

| Code | Status | Description |
|------|--------|-------------|
| `PAYMENT_SUCCESS` | Success | Payment completed |
| `PAYMENT_PENDING` | Pending | Payment in progress |
| `PAYMENT_DECLINED` | Failed | Payment declined |
| `PAYMENT_ERROR` | Failed | Technical error |
| `TRANSACTION_NOT_FOUND` | Error | Invalid transaction ID |

## 🔒 Security Best Practices

### ✅ Do's:
- Keep `PHONEPE_SALT_KEY` secret (backend only)
- Use HTTPS for all callbacks
- Verify payment on backend
- Log all transactions
- Implement rate limiting

### ❌ Don'ts:
- Don't expose salt key in frontend
- Don't trust frontend payment status
- Don't skip signature verification
- Don't hardcode credentials

## 🛠️ API Endpoints

### Create Payment
```javascript
POST /api/create-phonepe-payment

Body:
{
  "amount": 50000,  // in paise (₹500)
  "transactionId": "TXN_123_1234567890",
  "merchantUserId": "user_email_com",
  "teamName": "Team Alpha",
  "contactEmail": "user@email.com",
  "contactNumber": "9876543210"
}

Response:
{
  "success": true,
  "redirectUrl": "https://phonepe.com/...",
  "transactionId": "TXN_123_1234567890"
}
```

### Check Status
```javascript
POST /api/check-phonepe-status

Body:
{
  "transactionId": "TXN_123_1234567890"
}

Response:
{
  "success": true,
  "paymentState": "COMPLETED",
  "code": "PAYMENT_SUCCESS",
  "amount": 50000
}
```

## 📞 Support

### PhonePe Support:
- Email: merchantsupport@phonepe.com
- Dashboard: https://business.phonepe.com/
- Docs: https://developer.phonepe.com/

### Common Issues:

**Issue**: Invalid signature error
**Solution**: Check salt key and index are correct

**Issue**: Redirect not working
**Solution**: Verify callback URL is correct

**Issue**: Payment stuck in pending
**Solution**: Call status API after 30 seconds

## 💰 Pricing

PhonePe charges transaction fees based on payment method:
- UPI: ~0% (promotional)
- Cards: ~2%
- Netbanking: ~2%

Check current rates on PhonePe Business dashboard.

## 📝 Notes

1. **Transaction ID** must be unique for each payment
2. **Amount** is always in paise (₹1 = 100 paise)
3. **Callback URL** must be publicly accessible
4. **Status check** should be done after redirect
5. **Webhook** integration is optional but recommended

## 🔄 Migration from Razorpay

If you're migrating from Razorpay:
- Payment flow changes from modal to redirect
- No frontend script required
- Backend API calls replace Razorpay SDK
- Signature verification is different
- Amount format remains same (paise)

---

**Ready to accept payments with PhonePe!** 🎉
