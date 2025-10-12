# 🎯 Stripe Payment Gateway Setup Guide

## ✅ Complete Setup for Individual Account (No Business Required)

---

## 📋 **Step 1: Create Stripe Account (5 minutes)**

### **Go to Stripe Website:**
1. Visit: https://stripe.com/
2. Click **"Start now"** or **"Sign up"**
3. Enter your email address
4. Create a strong password
5. Verify your email

### **Choose Account Type:**
- Select **"Individual"** (No business registration needed!)
- Choose **India** as your country
- Click Continue

---

## 🔑 **Step 2: Get Test API Keys (Instant)**

### **Access Dashboard:**
1. Login to https://dashboard.stripe.com/
2. You'll see "Test mode" badge (good!)
3. Go to **Developers** → **API keys**

### **Copy Your Keys:**

**Publishable Key** (starts with `pk_test_`)
```
pk_test_51Abc...xyz
```

**Secret Key** (starts with `sk_test_`) - Click "Reveal test key"
```
sk_test_51Abc...xyz
```

⚠️ **Keep secret key private! Never share it publicly.**

---

## 💻 **Step 3: Add Keys to Your Project**

### **Create .env File:**

In your project root, create a `.env` file:

```env
# Stripe Test Keys
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_KEY_HERE
STRIPE_SECRET_KEY=sk_test_YOUR_KEY_HERE

# Base URL
NEXT_PUBLIC_BASE_URL=http://localhost:5173
```

### **For Vercel Deployment:**

1. Go to Vercel Dashboard
2. Select your project
3. Settings → Environment Variables
4. Add these variables:
   - `VITE_STRIPE_PUBLISHABLE_KEY` = `pk_test_...`
   - `STRIPE_SECRET_KEY` = `sk_test_...`
   - `NEXT_PUBLIC_BASE_URL` = `https://your-site.vercel.app`

---

## 🧪 **Step 4: Test Payments (Works Immediately!)**

### **Test Credit Cards:**

| Card Number | Brand | Result |
|-------------|-------|--------|
| `4242 4242 4242 4242` | Visa | ✅ Success |
| `4000 0025 0000 3155` | Visa | ✅ Requires authentication |
| `4000 0000 0000 9995` | Visa | ❌ Decline |

**For all test cards:**
- Use any future expiry date (e.g., 12/25)
- Use any 3-digit CVV (e.g., 123)
- Use any name
- Use any billing address

### **Testing Flow:**

```bash
# 1. Start your dev server
npm run dev

# 2. Go to registration page
http://localhost:5173/tournament-registration

# 3. Fill the form
# 4. Click "Pay Now"
# 5. Use test card: 4242 4242 4242 4242
# 6. Complete payment
# 7. Should redirect to success page
```

### **View Test Payments:**

1. Go to Stripe Dashboard
2. Payments → All payments
3. See your test transactions!

---

## 🌏 **Step 5: Enable Indian Payment Methods**

### **Enable UPI, Cards, Wallets:**

1. Dashboard → Settings → Payment methods
2. Enable these for India:
   - ✅ **UPI** (Google Pay, PhonePe, etc.)
   - ✅ **Cards** (Visa, Mastercard, RuPay)
   - ✅ **Wallets** (Paytm, etc.)
   - ✅ **NetBanking**

3. Click **Save**

**Note:** These work automatically in live mode after KYC!

---

## 📄 **Step 6: Complete KYC for Live Payments**

### **Required Documents:**

1. **Personal Information:**
   - Full name (as per PAN)
   - Date of birth
   - Phone number

2. **PAN Card** (Photo/PDF)

3. **Aadhaar Card** (for address verification)

4. **Bank Account:**
   - Account number
   - IFSC code
   - Account holder name

### **Submit KYC:**

1. Dashboard → Settings → **Account details**
2. Click **"Provide information"**
3. Choose **"Individual"** account type
4. Fill personal details
5. Upload PAN card
6. Upload Aadhaar card
7. Add bank account details
8. Submit for review

### **Approval Timeline:**
- **Review time:** 1-3 business days
- **Status:** Check Dashboard → Settings → Account
- **Email:** You'll get notification when approved

---

## 🚀 **Step 7: Go Live (After KYC Approval)**

### **Get Live API Keys:**

1. Dashboard → Toggle **"View live data"** (top right)
2. Go to Developers → API keys
3. Copy your **Live keys**:
   - Publishable key (starts with `pk_live_`)
   - Secret key (starts with `sk_live_`)

### **Update Environment Variables:**

**Local .env:**
```env
# Replace test keys with live keys
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_YOUR_LIVE_KEY
STRIPE_SECRET_KEY=sk_live_YOUR_LIVE_KEY
NEXT_PUBLIC_BASE_URL=http://localhost:5173
```

**Vercel (Production):**
```env
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_YOUR_LIVE_KEY
STRIPE_SECRET_KEY=sk_live_YOUR_LIVE_KEY
NEXT_PUBLIC_BASE_URL=https://strk-tournaments.vercel.app
```

### **Redeploy:**
```bash
# Vercel will automatically redeploy with new env vars
# Or manually trigger: vercel --prod
```

---

## 💰 **Pricing & Fees**

### **Stripe India Pricing:**

| Payment Method | Fee | Example (₹500) |
|----------------|-----|----------------|
| **Indian Cards** | 2.9% + ₹2 | ₹16.50 |
| **UPI** | 2% | ₹10 |
| **Wallets** | 2.9% + ₹2 | ₹16.50 |
| **International Cards** | 3.4% + ₹2 | ₹19 |

### **No Setup Fees:**
- ✅ Free account
- ✅ No monthly charges
- ✅ Only pay per transaction

---

## 🎯 **Payment Flow Explanation**

### **How It Works:**

```
1. User clicks "Pay Now" on your site
   ↓
2. Your frontend calls /api/create-stripe-checkout
   ↓
3. Backend creates Stripe checkout session
   ↓
4. User redirects to Stripe-hosted payment page
   ↓
5. User enters card/UPI details on Stripe
   ↓
6. Payment processed securely by Stripe
   ↓
7. User redirects back to your success page
   ↓
8. You verify payment and complete registration
```

### **Why This Flow?**

- ✅ **Secure:** Payment details never touch your server
- ✅ **PCI Compliant:** Stripe handles all compliance
- ✅ **Mobile Optimized:** Works on all devices
- ✅ **Multi-currency:** Supports INR, USD, and 135+ currencies

---

## 🔒 **Security Best Practices**

### **DO:**
✅ Keep secret key on backend only (in API routes)
✅ Use environment variables
✅ Verify payments on backend
✅ Use HTTPS in production
✅ Enable webhook signatures
✅ Log all transactions

### **DON'T:**
❌ Put secret key in frontend code
❌ Commit .env file to Git
❌ Trust frontend payment status
❌ Skip payment verification
❌ Use test keys in production

---

## 🐛 **Troubleshooting**

### **"Stripe failed to initialize"**
**Solution:** Check that `VITE_STRIPE_PUBLISHABLE_KEY` is set correctly in .env

### **"Invalid API Key"**
**Solution:** 
- Make sure key starts with `pk_test_` (test) or `pk_live_` (live)
- No spaces or quotes in .env file
- Restart dev server after changing .env

### **"Checkout session creation failed"**
**Solution:**
- Check `STRIPE_SECRET_KEY` is set in backend
- Verify amount is in smallest unit (paise/cents)
- Check API endpoint is accessible

### **Payment Success but Registration Failed**
**Solution:**
- Implement proper webhook handling
- Verify payment before completing registration
- Check backend logs for errors

### **UPI Not Showing**
**Solution:**
- UPI only works in live mode after KYC
- Test mode only shows cards
- Enable payment methods in Dashboard settings

---

## 📊 **Dashboard Features**

### **Monitor Payments:**
- **Payments:** See all transactions
- **Customers:** Manage customer list
- **Reports:** Download financial reports
- **Balance:** Check available balance
- **Payouts:** Automatic transfers to bank

### **Useful Pages:**
- **Disputes:** Handle chargebacks
- **Radar:** Fraud detection
- **Logs:** API request logs
- **Webhooks:** Event notifications

---

## 🔔 **Webhooks (Optional but Recommended)**

### **Why Use Webhooks?**
- Get notified when payment succeeds
- Handle failed payments
- Automatic order fulfillment
- Better reliability

### **Setup:**
1. Dashboard → Developers → Webhooks
2. Click **"Add endpoint"**
3. Enter URL: `https://your-site.vercel.app/api/stripe-webhook`
4. Select events: `checkout.session.completed`
5. Copy webhook signing secret
6. Add to env: `STRIPE_WEBHOOK_SECRET=whsec_...`

---

## ✅ **Go-Live Checklist**

Before accepting real payments:

- [ ] KYC submitted and approved
- [ ] Live API keys obtained
- [ ] Environment variables updated (Vercel)
- [ ] Test with small amount (₹10)
- [ ] Verify payment shows in Dashboard
- [ ] Check payout schedule (default: 7 days)
- [ ] Add bank account for payouts
- [ ] Enable Indian payment methods
- [ ] Test on mobile devices
- [ ] Set up webhooks (optional)
- [ ] Enable email receipts
- [ ] Add business details in settings

---

## 📞 **Support & Resources**

### **Stripe Support:**
- **Dashboard:** https://dashboard.stripe.com/
- **Docs:** https://stripe.com/docs
- **Support:** https://support.stripe.com/
- **API Reference:** https://stripe.com/docs/api

### **Community:**
- Discord: https://discord.gg/stripe
- Stack Overflow: Tag `stripe-payments`
- GitHub: https://github.com/stripe

### **Your Project Files:**
- Payment Service: `src/services/paymentService.js`
- API Endpoint: `api/create-stripe-checkout.js`
- Config: `src/config/payment.js`

---

## 🎉 **You're All Set!**

**Current Status:**
✅ Stripe configured as primary payment gateway
✅ Test mode ready (works immediately)
✅ Support for INR and USD
✅ Support for cards, UPI, wallets
✅ Individual account (no business needed)

**Next Steps:**
1. Create Stripe account (5 min)
2. Get test keys (instant)
3. Add to .env file
4. Test with test cards
5. Submit KYC (10 min)
6. Wait 1-3 days for approval
7. Get live keys
8. Accept real payments!

---

**Total time to start testing: 10 minutes**
**Total time to accept real money: 1-3 days**

Good luck with your tournament! 🚀🎮
