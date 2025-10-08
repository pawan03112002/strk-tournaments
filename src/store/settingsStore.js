import { create } from 'zustand'
import { persist } from 'zustand/middleware'

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

      // Admin Credentials
      adminPassword: 'STRK@Tournament#2025!Secure', // Default password - CHANGE THIS!
      adminEmail: 'strk.tournaments@gmail.com', // For password recovery

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

      // Change admin password
      changeAdminPassword: (newPassword) => {
        set({ adminPassword: newPassword })
        return { success: true, message: 'Password changed successfully!' }
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

      // Reset admin password (forgot password)
      resetAdminPassword: (email, newPassword) => {
        const state = useSettingsStore.getState()
        if (email === state.adminEmail) {
          set({ adminPassword: newPassword })
          return { success: true, message: 'Password reset successfully!' }
        }
        return { success: false, message: 'Email does not match admin email!' }
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
