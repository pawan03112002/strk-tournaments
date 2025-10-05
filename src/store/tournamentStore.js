import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useTournamentStore = create(
  persist(
    (set, get) => ({
      registeredTeams: [],
      lastTeamNumber: 0,

      // Register a new team after successful payment
      registerTeam: (teamData) => {
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

        set((state) => ({
          registeredTeams: [...state.registeredTeams, newTeam],
          lastTeamNumber: currentNumber
        }))

        return newTeam
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
      updateTeamStage: (teamId, newStage) => {
        set((state) => ({
          registeredTeams: state.registeredTeams.map((team) =>
            team.teamId === teamId ? { ...team, stage: newStage } : team
          ),
        }))
      },

      // Delete a specific team
      deleteTeam: (teamId) => {
        set((state) => ({
          registeredTeams: state.registeredTeams.filter((team) => team.teamId !== teamId)
        }))
      },

      // Update team details
      updateTeamDetails: (teamId, updates) => {
        set((state) => ({
          registeredTeams: state.registeredTeams.map((team) =>
            team.teamId === teamId ? { ...team, ...updates } : team
          ),
        }))
      },

      // Bulk update stages
      bulkUpdateStages: (teamIds, newStage) => {
        set((state) => ({
          registeredTeams: state.registeredTeams.map((team) =>
            teamIds.includes(team.teamId) ? { ...team, stage: newStage } : team
          ),
        }))
      },

      // Bulk delete teams
      bulkDeleteTeams: (teamIds) => {
        set((state) => ({
          registeredTeams: state.registeredTeams.filter((team) => !teamIds.includes(team.teamId))
        }))
      },

      // Clear all data (for testing)
      clearAllTeams: () => {
        set({ registeredTeams: [], lastTeamNumber: 0 })
      }
    }),
    {
      name: 'tournament-storage',
    }
  )
)

export default useTournamentStore
