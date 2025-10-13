import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

// Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDummy_Key_Replace_This",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "tournament-app.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "tournament-app",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "tournament-app.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "123456789",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:123456789:web:abc123"
}

// Debug: Log config (REMOVE IN PRODUCTION)
console.log('🔧 Firebase Config:', {
  projectId: firebaseConfig.projectId,
  authDomain: firebaseConfig.authDomain,
  hasApiKey: !!firebaseConfig.apiKey && firebaseConfig.apiKey !== 'AIzaSyDummy_Key_Replace_This'
})

// Initialize Firebase
let app = null
let auth = null
let db = null
let storage = null

try {
  app = initializeApp(firebaseConfig)
  auth = getAuth(app)
  db = getFirestore(app)
  storage = getStorage(app)
  console.log('✅ Firebase initialized successfully')
} catch (error) {
  console.error('❌ Firebase initialization error:', error)
  console.warn('📝 Add Firebase credentials to .env file or Vercel environment variables')
}

export { auth, db, storage }
export default app
