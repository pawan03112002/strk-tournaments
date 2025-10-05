import { create } from 'zustand'
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth'
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore'
import { auth, db } from '../config/firebase'

const useAuthStore = create((set, get) => ({
  user: null,
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
      
      // Create user document in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        username,
        email,
        createdAt: new Date().toISOString(),
        avatar: '👤',
        role: 'user'
      })
      
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
      
      // Fetch user data from Firestore
      const userDoc = await getDoc(doc(db, 'users', user.uid))
      const userData = userDoc.exists() ? userDoc.data() : {}
      
      set({ 
        user: {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
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
}))

export default useAuthStore
