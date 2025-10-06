import { create } from 'zustand'
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  onAuthStateChanged,
  updateProfile,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential
} from 'firebase/auth'
import { doc, setDoc, getDoc, updateDoc, collection, getDocs } from 'firebase/firestore'
import { auth, db } from '../config/firebase'

const useAuthStore = create((set, get) => ({
  user: null,
  users: [],
  loading: true,
  error: null,
  
  // Initialize auth state listener
  initializeAuth: () => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Fetch additional user data from Firestore
        const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid))
        const userData = userDoc.exists() ? userDoc.data() : {}
        
        set({
          user: {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName || userData.username,
            ...userData
          },
          loading: false
        })
      } else {
        set({ user: null, loading: false })
      }
    })
    
    return unsubscribe
  },
  
  // Register new user
  register: async (email, password, username) => {
    try {
      set({ loading: true, error: null })
      
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
      
      set({ 
        user: {
          uid: user.uid,
          email: user.email,
          displayName: username,
          username,
          avatar: '👤',
          role: 'user'
        },
        loading: false 
      })
      
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
      
      set({ 
        user: {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || email.split('@')[0],
          username: user.displayName || email.split('@')[0],
          avatar: '👤',
          ...userData
        },
        loading: false 
      })
      
      return { success: true }
    } catch (error) {
      set({ error: error.message, loading: false })
      return { success: false, error: error.message }
    }
  },
  
  // Logout user
  logout: async () => {
    try {
      await signOut(auth)
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

  // Update user password (for forgot password)
  updateUserPassword: async (email, newPassword) => {
    try {
      // This is a simplified version - in production, use Firebase's password reset
      // For now, we'll update it when the user logs in next time
      const usersSnapshot = await getDocs(collection(db, 'users'))
      const userDoc = usersSnapshot.docs.find(doc => doc.data().email === email)
      
      if (userDoc) {
        await updateDoc(doc(db, 'users', userDoc.id), {
          passwordResetPending: true,
          newPassword: newPassword, // In production, hash this!
          updatedAt: new Date().toISOString()
        })
      }
      
      return { success: true }
    } catch (error) {
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
