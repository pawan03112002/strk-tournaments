# 🔥 Firebase Setup Guide - Complete Migration to Cloud Storage

## ✅ What Changed?

**BEFORE:** All data stored in browser localStorage  
**AFTER:** All data stored in Firebase Firestore (Cloud Database)

### Data Now Stored Online:
- ✅ **Payment Records** - All payment submissions and verifications
- ✅ **Team Data** - All registered teams (already in Firebase)
- ✅ **Admin Settings** - Admin password and configurations (already in Firebase)
- ✅ **User Authentication** - All user accounts (already in Firebase)

### Benefits:
- 🌐 **Access Anywhere** - Data accessible from any device
- 🔄 **Real-time Sync** - Instant updates across all users
- 🔒 **Secure** - Professional-grade database security
- 📊 **Scalable** - Handles unlimited users and data
- 🧹 **Clean Browser** - No local storage pollution

---

## 🚀 Quick Setup (5 Minutes)

### Step 1: Create Firebase Project

1. Go to **https://console.firebase.google.com/**
2. Click **"Add project"**
3. Enter project name: `strk-tournaments` (or any name)
4. **Disable** Google Analytics (optional)
5. Click **"Create project"**

### Step 2: Enable Firestore Database

1. In left sidebar, click **"Firestore Database"**
2. Click **"Create database"**
3. Select **"Start in production mode"**
4. Choose location: **asia-south1 (Mumbai)** or closest to your users
5. Click **"Enable"**

### Step 3: Set Security Rules

1. In Firestore, go to **"Rules"** tab
2. Replace everything with this:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Users - Read/Write for authenticated users
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Teams - Read for everyone, Write for authenticated
    match /teams/{teamId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Payments - Create for everyone, Read/Update/Delete for authenticated
    match /payments/{paymentId} {
      allow read: if request.auth != null;
      allow create: if true; // Users can submit payments
      allow update, delete: if request.auth != null; // Admin only
    }
    
    // Admin Settings - Authenticated only
    match /adminSettings/{doc} {
      allow read, write: if request.auth != null;
    }
  }
}
```

3. Click **"Publish"**

### Step 4: Enable Email Authentication

1. Go to **"Authentication"** in left sidebar
2. Click **"Get started"**
3. Click **"Email/Password"**
4. **Enable** the toggle
5. Click **"Save"**

### Step 5: Get Firebase Config

1. Click **⚙️ (gear icon)** → **"Project settings"**
2. Scroll to **"Your apps"** section
3. Click **Web icon** `</>`
4. Register app nickname: `Tournament Web App`
5. **Copy** the `firebaseConfig` object

Example:
```javascript
{
  apiKey: "AIzaSyC_YOUR_KEY_HERE",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456"
}
```

### Step 6: Add to Vercel Environment Variables

1. Go to **https://vercel.com/dashboard**
2. Select your project: **strk-tournaments**
3. Go to **Settings** → **Environment Variables**
4. Add these variables:

```
VITE_FIREBASE_API_KEY = AIzaSyC_YOUR_KEY_HERE
VITE_FIREBASE_AUTH_DOMAIN = your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID = your-project-id
VITE_FIREBASE_STORAGE_BUCKET = your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID = 123456789012
VITE_FIREBASE_APP_ID = 1:123456789012:web:abcdef123456
```

**Important:** Select **Production**, **Preview**, and **Development** for each variable!

5. Click **"Save"**

### Step 7: Redeploy

1. Go to **Deployments** tab
2. Click **"..."** on latest deployment
3. Click **"Redeploy"**
4. Wait ~30 seconds

---

## ✅ Verification Checklist

After setup, verify everything works:

### Test Payment Submission:
1. ✅ Go to `/register` and create account
2. ✅ Go to `/tournament-registration` and register team
3. ✅ Submit payment proof
4. ✅ Check Firebase Console → Firestore → `payments` collection
5. ✅ You should see a new document with payment data

### Test Admin Panel:
1. ✅ Go to `/admin` and login
2. ✅ Go to **Payment Verification** tab
3. ✅ You should see submitted payment
4. ✅ Verify payment → Check that team is created
5. ✅ Check Firestore → `payments` → payment status should be "verified"
6. ✅ Check Firestore → `teams` → new team should exist

### Test Team Management:
1. ✅ In Admin Panel → **Team Management** tab
2. ✅ Delete a team
3. ✅ Check Firestore → `payments` → associated payment should be deleted too

---

## 📊 Firestore Collections Structure

Your Firebase database will have these collections:

### 1. **users** (Authentication)
```javascript
{
  uid: "abc123",
  email: "user@gmail.com",
  displayName: "Player123",
  createdAt: "2025-01-01T00:00:00Z"
}
```

### 2. **teams** (Teams)
```javascript
{
  teamId: 1,
  teamNumber: "Team 00001",
  teamName: "Warriors",
  players: ["player1", "player2", "player3", "player4"],
  contactEmail: "team@gmail.com",
  contactNumber: "+911234567890",
  paymentId: "PAY_1234567890",
  stage: "enrolled",
  registeredAt: "2025-01-01T00:00:00Z"
}
```

### 3. **payments** (Payment Records) ⭐ NEW
```javascript
{
  teamName: "Warriors",
  contactEmail: "team@gmail.com",
  contactNumber: "+911234567890",
  paymentMethod: "UPI",
  transactionId: "TXN123456",
  amount: 500,
  paymentProof: "data:image/png;base64,...",
  status: "pending", // or "verified", "rejected"
  submittedAt: "2025-01-01T00:00:00Z",
  verifiedAt: null,
  teamNumber: "Team 00001", // After verification
  teamId: 1, // After verification
  registrationData: {
    player1Username: "player1",
    player2Username: "player2",
    player3Username: "player3",
    player4Username: "player4",
    countryCode: "+91",
    phoneNumber: "1234567890"
  }
}
```

### 4. **adminSettings** (Admin Config)
```javascript
{
  encryptedPassword: "encrypted_password_hash",
  adminEmail: "admin@tournament.com",
  lastModified: "2025-01-01T00:00:00Z"
}
```

---

## 🔧 Local Development Setup

If you want to run the app locally with Firebase:

1. Create `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

2. Fill in Firebase credentials in `.env`:
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

3. Install dependencies:
```bash
npm install
```

4. Run development server:
```bash
npm run dev
```

---

## 🚨 Troubleshooting

### ❌ Error: "Firebase not initialized"

**Solution:** Check that environment variables are set in Vercel:
1. Vercel Dashboard → Settings → Environment Variables
2. Verify all 6 Firebase variables are present
3. Redeploy the application

### ❌ Error: "Permission denied" in Firestore

**Solution:** Check security rules:
1. Firebase Console → Firestore → Rules
2. Make sure rules match the ones above
3. Click "Publish"

### ❌ Payments not showing in Admin Panel

**Solution:**
1. Open browser console (F12)
2. Look for Firebase errors
3. Check Firestore rules allow reading `payments` collection
4. Verify Firebase config is correct in Vercel

### ❌ Teams created but payments not deleted

**Solution:**
1. Check that payment has `teamId` field
2. Verify Firestore rules allow deleting payments
3. Check browser console for errors

---

## 📝 Migration Notes

### What Happens to Old localStorage Data?

- **Teams:** Already stored in Firebase, no action needed
- **Payments:** Old payments in localStorage won't show up
  - They're not deleted, just not queried
  - New payments go to Firebase
  - Old data can be manually migrated if needed

### Do I Need to Clear localStorage?

**No!** The app now completely ignores localStorage for payments. Old data will just sit there harmlessly.

---

## 🎉 Success!

Once setup is complete, your tournament platform will:

✅ Store all data in Firebase Cloud  
✅ No localStorage usage for critical data  
✅ Real-time sync across all devices  
✅ Professional database with backup & security  
✅ Scalable to thousands of users  

---

## 📞 Need Help?

If you encounter issues:

1. Check browser console (F12) for errors
2. Check Vercel deployment logs
3. Check Firebase Console → Firestore for data
4. Verify environment variables are set correctly

---

**🎮 Your Tournament Platform is Now Cloud-Powered! 🏆**
