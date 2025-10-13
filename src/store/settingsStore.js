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

// Helper functions to get Firebase document references (lazy initialization to avoid db access before init)
const getAdminSettingsRef = () => {
  return db ? doc(db, 'adminSettings', 'credentials') : null
}

const getWebsiteSettingsRef = () => {
  return db ? doc(db, 'websiteSettings', 'config') : null
}

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

      // Payment Settings
      paymentSettings: {
        upiId: 'yourname@paytm',
        upiQrCodeUrl: '/upi-qr-code.png',
        bankAccountName: 'Your Name',
        bankAccountNumber: '1234567890',
        bankIfsc: 'SBIN0001234',
        bankName: 'State Bank of India',
        bankBranch: 'Main Branch'
      },

      // Load all settings from Firebase
      loadSettings: async () => {
        try {
          const websiteSettingsRef = getWebsiteSettingsRef()
          if (!websiteSettingsRef) {
            console.warn('Firebase not configured, using local settings')
            return { success: false, message: 'Firebase not configured' }
          }

          const docSnap = await getDoc(websiteSettingsRef)
          if (docSnap.exists()) {
            const data = docSnap.data()
            console.log('✅ Settings loaded from Firebase:', data)
            set({
              socialMedia: data.socialMedia || useSettingsStore.getState().socialMedia,
              support: data.support || useSettingsStore.getState().support,
              tournamentSettings: data.tournamentSettings || useSettingsStore.getState().tournamentSettings,
              paymentSettings: data.paymentSettings || useSettingsStore.getState().paymentSettings
            })
            return { success: true, message: 'Settings loaded from Firebase' }
          } else {
            // Document doesn't exist yet - keep default values, don't create document
            // Admin needs to click "Save Settings" to create it
            console.warn('⚠️ No settings found in Firebase - using defaults. Admin needs to configure and save settings.')
            return { success: false, message: 'No settings configured yet - using defaults' }
          }
        } catch (error) {
          console.error('Error loading settings:', error)
          return { success: false, error: error.message }
        }
      },

      // Save all settings to Firebase
      saveSettings: async () => {
        try {
          const websiteSettingsRef = getWebsiteSettingsRef()
          if (!websiteSettingsRef) {
            return { success: false, message: 'Firebase not configured' }
          }

          const state = useSettingsStore.getState()
          await setDoc(websiteSettingsRef, {
            socialMedia: state.socialMedia,
            support: state.support,
            tournamentSettings: state.tournamentSettings,
            paymentSettings: state.paymentSettings,
            lastModified: new Date().toISOString()
          })

          return { success: true, message: 'Settings saved to Firebase' }
        } catch (error) {
          console.error('Error saving settings:', error)
          return { success: false, error: error.message }
        }
      },

      // Update social media
      updateSocialMedia: async (platform, data) => {
        set((state) => ({
          socialMedia: {
            ...state.socialMedia,
            [platform]: { ...state.socialMedia[platform], ...data }
          }
        }))
        // Save to Firebase
        return await useSettingsStore.getState().saveSettings()
      },

      // Update support contact
      updateSupport: async (type, data) => {
        set((state) => ({
          support: {
            ...state.support,
            [type]: { ...state.support[type], ...data }
          }
        }))
        // Save to Firebase
        return await useSettingsStore.getState().saveSettings()
      },

      // Load admin credentials - using default password (no Firebase dependency)
      loadAdminCredentials: async () => {
        try {
          // Use default password - no Firestore access needed
          const defaultPassword = 'STRK@Tournament#2025!Secure'
          set({ 
            adminPassword: defaultPassword,
            adminEmail: 'strk.tournaments@gmail.com',
            isAdminLoaded: true 
          })
          return { success: true, message: 'Admin credentials loaded' }
        } catch (error) {
          console.error('Error loading admin credentials:', error)
          // Fallback to default password
          const defaultPassword = 'STRK@Tournament#2025!Secure'
          set({ 
            adminPassword: defaultPassword,
            adminEmail: 'strk.tournaments@gmail.com',
            isAdminLoaded: true 
          })
          return { success: false, error: error.message }
        }
      },

      // Change admin password (now saves to Firebase)
      changeAdminPassword: async (newPassword) => {
        try {
          set({ adminPassword: newPassword })
          
          const adminSettingsRef = getAdminSettingsRef()
          // Only save to Firebase if available
          if (!adminSettingsRef) {
            return { success: true, message: 'Password changed locally (Firebase not configured)' }
          }
          
          const encrypted = encryptPassword(newPassword)
          await setDoc(adminSettingsRef, {
            encryptedPassword: encrypted,
            adminEmail: useSettingsStore.getState().adminEmail,
            lastModified: new Date().toISOString()
          }, { merge: true })
          
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
            set({ adminPassword: newPassword })
            
            const adminSettingsRef = getAdminSettingsRef()
            // Only save to Firebase if available
            if (!adminSettingsRef) {
              return { success: true, message: 'Password reset locally (Firebase not configured)' }
            }
            
            const encrypted = encryptPassword(newPassword)
            await setDoc(adminSettingsRef, {
              encryptedPassword: encrypted,
              adminEmail: state.adminEmail,
              lastModified: new Date().toISOString()
            }, { merge: true })
            
            return { success: true, message: 'Password reset successfully and synced!' }
          }
          return { success: false, message: 'Email does not match admin email!' }
        } catch (error) {
          console.error('Error resetting password:', error)
          return { success: false, message: 'Failed to reset password: ' + error.message }
        }
      },

      // Update tournament settings
      updateTournamentSettings: async (newSettings) => {
        set((state) => ({
          tournamentSettings: {
            ...state.tournamentSettings,
            ...newSettings
          }
        }))
        // Save to Firebase
        return await useSettingsStore.getState().saveSettings()
      },

      // Update payment settings
      updatePaymentSettings: async (newSettings) => {
        set((state) => ({
          paymentSettings: {
            ...state.paymentSettings,
            ...newSettings
          }
        }))
        // Save to Firebase
        return await useSettingsStore.getState().saveSettings()
      }
    }),
    {
      name: 'settings-storage',
      partialize: (state) => ({
        // Only persist adminEmail locally, all other settings come from Firebase
        adminEmail: state.adminEmail,
        // adminPassword is NOT persisted to localStorage, only loaded from Firebase
        // socialMedia, support, tournamentSettings, paymentSettings are loaded from Firebase
      })
    }
  )
)

export default useSettingsStore
