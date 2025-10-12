import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc,
  query,
  where,
  orderBy
} from 'firebase/firestore'
import { db } from '../config/firebase'

const useTournamentStore = create(
  persist(
    (set, get) => ({
      registeredTeams: [],
      lastTeamNumber: 0,
      loading: false,

      // Fetch all teams from Firestore
      fetchTeams: async () => {
        try {
          set({ loading: true })
          
          // If Firebase is not available, use local storage only
          if (!db) {
            console.log('Firebase not available, using local storage')
            set({ loading: false })
            return
          }
          
          const teamsSnapshot = await getDocs(collection(db, 'teams'))
          const teams = teamsSnapshot.docs.map(doc => ({
            firestoreId: doc.id,
            ...doc.data()
          }))
          
          const maxTeamId = teams.reduce((max, team) => Math.max(max, team.teamId || 0), 0)
          
          set({ 
            registeredTeams: teams,
            lastTeamNumber: maxTeamId,
            loading: false 
          })
        } catch (error) {
          console.error('Error fetching teams:', error)
          set({ loading: false })
        }
      },

      // Register a new team after successful payment
      registerTeam: async (teamData) => {
        // Find first available team number (reuses deleted team numbers)
        const existingTeams = get().registeredTeams
        const usedNumbers = existingTeams.map(team => team.teamId).sort((a, b) => a - b)
        
        // Find first gap in team numbers
        let teamId = 1
        for (let i = 0; i < usedNumbers.length; i++) {
          if (usedNumbers[i] !== teamId) {
            break // Found a gap
          }
          teamId++
        }
        
        const teamNumber = teamId.toString().padStart(4, '0')
        
        const newTeam = {
          ...teamData,
          teamNumber: `Team ${teamNumber}`,
          teamId: teamId,
          registeredAt: new Date().toISOString(),
          paymentStatus: 'completed',
          stage: 'enrolled' // Initial stage
        }

        let teamWithId = { ...newTeam }

        // Try to save to Firestore (non-critical for now)
        try {
          const docRef = await addDoc(collection(db, 'teams'), newTeam)
          teamWithId.firestoreId = docRef.id
          console.log('Team saved to Firestore:', docRef.id)
        } catch (firestoreError) {
          console.warn('Firestore save failed (team saved locally):', firestoreError)
          // Continue anyway - team is saved in local state
        }

        // Always update local state
        set((state) => ({
          registeredTeams: [...state.registeredTeams, teamWithId],
          lastTeamNumber: Math.max(teamId, state.lastTeamNumber)
        }))

        return teamWithId
      },

      // Get team by ID
      getTeamById: (teamId) => {
        return get().registeredTeams.find((team) => team.teamId === teamId)
      },

      // Get team by user email
      getTeamByEmail: (email) => {
        return get().registeredTeams.find((team) => team.contactEmail === email)
      },

      // Get all teams
      getAllTeams: () => {
        return get().registeredTeams
      },

      // Get total registered teams count
      getTotalTeams: () => {
        return get().registeredTeams.length
      },

      // Update team stage (for tournament progression)
      updateTeamStage: async (teamId, newStage) => {
        try {
          const team = get().registeredTeams.find(t => t.teamId === teamId)
          if (!team) return
          
          // Update local state first
          set((state) => ({
            registeredTeams: state.registeredTeams.map((team) =>
              team.teamId === teamId ? { ...team, stage: newStage } : team
            ),
          }))
          
          // Update in Firebase if available
          if (db && team.firestoreId) {
            await updateDoc(doc(db, 'teams', team.firestoreId), {
              stage: newStage,
              updatedAt: new Date().toISOString()
            })
          }
        } catch (error) {
          console.error('Error updating team stage:', error)
          throw error
        }
      },

      // Delete a specific team
      deleteTeam: async (teamId) => {
        try {
          const team = get().registeredTeams.find(t => t.teamId === teamId)
          if (!team) return
          
          // Update local state first
          set((state) => ({
            registeredTeams: state.registeredTeams.filter((team) => team.teamId !== teamId)
          }))
          
          // Delete from Firebase if available
          if (db && team.firestoreId) {
            await deleteDoc(doc(db, 'teams', team.firestoreId))
          }
        } catch (error) {
          console.error('Error deleting team:', error)
          throw error
        }
      },

      // Update team details
      updateTeamDetails: async (teamId, updates) => {
        try {
          const team = get().registeredTeams.find(t => t.teamId === teamId)
          if (!team) return
          
          // Update local state first
          set((state) => ({
            registeredTeams: state.registeredTeams.map((team) =>
              team.teamId === teamId ? { ...team, ...updates } : team
            ),
          }))
          
          // Update in Firebase if available
          if (db && team.firestoreId) {
            await updateDoc(doc(db, 'teams', team.firestoreId), {
              ...updates,
              updatedAt: new Date().toISOString()
            })
          }
        } catch (error) {
          console.error('Error updating team details:', error)
          throw error
        }
      },

      // Bulk update stages
      bulkUpdateStages: async (teamIds, newStage) => {
        try {
          // Update local state first
          set((state) => ({
            registeredTeams: state.registeredTeams.map((team) =>
              teamIds.includes(team.teamId) ? { ...team, stage: newStage } : team
            ),
          }))
          
          // Update in Firebase if available
          if (db) {
            const teams = get().registeredTeams.filter(t => teamIds.includes(t.teamId))
            await Promise.all(teams.map(team => 
              team.firestoreId && updateDoc(doc(db, 'teams', team.firestoreId), {
                stage: newStage,
                updatedAt: new Date().toISOString()
              })
            ))
          }
        } catch (error) {
          console.error('Error bulk updating stages:', error)
          throw error
        }
      },

      // Bulk delete teams
      bulkDeleteTeams: async (teamIds) => {
        try {
          // Update local state first
          set((state) => ({
            registeredTeams: state.registeredTeams.filter((team) => !teamIds.includes(team.teamId))
          }))
          
          // Delete from Firebase if available
          if (db) {
            const teams = get().registeredTeams.filter(t => teamIds.includes(t.teamId))
            await Promise.all(teams.map(team => 
              team.firestoreId && deleteDoc(doc(db, 'teams', team.firestoreId))
            ))
          }
        } catch (error) {
          console.error('Error bulk deleting teams:', error)
          throw error
        }
      },

      // Clear all data (for testing)
      clearAllTeams: async () => {
        try {
          // Clear local state first
          set({ registeredTeams: [], lastTeamNumber: 0 })
          
          // Clear Firebase if available
          if (db) {
            const teams = get().registeredTeams
            await Promise.all(teams.map(team =>
              team.firestoreId && deleteDoc(doc(db, 'teams', team.firestoreId))
            ))
          }
        } catch (error) {
          console.error('Error clearing teams:', error)
          throw error
        }
      }
    }),
    {
      name: 'tournament-storage',
    }
  )
)

export default useTournamentStore
