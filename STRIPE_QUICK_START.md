# ⚡ Stripe Quick Start - 10 Minutes to Testing

## 🎯 Get Started in 3 Steps

---

## Step 1: Create Stripe Account (5 min)

### **Sign Up:**
1. Go to: **https://stripe.com/**
2. Click **"Start now"**
3. Enter email and password
4. Choose **"Individual"** (no business needed!)
5. Select **India**
6. Verify email

✅ **Done! Account created.**

---

## Step 2: Get Test Keys (Instant)

### **In Stripe Dashboard:**
1. Login to: https://dashboard.stripe.com/
2. Click **Developers** → **API keys**
3. Copy these keys:

**Publishable Key:**
```
pk_test_51Abc123...xyz
```

**Secret Key:** (Click "Reveal test key token")
```
sk_test_51Abc123...xyz
```

✅ **Done! You have test keys.**

---

## Step 3: Add Keys to Project (2 min)

### **Create .env file in project root:**

```env
# Stripe Test Keys
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_KEY_HERE
STRIPE_SECRET_KEY=sk_test_YOUR_KEY_HERE

# Base URL
NEXT_PUBLIC_BASE_URL=http://localhost:5173

# Keep existing Firebase and EmailJS keys...
```

### **Install Dependencies:**

```bash
npm install
```

### **Start Dev Server:**

```bash
npm run dev
```

✅ **Done! Ready to test.**

---

## 🧪 Test Payment NOW

### **Use Test Card:**

**Card Number:** `4242 4242 4242 4242`
**Expiry:** Any future date (e.g., 12/25)
**CVV:** Any 3 digits (e.g., 123)
**Name:** Any name
**Address:** Any address

### **Test Flow:**

1. Go to: http://localhost:5173/tournament-registration
2. Fill the registration form
3. Click **"Pay Now"**
4. Enter test card details
5. Click **"Pay"**
6. See payment success!

### **Check Dashboard:**

- Go to: https://dashboard.stripe.com/test/payments
- See your test payment!

✅ **It works! You can accept test payments now.**

---

## 🚀 Go Live (Optional - Takes 1-3 Days)

### **When you're ready for real money:**

1. **Submit KYC:**
   - Dashboard → Settings → Account details
   - Upload PAN card
   - Upload Aadhaar card
   - Add bank account
   - Submit

2. **Wait for Approval:** (1-3 business days)

3. **Get Live Keys:**
   - Dashboard → Toggle "View live data"
   - Developers → API keys
   - Copy live keys (pk_live_ and sk_live_)

4. **Update .env:**
   ```env
   VITE_STRIPE_PUBLISHABLE_KEY=pk_live_YOUR_LIVE_KEY
   STRIPE_SECRET_KEY=sk_live_YOUR_LIVE_KEY
   ```

5. **Accept Real Money!** 💰

---

## 📋 Summary

**What You Have Now:**
- ✅ Stripe test mode working
- ✅ Can accept test payments immediately
- ✅ Supports cards, UPI (live), wallets (live)
- ✅ Works for Indian (INR) and International (USD) payments
- ✅ No business registration needed

**Timeline:**
- ⚡ Testing: **10 minutes** (NOW)
- ⏱️ Live payments: **1-3 days** (after KYC)

**Fees:**
- 2% for UPI
- 2.9% + ₹2 for cards

---

## ❓ Need Help?

**Read the full guide:** `STRIPE_SETUP_GUIDE.md`

**Common Issues:**

**Q: "Stripe failed to initialize"**
A: Check your publishable key in .env file

**Q: "Test payment not working"**
A: Use card `4242 4242 4242 4242` with any future date

**Q: "How to accept real money?"**
A: Submit KYC in Dashboard → Settings

**Q: "Do I need GST?"**
A: No, individual account works without GST

---

## 🎉 You're Ready!

Start accepting test payments now!
Submit KYC for live payments when ready.

**Happy coding!** 🚀
