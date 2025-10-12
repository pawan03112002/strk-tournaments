import { create } from 'zustand'
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
  onAuthStateChanged,
  sendPasswordResetEmail,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential
} from 'firebase/auth'
import { doc, setDoc, getDoc, updateDoc, collection, getDocs } from 'firebase/firestore'
import { auth, db } from '../config/firebase'

// Check if Firebase is available
const isFirebaseAvailable = () => auth !== null && db !== null

const useAuthStore = create((set, get) => ({
  user: null,
  users: [],
  loading: true,
  error: null,
  
  // Initialize auth state listener
  initializeAuth: () => {
    // Check localStorage first
    const savedUser = localStorage.getItem('currentUser')
    if (savedUser) {
      set({ user: JSON.parse(savedUser), loading: false })
    }
    
    // If Firebase is not available, just use localStorage
    if (!isFirebaseAvailable()) {
      set({ loading: false })
      return () => {} // Return empty cleanup function
    }
    
    try {
      const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
        if (firebaseUser) {
          // Fetch additional user data from Firestore
          let userData = {}
          try {
            const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid))
            userData = userDoc.exists() ? userDoc.data() : {}
          } catch (e) {
            console.warn('Firestore read failed:', e)
          }
          
          const user = {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName || userData.username,
            ...userData
          }
          
          localStorage.setItem('currentUser', JSON.stringify(user))
          set({ user, loading: false })
        } else {
          localStorage.removeItem('currentUser')
          set({ user: null, loading: false })
        }
      })
      
      return unsubscribe
    } catch (error) {
      console.error('Auth initialization error:', error)
      set({ loading: false })
      return () => {}
    }
  },
  
  // Register new user
  register: async (email, password, username) => {
    try {
      set({ loading: true, error: null })
      
      // If Firebase is not available, use localStorage
      if (!isFirebaseAvailable()) {
        // Check if user already exists in localStorage
        const existingUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]')
        if (existingUsers.find(u => u.email === email)) {
          throw new Error('Email already registered')
        }
        
        const user = {
          uid: Date.now().toString(),
          email,
          displayName: username,
          username,
          avatar: '👤',
          role: 'user',
          password, // In real app, this should be hashed
          createdAt: new Date().toISOString()
        }
        
        existingUsers.push(user)
        localStorage.setItem('registeredUsers', JSON.stringify(existingUsers))
        localStorage.setItem('currentUser', JSON.stringify(user))
        
        set({ user, loading: false })
        return { success: true }
      }
      
      // Create Firebase auth user
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredential.user
      
      // Update display name
      await updateProfile(user, { displayName: username })
      
      // Try to create user document in Firestore (but don't fail if it doesn't work)
      try {
        await setDoc(doc(db, 'users', user.uid), {
          username,
          email,
          createdAt: new Date().toISOString(),
          avatar: '👤',
          role: 'user'
        })
      } catch (firestoreError) {
        console.warn('Firestore write failed (non-critical):', firestoreError)
      }
      
      const userData = {
        uid: user.uid,
        email: user.email,
        displayName: username,
        username,
        avatar: '👤',
        role: 'user'
      }
      
      localStorage.setItem('currentUser', JSON.stringify(userData))
      set({ user: userData, loading: false })
      
      return { success: true }
    } catch (error) {
      set({ error: error.message, loading: false })
      return { success: false, error: error.message }
    }
  },
  
  // Login existing user
  login: async (email, password) => {
    try {
      set({ loading: true, error: null })
      
      // If Firebase is not available, use localStorage
      if (!isFirebaseAvailable()) {
        const existingUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]')
        const user = existingUsers.find(u => u.email === email && u.password === password)
        
        if (!user) {
          throw new Error('Invalid email or password')
        }
        
        const userData = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          username: user.username,
          avatar: user.avatar || '👤',
          role: user.role || 'user'
        }
        
        localStorage.setItem('currentUser', JSON.stringify(userData))
        set({ user: userData, loading: false })
        return { success: true }
      }
      
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      const user = userCredential.user
      
      // Try to fetch user data from Firestore (but don't fail if it doesn't work)
      let userData = {}
      try {
        const userDoc = await getDoc(doc(db, 'users', user.uid))
        userData = userDoc.exists() ? userDoc.data() : {}
      } catch (firestoreError) {
        console.warn('Firestore read failed (non-critical):', firestoreError)
      }
      
      const finalUserData = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || email.split('@')[0],
        username: user.displayName || email.split('@')[0],
        avatar: '👤',
        ...userData
      }
      
      localStorage.setItem('currentUser', JSON.stringify(finalUserData))
      set({ user: finalUserData, loading: false })
      
      return { success: true }
    } catch (error) {
      set({ error: error.message, loading: false })
      return { success: false, error: error.message }
    }
  },
  
  // Logout user
  logout: async () => {
    try {
      if (isFirebaseAvailable()) {
        await signOut(auth)
      }
      localStorage.removeItem('currentUser')
      set({ user: null, error: null })
      return { success: true }
    } catch (error) {
      set({ error: error.message })
      return { success: false, error: error.message }
    }
  },
  
  // Update user profile
  updateUser: async (updates) => {
    try {
      const currentUser = get().user
      if (!currentUser) throw new Error('No user logged in')
      
      // Update Firestore document
      await updateDoc(doc(db, 'users', currentUser.uid), {
        ...updates,
        updatedAt: new Date().toISOString()
      })
      
      // Update display name in Firebase Auth if username changed
      if (updates.username) {
        await updateProfile(auth.currentUser, { displayName: updates.username })
      }
      
      set({ 
        user: {
          ...currentUser,
          ...updates
        }
      })
      
      return { success: true }
    } catch (error) {
      set({ error: error.message })
      return { success: false, error: error.message }
    }
  },

  // Send password reset email using Firebase
  sendPasswordReset: async (email) => {
    try {
      await sendPasswordResetEmail(auth, email)
      return { success: true }
    } catch (error) {
      console.error('Password reset error:', error)
      return { success: false, error: error.message }
    }
  },

  // Update user password (after OTP verification - stores in Firestore for later)
  updateUserPassword: async (email, newPassword) => {
    try {
      // Store the verified password reset request
      const usersSnapshot = await getDocs(collection(db, 'users'))
      const userDoc = usersSnapshot.docs.find(doc => doc.data().email === email)
      
      if (userDoc) {
        await updateDoc(doc(db, 'users', userDoc.id), {
          pendingPasswordReset: {
            newPassword: newPassword,
            verified: true,
            timestamp: new Date().toISOString(),
            expiresAt: new Date(Date.now() + 15 * 60 * 1000).toISOString() // 15 min expiry
          }
        })
      }
      
      return { success: true }
    } catch (error) {
      console.error('Error storing password reset:', error)
      return { success: false, error: error.message }
    }
  },

  // Fetch all users (for duplicate check)
  fetchUsers: async () => {
    try {
      const usersSnapshot = await getDocs(collection(db, 'users'))
      const users = usersSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      set({ users })
    } catch (error) {
      console.error('Error fetching users:', error)
    }
  },
}))

export default useAuthStore
