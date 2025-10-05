import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Users, Mail, Phone, Trophy, Download, Search, Filter, Calendar, Shield, ChevronRight, Crown, Target, Medal, Edit2, Trash2, CheckSquare, X, Save, ArrowUpCircle, ChevronLeft, Undo2, Settings, Lock, Facebook, Twitter, Instagram, MessageCircle, Youtube, Eye, EyeOff } from 'lucide-react'
import useTournamentStore from '../store/tournamentStore'
import useSettingsStore from '../store/settingsStore'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const AdminPanel = () => {
  const navigate = useNavigate()
  const { 
    registeredTeams, 
    getTotalTeams, 
    clearAllTeams, 
    updateTeamStage,
    deleteTeam,
    updateTeamDetails,
    bulkUpdateStages,
    bulkDeleteTeams
  } = useTournamentStore()
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStage, setFilterStage] = useState('all')
  const [selectedTeams, setSelectedTeams] = useState([])
  const [editingTeam, setEditingTeam] = useState(null)
  const [editForm, setEditForm] = useState({})
  const [sortBy, setSortBy] = useState('newest')
  const [activeTab, setActiveTab] = useState('teams') // teams, settings, security
  
  // Settings store
  const {
    socialMedia,
    support,
    updateSocialMedia,
    updateSupport,
    changeAdminPassword,
    updateAdminEmail,
    adminEmail,
    resetAdminPassword
  } = useSettingsStore()

  // Settings form states
  const [settingsForm, setSettingsForm] = useState({
    facebook: socialMedia.facebook,
    twitter: socialMedia.twitter,
    instagram: socialMedia.instagram,
    discord: socialMedia.discord,
    youtube: socialMedia.youtube,
    whatsapp: socialMedia.whatsapp,
    supportEmail: support.email,
    supportPhone: support.phone
  })

  // Security form states
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPasswords, setShowPasswords] = useState(false)
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('')
  const [resetNewPassword, setResetNewPassword] = useState('')
  const [showForgotPassword, setShowForgotPassword] = useState(false)

  // Stage progression order
  const stageProgression = {
    enrolled: { next: 'quarterFinals', prev: null, label: 'Quarter Finals', icon: Target },
    quarterFinals: { next: 'semiFinals', prev: 'enrolled', label: 'Semi Finals', icon: Medal },
    semiFinals: { next: 'finals', prev: 'quarterFinals', label: 'Finals', icon: Trophy },
    finals: { next: 'champion', prev: 'semiFinals', label: 'Champion', icon: Crown },
    champion: { next: null, prev: 'finals', label: 'Winner', icon: Crown }
  }

  // Handle stage upgrade
  const handleUpgradeStage = (teamId, currentStage, teamNumber) => {
    const nextStageInfo = stageProgression[currentStage]
    
    if (!nextStageInfo.next) {
      toast.error('Team is already a champion!')
      return
    }

    if (window.confirm(`Upgrade ${teamNumber} to ${nextStageInfo.label}?`)) {
      updateTeamStage(teamId, nextStageInfo.next)
      toast.success(`${teamNumber} upgraded to ${nextStageInfo.label}!`)
    }
  }

  // Handle stage downgrade (undo mistake)
  const handleDowngradeStage = (teamId, currentStage, teamNumber) => {
    const prevStageInfo = stageProgression[currentStage]
    
    if (!prevStageInfo.prev) {
      toast.error('Team is already at the lowest stage!')
      return
    }

    const prevStageName = prevStageInfo.prev === 'enrolled' ? 'Enrolled' :
                          prevStageInfo.prev === 'quarterFinals' ? 'Quarter Finals' :
                          prevStageInfo.prev === 'semiFinals' ? 'Semi Finals' :
                          prevStageInfo.prev === 'finals' ? 'Finals' : ''

    if (window.confirm(`Downgrade ${teamNumber} back to ${prevStageName}? This will undo the previous upgrade.`)) {
      updateTeamStage(teamId, prevStageInfo.prev)
      toast.success(`${teamNumber} downgraded to ${prevStageName}!`)
    }
  }

  // Handle delete team
  const handleDeleteTeam = (teamId, teamNumber) => {
    if (window.confirm(`Are you sure you want to DELETE ${teamNumber}? This cannot be undone!`)) {
      deleteTeam(teamId)
      toast.success(`${teamNumber} has been deleted.`)
    }
  }

  // Handle edit team
  const handleEditTeam = (team) => {
    setEditingTeam(team.teamId)
    setEditForm({
      teamName: team.teamName,
      contactEmail: team.contactEmail,
      contactNumber: team.contactNumber,
      players: [...team.players]
    })
  }

  const handleSaveEdit = (teamId) => {
    updateTeamDetails(teamId, editForm)
    setEditingTeam(null)
    toast.success('Team details updated!')
  }

  const handleCancelEdit = () => {
    setEditingTeam(null)
    setEditForm({})
  }

  // Bulk selection
  const handleSelectTeam = (teamId) => {
    setSelectedTeams(prev => 
      prev.includes(teamId) 
        ? prev.filter(id => id !== teamId)
        : [...prev, teamId]
    )
  }

  const handleSelectAll = () => {
    if (selectedTeams.length === filteredTeams.length) {
      setSelectedTeams([])
    } else {
      setSelectedTeams(filteredTeams.map(t => t.teamId))
    }
  }

  // Settings handlers
  const handleSaveSettings = () => {
    // Save all social media settings
    Object.keys(settingsForm).forEach(key => {
      if (['facebook', 'twitter', 'instagram', 'discord', 'youtube', 'whatsapp'].includes(key)) {
        updateSocialMedia(key, settingsForm[key])
      } else if (key === 'supportEmail') {
        updateSupport('email', settingsForm[key])
      } else if (key === 'supportPhone') {
        updateSupport('phone', settingsForm[key])
      }
    })
    toast.success('Settings saved successfully!')
  }

  const handleUpdateSettingsForm = (platform, field, value) => {
    setSettingsForm(prev => ({
      ...prev,
      [platform]: {
        ...prev[platform],
        [field]: value
      }
    }))
  }

  // Change password handler
  const handleChangePassword = (e) => {
    e.preventDefault()
    
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error('Please fill in all fields!')
      return
    }

    if (newPassword !== confirmPassword) {
      toast.error('New passwords do not match!')
      return
    }

    if (newPassword.length < 6) {
      toast.error('Password must be at least 6 characters!')
      return
    }

    const { verifyAdminPassword } = useSettingsStore.getState()
    if (!verifyAdminPassword(currentPassword)) {
      toast.error('Current password is incorrect!')
      return
    }

    const result = changeAdminPassword(newPassword)
    if (result.success) {
      toast.success('Password changed successfully!')
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
    }
  }

  // Forgot password handler
  const handleForgotPassword = (e) => {
    e.preventDefault()
    
    if (!forgotPasswordEmail || !resetNewPassword) {
      toast.error('Please fill in all fields!')
      return
    }

    if (resetNewPassword.length < 6) {
      toast.error('Password must be at least 6 characters!')
      return
    }

    const result = resetAdminPassword(forgotPasswordEmail, resetNewPassword)
    if (result.success) {
      toast.success('Password reset successfully!')
      setForgotPasswordEmail('')
      setResetNewPassword('')
      setShowForgotPassword(false)
    } else {
      toast.error(result.message)
    }
  }

  // Bulk actions
  const handleBulkUpgrade = (stage) => {
    if (selectedTeams.length === 0) {
      toast.error('No teams selected!')
      return
    }
    
    const stageName = stage === 'enrolled' ? 'Enrolled' :
                      stage === 'quarterFinals' ? 'Quarter Finals' :
                      stage === 'semiFinals' ? 'Semi Finals' :
                      stage === 'finals' ? 'Finals' :
                      stage === 'champion' ? 'Champion' : stage
    
    if (window.confirm(`Change ${selectedTeams.length} teams to ${stageName}?`)) {
      bulkUpdateStages(selectedTeams, stage)
      setSelectedTeams([])
      toast.success(`${selectedTeams.length} teams moved to ${stageName}!`)
    }
  }

  const handleBulkDelete = () => {
    if (selectedTeams.length === 0) {
      toast.error('No teams selected!')
      return
    }
    if (window.confirm(`DELETE ${selectedTeams.length} teams? This cannot be undone!`)) {
      bulkDeleteTeams(selectedTeams)
      setSelectedTeams([])
      toast.success(`${selectedTeams.length} teams deleted.`)
    }
  }

  // Simple admin authentication check (you can enhance this later)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const ADMIN_PASSWORD = 'admin123' // Change this to your secure password

  const handleLogin = (e) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
    } else {
      alert('Invalid password!')
    }
  }

  // Filter and sort teams
  const filteredTeams = registeredTeams
    .filter(team => {
      const matchesSearch = 
        team.teamName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        team.teamNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        team.contactEmail.toLowerCase().includes(searchQuery.toLowerCase())
      
      const matchesStage = filterStage === 'all' || team.stage === filterStage
      
      return matchesSearch && matchesStage
    })
    .sort((a, b) => {
      switch(sortBy) {
        case 'newest':
          return new Date(b.registeredAt) - new Date(a.registeredAt)
        case 'oldest':
          return new Date(a.registeredAt) - new Date(b.registeredAt)
        case 'teamName':
          return a.teamName.localeCompare(b.teamName)
        case 'teamNumber':
          return a.teamId - b.teamId
        default:
          return 0
      }
    })

  // Export to CSV
  const exportToCSV = () => {
    const headers = ['Team Number', 'Team Name', 'Player 1', 'Player 2', 'Player 3', 'Player 4', 'Contact Email', 'Contact Number', 'Payment Amount', 'Stage', 'Registration Date']
    
    const rows = registeredTeams.map(team => [
      team.teamNumber,
      team.teamName,
      team.players[0],
      team.players[1],
      team.players[2],
      team.players[3],
      team.contactEmail,
      team.contactNumber,
      team.amount,
      team.stage,
      new Date(team.registeredAt).toLocaleString()
    ])

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `tournament-registrations-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
  }

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="card max-w-md w-full"
        >
          <div className="text-center mb-6">
            <Shield className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-white mb-2">Admin Panel</h1>
            <p className="text-gray-400">Enter password to access</p>
          </div>

          <form onSubmit={handleLogin}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              className="input-field mb-4"
              autoFocus
            />
            <button type="submit" className="btn-primary w-full">
              Login
            </button>
          </form>

          <button
            onClick={() => navigate('/')}
            className="text-gray-400 hover:text-white transition-colors text-sm mt-4 w-full"
          >
            ← Back to Home
          </button>
        </motion.div>
      </div>
    )
  }

  // Admin Dashboard
  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto mt-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Admin Panel</h1>
              <p className="text-gray-400">Manage tournament registrations</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={exportToCSV}
                className="btn-secondary flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Export CSV
              </button>
              <button
                onClick={() => setIsAuthenticated(false)}
                className="btn-secondary"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="card mb-8">
            <div className="flex gap-2 border-b border-gray-700">
              <button
                onClick={() => setActiveTab('teams')}
                className={`px-6 py-3 font-bold transition-colors relative ${
                  activeTab === 'teams'
                    ? 'text-red-500'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Users className="w-5 h-5 inline mr-2" />
                Teams Management
                {activeTab === 'teams' && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-500"
                  />
                )}
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`px-6 py-3 font-bold transition-colors relative ${
                  activeTab === 'settings'
                    ? 'text-red-500'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Settings className="w-5 h-5 inline mr-2" />
                Website Settings
                {activeTab === 'settings' && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-500"
                  />
                )}
              </button>
              <button
                onClick={() => setActiveTab('security')}
                className={`px-6 py-3 font-bold transition-colors relative ${
                  activeTab === 'security'
                    ? 'text-red-500'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Lock className="w-5 h-5 inline mr-2" />
                Security
                {activeTab === 'security' && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-500"
                  />
                )}
              </button>
            </div>
          </div>

          {/* Stats */}
          {activeTab === 'teams' && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="card text-center">
              <div className="text-3xl font-bold text-orange-500 mb-2">
                {getTotalTeams()}
              </div>
              <p className="text-gray-400 text-sm">Total Registered Teams</p>
            </div>
            <div className="card text-center">
              <div className="text-3xl font-bold text-green-500 mb-2">
                {registeredTeams.filter(t => t.stage === 'enrolled').length}
              </div>
              <p className="text-gray-400 text-sm">Enrolled</p>
            </div>
            <div className="card text-center">
              <div className="text-3xl font-bold text-blue-500 mb-2">
                {getTotalTeams() * 4}
              </div>
              <p className="text-gray-400 text-sm">Total Players</p>
            </div>
            <div className="card text-center">
              <div className="text-3xl font-bold text-yellow-500 mb-2">
                ₹{getTotalTeams() * 500}
              </div>
              <p className="text-gray-400 text-sm">Total Revenue (INR)</p>
            </div>
          </div>
          )}

          {/* Bulk Actions Bar */}
          {activeTab === 'teams' && (
          <AnimatePresence>
            {selectedTeams.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="card bg-blue-500/10 border-2 border-blue-500/50 mb-6"
              >
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <CheckSquare className="w-5 h-5 text-blue-500" />
                    <span className="text-white font-bold">
                      {selectedTeams.length} team{selectedTeams.length > 1 ? 's' : ''} selected
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    <select
                      onChange={(e) => e.target.value && handleBulkUpgrade(e.target.value)}
                      className="bg-gray-800 text-white px-4 py-2 rounded-lg text-sm border border-gray-700"
                      defaultValue=""
                    >
                      <option value="">Bulk Change Stage to...</option>
                      <option value="enrolled">⬇️ Enrolled (Downgrade)</option>
                      <option value="quarterFinals">Quarter Finals</option>
                      <option value="semiFinals">Semi Finals</option>
                      <option value="finals">Finals</option>
                      <option value="champion">🏆 Champion</option>
                    </select>
                    
                    <button
                      onClick={handleBulkDelete}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors flex items-center gap-2"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete Selected
                    </button>
                    
                    <button
                      onClick={() => setSelectedTeams([])}
                      className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors"
                    >
                      Clear Selection
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          )}

          {/* Filters */}
          {activeTab === 'teams' && (
          <div className="card mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Select All */}
              <button
                onClick={handleSelectAll}
                className="btn-secondary flex items-center gap-2"
              >
                <CheckSquare className="w-4 h-4" />
                {selectedTeams.length === filteredTeams.length ? 'Deselect All' : 'Select All'}
              </button>

              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by team name, number, or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input-field pl-12 w-full"
                />
              </div>

              {/* Sort By */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="input-field"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="teamName">Team Name (A-Z)</option>
                <option value="teamNumber">Team Number</option>
              </select>

              {/* Stage Filter */}
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                  value={filterStage}
                  onChange={(e) => setFilterStage(e.target.value)}
                  className="input-field pl-12 pr-8"
                >
                  <option value="all">All Stages</option>
                  <option value="enrolled">Enrolled</option>
                  <option value="quarterFinals">Quarter Finals</option>
                  <option value="semiFinals">Semi Finals</option>
                  <option value="finals">Finals</option>
                  <option value="champion">Champion</option>
                </select>
              </div>
            </div>
          </div>
          )}

          {/* Teams List */}
          {activeTab === 'teams' && (
          <div className="space-y-4">
            {filteredTeams.length === 0 ? (
              <div className="card text-center py-12">
                <Users className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400">No registrations found</p>
              </div>
            ) : (
              filteredTeams.map((team, index) => (
                <motion.div
                  key={team.teamId}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`card hover:border-red-500/50 transition-colors ${
                    selectedTeams.includes(team.teamId) ? 'border-blue-500 bg-blue-500/5' : ''
                  }`}
                >
                  <div className="flex flex-col gap-6">
                    {/* Selection Checkbox & Actions */}
                    <div className="flex items-center justify-between pb-4 border-b border-gray-700">
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={selectedTeams.includes(team.teamId)}
                          onChange={() => handleSelectTeam(team.teamId)}
                          className="w-5 h-5 rounded border-gray-600 text-blue-500 focus:ring-blue-500 focus:ring-offset-gray-900"
                        />
                        <span className="text-gray-400 text-sm">Select for bulk actions</span>
                      </div>
                      
                      {editingTeam !== team.teamId && (
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEditTeam(team)}
                            className="flex items-center gap-2 px-3 py-1 bg-blue-500/20 hover:bg-blue-500/30 text-blue-500 rounded-lg text-sm font-bold transition-colors"
                          >
                            <Edit2 className="w-4 h-4" />
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteTeam(team.teamId, team.teamNumber)}
                            className="flex items-center gap-2 px-3 py-1 bg-red-500/20 hover:bg-red-500/30 text-red-500 rounded-lg text-sm font-bold transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                    {/* Team Info */}
                    <div className="flex flex-col lg:flex-row gap-6">
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <h3 className="text-2xl font-bold text-white mb-1">
                              {team.teamNumber}
                            </h3>
                            {editingTeam === team.teamId ? (
                              <input
                                type="text"
                                value={editForm.teamName}
                                onChange={(e) => setEditForm({...editForm, teamName: e.target.value})}
                                className="input-field text-xl font-bold"
                              />
                            ) : (
                              <p className="text-xl text-orange-500 font-bold">
                                {team.teamName}
                              </p>
                            )}
                          </div>
                          <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                            team.stage === 'enrolled' ? 'bg-green-500/20 text-green-500' :
                            team.stage === 'quarterFinals' ? 'bg-blue-500/20 text-blue-500' :
                            team.stage === 'semiFinals' ? 'bg-purple-500/20 text-purple-500' :
                            team.stage === 'finals' ? 'bg-yellow-500/20 text-yellow-500' :
                            'bg-orange-500/20 text-orange-500'
                          }`}>
                            {team.stage === 'enrolled' ? 'ENROLLED' :
                             team.stage === 'quarterFinals' ? 'QUARTER FINALS' :
                             team.stage === 'semiFinals' ? 'SEMI FINALS' :
                             team.stage === 'finals' ? 'FINALS' :
                             'CHAMPION'}
                          </div>
                        </div>

                        {/* Players */}
                        <div className="bg-gray-800/50 rounded-lg p-4 mb-4">
                          <h4 className="text-white font-bold mb-3 flex items-center gap-2">
                            <Users className="w-4 h-4" />
                            Squad Members
                          </h4>
                          <div className="grid grid-cols-2 gap-2">
                            {editingTeam === team.teamId ? (
                              editForm.players.map((player, idx) => (
                                <input
                                  key={idx}
                                  type="text"
                                  value={player}
                                  onChange={(e) => {
                                    const newPlayers = [...editForm.players]
                                    newPlayers[idx] = e.target.value
                                    setEditForm({...editForm, players: newPlayers})
                                  }}
                                  className="input-field text-sm"
                                  placeholder={`Player ${idx + 1}`}
                                />
                              ))
                            ) : (
                              team.players.map((player, idx) => (
                                <div key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                                  <span className="text-orange-500 font-bold">#{idx + 1}</span>
                                  <span>{player}</span>
                                </div>
                              ))
                            )}
                          </div>
                        </div>

                        {/* Contact Info */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                          <div className="flex items-center gap-2 text-gray-400">
                            <Mail className="w-4 h-4" />
                            {editingTeam === team.teamId ? (
                              <input
                                type="email"
                                value={editForm.contactEmail}
                                onChange={(e) => setEditForm({...editForm, contactEmail: e.target.value})}
                                className="input-field text-sm flex-1"
                              />
                            ) : (
                              <span>{team.contactEmail}</span>
                            )}
                          </div>
                          <div className="flex items-center gap-2 text-gray-400">
                            <Phone className="w-4 h-4" />
                            {editingTeam === team.teamId ? (
                              <input
                                type="text"
                                value={editForm.contactNumber}
                                onChange={(e) => setEditForm({...editForm, contactNumber: e.target.value})}
                                className="input-field text-sm flex-1"
                              />
                            ) : (
                              <span>{team.contactNumber}</span>
                            )}
                          </div>
                          <div className="flex items-center gap-2 text-gray-400">
                            <Trophy className="w-4 h-4" />
                            <span>Payment: {team.amount}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-400">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(team.registeredAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>

                      {/* Team Logo */}
                      {team.teamLogo && (
                        <div className="flex items-center justify-center lg:w-32">
                          <img
                            src={team.teamLogo}
                            alt="Team Logo"
                            className="w-24 h-24 object-cover rounded-lg border-2 border-gray-700"
                          />
                        </div>
                      )}
                    </div>

                    {/* Edit Actions */}
                    {editingTeam === team.teamId && (
                      <div className="border-t border-gray-700 pt-4 flex gap-3">
                        <button
                          onClick={() => handleSaveEdit(team.teamId)}
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-bold transition-colors"
                        >
                          <Save className="w-5 h-5" />
                          Save Changes
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-bold transition-colors"
                        >
                          <X className="w-5 h-5" />
                          Cancel
                        </button>
                      </div>
                    )}

                    {/* Stage Progression */}
                    {editingTeam !== team.teamId && (
                      <div className="border-t border-gray-700 pt-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-white font-bold mb-1">Tournament Progression</h4>
                          <p className="text-gray-400 text-sm">
                            Current Stage: <span className="text-white font-semibold">
                              {team.stage === 'enrolled' ? 'Enrolled Teams' :
                               team.stage === 'quarterFinals' ? 'Quarter Finals' :
                               team.stage === 'semiFinals' ? 'Semi Finals' :
                               team.stage === 'finals' ? 'Finals' :
                               'Champion'}
                            </span>
                          </p>
                        </div>

                        {/* Upgrade/Downgrade Buttons */}
                        <div className="flex gap-2">
                          {/* Downgrade Button */}
                          {stageProgression[team.stage]?.prev && (
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleDowngradeStage(team.teamId, team.stage, team.teamNumber)}
                              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-lg font-bold transition-all"
                            >
                              <Undo2 className="w-5 h-5" />
                              Undo / Downgrade
                            </motion.button>
                          )}

                          {/* Upgrade Button */}
                          {stageProgression[team.stage]?.next && (
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleUpgradeStage(team.teamId, team.stage, team.teamNumber)}
                              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-lg font-bold transition-all"
                            >
                              <ChevronRight className="w-5 h-5" />
                              Upgrade to {stageProgression[team.stage].label}
                            </motion.button>
                          )}
                        </div>

                        {!stageProgression[team.stage]?.next && (
                          <div className="flex items-center gap-2 px-4 py-2 bg-yellow-500/20 border-2 border-yellow-500 rounded-lg">
                            <Crown className="w-5 h-5 text-yellow-500" />
                            <span className="text-yellow-500 font-bold">Tournament Winner!</span>
                          </div>
                        )}
                      </div>

                      {/* Stage Progress Bar */}
                      <div className="mt-4">
                        <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                          <span>Enrolled</span>
                          <span>Quarter Finals</span>
                          <span>Semi Finals</span>
                          <span>Finals</span>
                          <span>Champion</span>
                        </div>
                        <div className="relative h-2 bg-gray-800 rounded-full overflow-hidden">
                          <div 
                            className={`absolute top-0 left-0 h-full bg-gradient-to-r from-green-500 to-yellow-500 transition-all duration-500 ${
                              team.stage === 'enrolled' ? 'w-[20%]' :
                              team.stage === 'quarterFinals' ? 'w-[40%]' :
                              team.stage === 'semiFinals' ? 'w-[60%]' :
                              team.stage === 'finals' ? 'w-[80%]' :
                              'w-[100%]'
                            }`}
                          />
                        </div>
                      </div>
                    </div>
                    )}
                  </div>
                </motion.div>
              ))
            )}
          </div>

          {/* Danger Zone */}
          <div className="card bg-red-500/10 border-2 border-red-500/30 mt-8">
            <h3 className="text-xl font-bold text-red-500 mb-2">Danger Zone</h3>
            <p className="text-gray-400 text-sm mb-4">
              Warning: This action cannot be undone. It will permanently delete all registration data.
            </p>
            <button
              onClick={() => {
                if (window.confirm('Are you sure you want to delete ALL registrations? This cannot be undone!')) {
                  clearAllTeams()
                  alert('All registrations have been deleted.')
                }
              }}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-bold transition-colors"
            >
              Clear All Registrations
            </button>
          </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="card">
                <h2 className="text-2xl font-bold text-white mb-6">Website Settings</h2>
                
                {/* Social Media Settings */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    Social Media Links
                  </h3>
                  <div className="space-y-4">
                    {/* Facebook */}
                    <div className="bg-gray-800/50 p-4 rounded-lg">
                      <div className="flex items-center gap-3 mb-3">
                        <Facebook className="w-5 h-5 text-blue-600" />
                        <h4 className="text-white font-bold">Facebook</h4>
                        <label className="ml-auto flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={settingsForm.facebook.enabled}
                            onChange={(e) => handleUpdateSettingsForm('facebook', 'enabled', e.target.checked)}
                            className="w-4 h-4"
                          />
                          <span className="text-sm text-gray-400">Enable</span>
                        </label>
                      </div>
                      <input
                        type="url"
                        placeholder="https://facebook.com/yourpage"
                        value={settingsForm.facebook.url}
                        onChange={(e) => handleUpdateSettingsForm('facebook', 'url', e.target.value)}
                        className="input-field w-full"
                        disabled={!settingsForm.facebook.enabled}
                      />
                    </div>

                    {/* Twitter */}
                    <div className="bg-gray-800/50 p-4 rounded-lg">
                      <div className="flex items-center gap-3 mb-3">
                        <Twitter className="w-5 h-5 text-sky-500" />
                        <h4 className="text-white font-bold">Twitter</h4>
                        <label className="ml-auto flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={settingsForm.twitter.enabled}
                            onChange={(e) => handleUpdateSettingsForm('twitter', 'enabled', e.target.checked)}
                            className="w-4 h-4"
                          />
                          <span className="text-sm text-gray-400">Enable</span>
                        </label>
                      </div>
                      <input
                        type="url"
                        placeholder="https://twitter.com/yourpage"
                        value={settingsForm.twitter.url}
                        onChange={(e) => handleUpdateSettingsForm('twitter', 'url', e.target.value)}
                        className="input-field w-full"
                        disabled={!settingsForm.twitter.enabled}
                      />
                    </div>

                    {/* Instagram */}
                    <div className="bg-gray-800/50 p-4 rounded-lg">
                      <div className="flex items-center gap-3 mb-3">
                        <Instagram className="w-5 h-5 text-pink-600" />
                        <h4 className="text-white font-bold">Instagram</h4>
                        <label className="ml-auto flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={settingsForm.instagram.enabled}
                            onChange={(e) => handleUpdateSettingsForm('instagram', 'enabled', e.target.checked)}
                            className="w-4 h-4"
                          />
                          <span className="text-sm text-gray-400">Enable</span>
                        </label>
                      </div>
                      <input
                        type="url"
                        placeholder="https://instagram.com/yourpage"
                        value={settingsForm.instagram.url}
                        onChange={(e) => handleUpdateSettingsForm('instagram', 'url', e.target.value)}
                        className="input-field w-full"
                        disabled={!settingsForm.instagram.enabled}
                      />
                    </div>

                    {/* Discord */}
                    <div className="bg-gray-800/50 p-4 rounded-lg">
                      <div className="flex items-center gap-3 mb-3">
                        <MessageCircle className="w-5 h-5 text-indigo-600" />
                        <h4 className="text-white font-bold">Discord</h4>
                        <label className="ml-auto flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={settingsForm.discord.enabled}
                            onChange={(e) => handleUpdateSettingsForm('discord', 'enabled', e.target.checked)}
                            className="w-4 h-4"
                          />
                          <span className="text-sm text-gray-400">Enable</span>
                        </label>
                      </div>
                      <input
                        type="url"
                        placeholder="https://discord.gg/yourinvite"
                        value={settingsForm.discord.url}
                        onChange={(e) => handleUpdateSettingsForm('discord', 'url', e.target.value)}
                        className="input-field w-full"
                        disabled={!settingsForm.discord.enabled}
                      />
                    </div>

                    {/* YouTube */}
                    <div className="bg-gray-800/50 p-4 rounded-lg">
                      <div className="flex items-center gap-3 mb-3">
                        <Youtube className="w-5 h-5 text-red-600" />
                        <h4 className="text-white font-bold">YouTube</h4>
                        <label className="ml-auto flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={settingsForm.youtube.enabled}
                            onChange={(e) => handleUpdateSettingsForm('youtube', 'enabled', e.target.checked)}
                            className="w-4 h-4"
                          />
                          <span className="text-sm text-gray-400">Enable</span>
                        </label>
                      </div>
                      <input
                        type="url"
                        placeholder="https://youtube.com/@yourchannel"
                        value={settingsForm.youtube.url}
                        onChange={(e) => handleUpdateSettingsForm('youtube', 'url', e.target.value)}
                        className="input-field w-full"
                        disabled={!settingsForm.youtube.enabled}
                      />
                    </div>

                    {/* WhatsApp */}
                    <div className="bg-gray-800/50 p-4 rounded-lg">
                      <div className="flex items-center gap-3 mb-3">
                        <MessageCircle className="w-5 h-5 text-green-600" />
                        <h4 className="text-white font-bold">WhatsApp</h4>
                        <label className="ml-auto flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={settingsForm.whatsapp.enabled}
                            onChange={(e) => handleUpdateSettingsForm('whatsapp', 'enabled', e.target.checked)}
                            className="w-4 h-4"
                          />
                          <span className="text-sm text-gray-400">Enable</span>
                        </label>
                      </div>
                      <input
                        type="tel"
                        placeholder="+919876543210 (with country code)"
                        value={settingsForm.whatsapp.number}
                        onChange={(e) => handleUpdateSettingsForm('whatsapp', 'number', e.target.value)}
                        className="input-field w-full"
                        disabled={!settingsForm.whatsapp.enabled}
                      />
                    </div>
                  </div>
                </div>

                {/* Support Contact Settings */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <Mail className="w-5 h-5" />
                    Support Contact
                  </h3>
                  <div className="space-y-4">
                    {/* Support Email */}
                    <div className="bg-gray-800/50 p-4 rounded-lg">
                      <div className="flex items-center gap-3 mb-3">
                        <Mail className="w-5 h-5 text-blue-500" />
                        <h4 className="text-white font-bold">Support Email</h4>
                        <label className="ml-auto flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={settingsForm.supportEmail.enabled}
                            onChange={(e) => handleUpdateSettingsForm('supportEmail', 'enabled', e.target.checked)}
                            className="w-4 h-4"
                          />
                          <span className="text-sm text-gray-400">Enable</span>
                        </label>
                      </div>
                      <input
                        type="email"
                        placeholder="support@strktournaments.com"
                        value={settingsForm.supportEmail.address}
                        onChange={(e) => handleUpdateSettingsForm('supportEmail', 'address', e.target.value)}
                        className="input-field w-full"
                        disabled={!settingsForm.supportEmail.enabled}
                      />
                    </div>

                    {/* Support Phone */}
                    <div className="bg-gray-800/50 p-4 rounded-lg">
                      <div className="flex items-center gap-3 mb-3">
                        <Phone className="w-5 h-5 text-green-500" />
                        <h4 className="text-white font-bold">Support Phone</h4>
                        <label className="ml-auto flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={settingsForm.supportPhone.enabled}
                            onChange={(e) => handleUpdateSettingsForm('supportPhone', 'enabled', e.target.checked)}
                            className="w-4 h-4"
                          />
                          <span className="text-sm text-gray-400">Enable</span>
                        </label>
                      </div>
                      <input
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={settingsForm.supportPhone.number}
                        onChange={(e) => handleUpdateSettingsForm('supportPhone', 'number', e.target.value)}
                        className="input-field w-full"
                        disabled={!settingsForm.supportPhone.enabled}
                      />
                    </div>
                  </div>
                </div>

                {/* Save Button */}
                <div className="flex justify-end">
                  <button
                    onClick={handleSaveSettings}
                    className="btn-primary flex items-center gap-2"
                  >
                    <Save className="w-5 h-5" />
                    Save Settings
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Change Password */}
              <div className="card">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <Lock className="w-6 h-6" />
                  Change Admin Password
                </h2>
                <form onSubmit={handleChangePassword} className="space-y-4">
                  <div>
                    <label className="block text-gray-400 mb-2">Current Password</label>
                    <div className="relative">
                      <input
                        type={showPasswords ? 'text' : 'password'}
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="input-field w-full"
                        placeholder="Enter current password"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-400 mb-2">New Password</label>
                    <input
                      type={showPasswords ? 'text' : 'password'}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="input-field w-full"
                      placeholder="Enter new password"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 mb-2">Confirm New Password</label>
                    <input
                      type={showPasswords ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="input-field w-full"
                      placeholder="Confirm new password"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={showPasswords}
                      onChange={(e) => setShowPasswords(e.target.checked)}
                      className="w-4 h-4"
                      id="showPasswords"
                    />
                    <label htmlFor="showPasswords" className="text-gray-400 text-sm">
                      Show passwords
                    </label>
                  </div>
                  <button type="submit" className="btn-primary w-full">
                    Change Password
                  </button>
                </form>
              </div>

              {/* Forgot Password */}
              <div className="card">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                  <Shield className="w-6 h-6" />
                  Forgot Password / Reset
                </h2>
                <p className="text-gray-400 mb-4 text-sm">
                  If you forgot your password, you can reset it using your admin email: <span className="text-white font-bold">{adminEmail}</span>
                </p>
                
                {!showForgotPassword ? (
                  <button
                    onClick={() => setShowForgotPassword(true)}
                    className="btn-secondary"
                  >
                    Reset Password
                  </button>
                ) : (
                  <form onSubmit={handleForgotPassword} className="space-y-4">
                    <div>
                      <label className="block text-gray-400 mb-2">Admin Email</label>
                      <input
                        type="email"
                        value={forgotPasswordEmail}
                        onChange={(e) => setForgotPasswordEmail(e.target.value)}
                        className="input-field w-full"
                        placeholder="Enter admin email"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 mb-2">New Password</label>
                      <input
                        type="password"
                        value={resetNewPassword}
                        onChange={(e) => setResetNewPassword(e.target.value)}
                        className="input-field w-full"
                        placeholder="Enter new password"
                      />
                    </div>
                    <div className="flex gap-2">
                      <button type="submit" className="btn-primary flex-1">
                        Reset Password
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setShowForgotPassword(false)
                          setForgotPasswordEmail('')
                          setResetNewPassword('')
                        }}
                        className="btn-secondary"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}
              </div>

              {/* Admin Email */}
              <div className="card bg-blue-500/10 border-2 border-blue-500/30">
                <h3 className="text-xl font-bold text-white mb-2">Admin Email</h3>
                <p className="text-gray-400 text-sm mb-4">
                  Current admin email: <span className="text-white font-bold">{adminEmail}</span>
                </p>
                <p className="text-gray-500 text-xs">
                  To change admin email, modify it in the settings store.
                </p>
              </div>
            </motion.div>
          )}

        </motion.div>
      </div>
    </div>
  )
}

export default AdminPanel
