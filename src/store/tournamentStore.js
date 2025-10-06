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
        const currentNumber = get().lastTeamNumber + 1
        const teamNumber = currentNumber.toString().padStart(4, '0')
        
        const newTeam = {
          ...teamData,
          teamNumber: `Team ${teamNumber}`,
          teamId: currentNumber,
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
          lastTeamNumber: currentNumber
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
          if (!team || !team.firestoreId) return
          
          await updateDoc(doc(db, 'teams', team.firestoreId), {
            stage: newStage,
            updatedAt: new Date().toISOString()
          })
          
          set((state) => ({
            registeredTeams: state.registeredTeams.map((team) =>
              team.teamId === teamId ? { ...team, stage: newStage } : team
            ),
          }))
        } catch (error) {
          console.error('Error updating team stage:', error)
          throw error
        }
      },

      // Delete a specific team
      deleteTeam: async (teamId) => {
        try {
          const team = get().registeredTeams.find(t => t.teamId === teamId)
          if (!team || !team.firestoreId) return
          
          await deleteDoc(doc(db, 'teams', team.firestoreId))
          
          set((state) => ({
            registeredTeams: state.registeredTeams.filter((team) => team.teamId !== teamId)
          }))
        } catch (error) {
          console.error('Error deleting team:', error)
          throw error
        }
      },

      // Update team details
      updateTeamDetails: async (teamId, updates) => {
        try {
          const team = get().registeredTeams.find(t => t.teamId === teamId)
          if (!team || !team.firestoreId) return
          
          await updateDoc(doc(db, 'teams', team.firestoreId), {
            ...updates,
            updatedAt: new Date().toISOString()
          })
          
          set((state) => ({
            registeredTeams: state.registeredTeams.map((team) =>
              team.teamId === teamId ? { ...team, ...updates } : team
            ),
          }))
        } catch (error) {
          console.error('Error updating team details:', error)
          throw error
        }
      },

      // Bulk update stages
      bulkUpdateStages: async (teamIds, newStage) => {
        try {
          const teams = get().registeredTeams.filter(t => teamIds.includes(t.teamId))
          
          await Promise.all(teams.map(team => 
            team.firestoreId && updateDoc(doc(db, 'teams', team.firestoreId), {
              stage: newStage,
              updatedAt: new Date().toISOString()
            })
          ))
          
          set((state) => ({
            registeredTeams: state.registeredTeams.map((team) =>
              teamIds.includes(team.teamId) ? { ...team, stage: newStage } : team
            ),
          }))
        } catch (error) {
          console.error('Error bulk updating stages:', error)
          throw error
        }
      },

      // Bulk delete teams
      bulkDeleteTeams: async (teamIds) => {
        try {
          const teams = get().registeredTeams.filter(t => teamIds.includes(t.teamId))
          
          await Promise.all(teams.map(team => 
            team.firestoreId && deleteDoc(doc(db, 'teams', team.firestoreId))
          ))
          
          set((state) => ({
            registeredTeams: state.registeredTeams.filter((team) => !teamIds.includes(team.teamId))
          }))
        } catch (error) {
          console.error('Error bulk deleting teams:', error)
          throw error
        }
      },

      // Clear all data (for testing)
      clearAllTeams: async () => {
        try {
          const teams = get().registeredTeams
          
          await Promise.all(teams.map(team =>
            team.firestoreId && deleteDoc(doc(db, 'teams', team.firestoreId))
          ))
          
          set({ registeredTeams: [], lastTeamNumber: 0 })
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
