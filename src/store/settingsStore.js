import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { db } from '../config/firebase'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import CryptoJS from 'crypto-js'

// Encryption key (in production, store this in environment variables)
const ENCRYPTION_KEY = 'STRK_ADMIN_SECURE_KEY_2025'

// Helper functions for password encryption
const encryptPassword = (password) => {
  return CryptoJS.AES.encrypt(password, ENCRYPTION_KEY).toString()
}

const decryptPassword = (encryptedPassword) => {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedPassword, ENCRYPTION_KEY)
    return bytes.toString(CryptoJS.enc.Utf8)
  } catch (error) {
    return null
  }
}

// Firebase admin settings document reference
const adminSettingsRef = doc(db, 'adminSettings', 'credentials')

const useSettingsStore = create(
  persist(
    (set) => ({
      // Social Media Links
      socialMedia: {
        facebook: { enabled: false, url: '' },
        twitter: { enabled: false, url: '' },
        instagram: { enabled: false, url: '' },
        discord: { enabled: false, url: '' },
        youtube: { enabled: false, url: '' },
        whatsapp: { enabled: false, number: '' }
      },

      // Support Contact
      support: {
        email: { enabled: false, address: '' },
        phone: { enabled: false, number: '' }
      },

      // Admin Credentials (now stored in Firebase, but keep defaults)
      adminPassword: null, // Will be loaded from Firebase
      adminEmail: 'strk.tournaments@gmail.com', // For password recovery
      isAdminLoaded: false, // Track if admin data is loaded from Firebase

      // Tournament Settings
      tournamentSettings: {
        registrationFee: 500, // in rupees
        maxTeams: 100,
        currency: 'INR'
      },

      // Update social media
      updateSocialMedia: (platform, data) => {
        set((state) => ({
          socialMedia: {
            ...state.socialMedia,
            [platform]: { ...state.socialMedia[platform], ...data }
          }
        }))
      },

      // Update support contact
      updateSupport: (type, data) => {
        set((state) => ({
          support: {
            ...state.support,
            [type]: { ...state.support[type], ...data }
          }
        }))
      },

      // Load admin credentials from Firebase
      loadAdminCredentials: async () => {
        try {
          const docSnap = await getDoc(adminSettingsRef)
          if (docSnap.exists()) {
            const data = docSnap.data()
            const decrypted = decryptPassword(data.encryptedPassword)
            set({ 
              adminPassword: decrypted,
              adminEmail: data.adminEmail || 'strk.tournaments@gmail.com',
              isAdminLoaded: true 
            })
            return { success: true }
          } else {
            // Initialize with default password on first load
            const defaultPassword = 'STRK@Tournament#2025!Secure'
            const encrypted = encryptPassword(defaultPassword)
            await setDoc(adminSettingsRef, {
              encryptedPassword: encrypted,
              adminEmail: 'strk.tournaments@gmail.com',
              createdAt: new Date().toISOString(),
              lastModified: new Date().toISOString()
            })
            set({ 
              adminPassword: defaultPassword,
              isAdminLoaded: true 
            })
            return { success: true, message: 'Initialized with default password' }
          }
        } catch (error) {
          console.error('Error loading admin credentials:', error)
          return { success: false, error: error.message }
        }
      },

      // Change admin password (now saves to Firebase)
      changeAdminPassword: async (newPassword) => {
        try {
          const encrypted = encryptPassword(newPassword)
          await setDoc(adminSettingsRef, {
            encryptedPassword: encrypted,
            adminEmail: useSettingsStore.getState().adminEmail,
            lastModified: new Date().toISOString()
          }, { merge: true })
          
          set({ adminPassword: newPassword })
          return { success: true, message: 'Password changed successfully and synced!' }
        } catch (error) {
          console.error('Error changing password:', error)
          return { success: false, message: 'Failed to change password: ' + error.message }
        }
      },

      // Update admin email
      updateAdminEmail: (newEmail) => {
        set({ adminEmail: newEmail })
        return { success: true, message: 'Admin email updated!' }
      },

      // Verify admin password
      verifyAdminPassword: (password) => {
        return password === useSettingsStore.getState().adminPassword
      },

      // Reset admin password (forgot password) - now saves to Firebase
      resetAdminPassword: async (email, newPassword) => {
        try {
          const state = useSettingsStore.getState()
          if (email === state.adminEmail) {
            const encrypted = encryptPassword(newPassword)
            await setDoc(adminSettingsRef, {
              encryptedPassword: encrypted,
              adminEmail: state.adminEmail,
              lastModified: new Date().toISOString()
            }, { merge: true })
            
            set({ adminPassword: newPassword })
            return { success: true, message: 'Password reset successfully and synced!' }
          }
          return { success: false, message: 'Email does not match admin email!' }
        } catch (error) {
          console.error('Error resetting password:', error)
          return { success: false, message: 'Failed to reset password: ' + error.message }
        }
      },

      // Update tournament settings
      updateTournamentSettings: (newSettings) => {
        set((state) => ({
          tournamentSettings: {
            ...state.tournamentSettings,
            ...newSettings
          }
        }))
        return { success: true, message: 'Tournament settings updated!' }
      }
    }),
    {
      name: 'settings-storage',
    }
  )
)

export default useSettingsStore
