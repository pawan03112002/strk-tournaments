# 🚀 Production Setup Guide - STRK Tournaments

This guide will help you set up your tournament website for production with real authentication and payment processing.

---

## 📋 Table of Contents
1. [Firebase Setup (Authentication & Database)](#firebase-setup)
2. [Razorpay Setup (Indian Payments)](#razorpay-setup)
3. [Stripe Setup (International Payments)](#stripe-setup)
4. [Environment Variables](#environment-variables)
5. [Deployment to Vercel](#deployment)
6. [Testing](#testing)
7. [Going Live](#going-live)

---

## 🔥 Firebase Setup

### Step 1: Create Firebase Project
1. Go to https://console.firebase.google.com
2. Click **"Add Project"**
3. Enter project name: `STRK-Tournaments`
4. **Disable** Google Analytics (not needed)
5. Click **"Create Project"**

### Step 2: Get Firebase Configuration
1. In Firebase Console, click **⚙️ Settings → Project Settings**
2. Scroll down to **"Your apps"** section
3. Click **"Web"** icon `</>`
4. Register app name: `STRK Tournaments Web`
5. **Copy** the `firebaseConfig` values

### Step 3: Enable Authentication
1. In Firebase Console, click **"Authentication"**
2. Click **"Get Started"**
3. Click **"Email/Password"** → Enable both options
4. Click **"Save"**

### Step 4: Create Firestore Database
1. In Firebase Console, click **"Firestore Database"**
2. Click **"Create Database"**
3. Choose **"Start in test mode"** (we'll secure it later)
4. Select location: **asia-south1 (Mumbai)** for India
5. Click **"Enable"**

### Step 5: Set Up Security Rules
In Firestore, go to **"Rules"** tab and paste:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Teams collection
    match /teams/{teamId} {
      // Anyone can read teams (for public viewing)
      allow read: if true;
      // Only authenticated users can create teams
      allow create: if request.auth != null;
      // Only team owner or admin can update
      allow update: if request.auth != null;
      // Only admin can delete
      allow delete: if request.auth != null;
    }
  }
}
```

Click **"Publish"**

---

## 💳 Razorpay Setup (For Indian Payments - ₹500)

### Step 1: Create Razorpay Account
1. Go to https://dashboard.razorpay.com/signup
2. Enter business details:
   - Business name: `STRK Tournaments`
   - Email & Phone
   - PAN Card
   - Bank Account details

### Step 2: Get API Keys
1. Go to https://dashboard.razorpay.com/app/keys
2. **Test Mode:**
   - Key ID: starts with `rzp_test_`
   - Key Secret: Click **"Generate Secret"**
3. Copy both keys

### Step 3: Set Up Webhook (Optional)
1. Go to **Settings → Webhooks**
2. Add webhook URL: `https://your-domain.vercel.app/api/razorpay-webhook`
3. Select events: `payment.captured`, `payment.failed`

**Important:** Start with TEST MODE. Switch to LIVE MODE only after successful testing.

---

## 💰 Stripe Setup (For International Payments - $7)

### Step 1: Create Stripe Account
1. Go to https://dashboard.stripe.com/register
2. Enter business details
3. Complete verification (may take 1-2 days)

### Step 2: Get API Keys
1. Go to https://dashboard.stripe.com/apikeys
2. **Test Mode** (toggle on top right):
   - Publishable key: starts with `pk_test_`
   - Secret key: Click **"Reveal test key"** starts with `sk_test_`
3. Copy both keys

### Step 3: Enable Payment Methods
1. Go to **Settings → Payment methods**
2. Enable: Cards, UPI (if available), Wallets

---

## 🔐 Environment Variables

### Step 1: Create .env File
In your project root, create a file named `.env`:

```bash
# Copy from .env.example
cp .env.example .env
```

### Step 2: Fill in Your Keys
Edit `.env` file with your actual keys:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXX
VITE_FIREBASE_AUTH_DOMAIN=strk-tournaments.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=strk-tournaments
VITE_FIREBASE_STORAGE_BUCKET=strk-tournaments.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:xxxxxxxxxxxxx

# Razorpay (Test Mode)
VITE_RAZORPAY_KEY_ID=rzp_test_XXXXXXXXXXXXXXX
VITE_RAZORPAY_KEY_SECRET=XXXXXXXXXXXXXXXXXXXXXXXX

# Stripe (Test Mode)
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
VITE_STRIPE_SECRET_KEY=sk_test_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

# Admin Panel Password
VITE_ADMIN_PASSWORD=your_secure_admin_password_here
```

**⚠️ IMPORTANT:** Never commit `.env` file to Git! It's already in `.gitignore`.

---

## 🚀 Deployment to Vercel

### Step 1: Push to GitHub
```bash
git add .
git commit -m "Production ready with Firebase and payment integration"
git push origin main
```

### Step 2: Deploy on Vercel
1. Go to https://vercel.com/new
2. Import your GitHub repository
3. Click **"Deploy"**
4. Wait 2-3 minutes

### Step 3: Add Environment Variables on Vercel
1. Go to your project in Vercel
2. Click **"Settings" → "Environment Variables"**
3. Add ALL variables from your `.env` file:
   - Variable name: `VITE_FIREBASE_API_KEY`
   - Value: `AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXX`
   - Click **"Add"**
4. Repeat for ALL variables
5. Click **"Redeploy"** after adding variables

---

## 🧪 Testing

### Test Authentication
1. Go to your website
2. Click **"Register"**
3. Create account with email/password
4. Verify you can login
5. Check Firebase Console → Authentication → Users (should see new user)

### Test Razorpay Payment (Indian Users)
1. Login to your website
2. Go to **"Tournament Registration"**
3. Fill form, select **INR** currency
4. Click **"Proceed to Payment"**
5. Use Razorpay test cards:
   - Card: `4111 1111 1111 1111`
   - CVV: Any 3 digits
   - Expiry: Any future date
6. Complete payment
7. Check Firestore → teams collection (should see new team)
8. Check Razorpay Dashboard → Payments (should see test payment)

### Test Stripe Payment (International Users)
1. Same as above but select **USD** currency
2. Use Stripe test cards:
   - Success: `4242 4242 4242 4242`
   - Decline: `4000 0000 0000 0002`

### Test Admin Panel
1. Go to `/admin`
2. Enter admin password
3. Verify you can see all registered teams
4. Test upgrading/downgrading teams
5. Test editing team details
6. Test bulk actions

---

## ✅ Going Live Checklist

### Before Going Live:

- [ ] All Firebase rules are secured
- [ ] Test payments completed successfully
- [ ] Admin panel password changed from default
- [ ] All environment variables set on Vercel
- [ ] Website tested on mobile & desktop
- [ ] Payment confirmation emails working (if set up)

### Switch to Production Mode:

#### Razorpay:
1. Complete KYC verification
2. Go to Dashboard → Settings → API Keys
3. Switch to **LIVE MODE**
4. Generate new LIVE keys
5. Update `.env` on Vercel with LIVE keys
6. Redeploy

#### Stripe:
1. Complete account verification
2. Go to Dashboard → API Keys
3. Switch to **LIVE MODE**
4. Copy LIVE keys
5. Update `.env` on Vercel with LIVE keys
6. Redeploy

#### Firebase:
1. Update Firestore rules for production
2. Set up Firebase Authentication email templates
3. Enable email verification (optional)

---

## 📊 Monitoring

### Check Registrations:
- **Firebase Console** → Firestore → teams collection
- **Admin Panel** → `/admin`

### Check Payments:
- **Razorpay Dashboard** → Payments
- **Stripe Dashboard** → Payments

### Check Users:
- **Firebase Console** → Authentication → Users

---

## 🆘 Troubleshooting

### Payment not working?
- Check browser console for errors
- Verify environment variables on Vercel
- Ensure payment gateway is in TEST mode initially
- Check Razorpay/Stripe dashboard for failed payments

### Firebase authentication errors?
- Verify Firebase config in `.env`
- Check if Email/Password is enabled in Firebase Console
- Clear browser cache and try again

### Teams not showing in pyramid?
- Check Firestore rules allow reading teams
- Verify teams are being saved to Firestore
- Check browser console for errors

---

## 💰 Pricing Summary

### What You Pay:
- **Firebase:** FREE (up to 50k reads/day, 20k writes/day)
- **Vercel:** FREE (hobby plan)
- **Razorpay:** 2% per transaction (₹10 per ₹500 registration)
- **Stripe:** 2.9% + $0.30 per transaction (~$0.50 per $7 registration)

### Example Costs:
- 100 teams (INR): Revenue ₹50,000 - Fees ₹1,000 = **₹49,000**
- 100 teams (USD): Revenue $700 - Fees ~$50 = **$650**

---

## 📞 Support

### Payment Issues:
- **Razorpay:** support@razorpay.com
- **Stripe:** https://support.stripe.com

### Firebase Issues:
- **Docs:** https://firebase.google.com/docs
- **Support:** https://firebase.google.com/support

### Vercel Issues:
- **Docs:** https://vercel.com/docs
- **Support:** https://vercel.com/support

---

## 🎉 You're Production Ready!

Your tournament website is now ready to accept real registrations and payments!

**Next Steps:**
1. Complete testing with test keys
2. Submit for payment gateway approval (if needed)
3. Switch to live keys
4. Announce your tournament!
5. Monitor registrations via admin panel

**Good Luck with Your Tournament! 🏆**
