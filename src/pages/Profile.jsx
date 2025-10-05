import { useState } from 'react'
import { motion } from 'framer-motion'
import { User, Lock, Save, Crown, Trophy, Medal, Target, Users } from 'lucide-react'
import useAuthStore from '../store/authStore'
import useTournamentStore from '../store/tournamentStore'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const Profile = () => {
  const user = useAuthStore((state) => state.user)
  const updateUser = useAuthStore((state) => state.updateUser)
  const getTeamByEmail = useTournamentStore((state) => state.getTeamByEmail)
  const navigate = useNavigate()
  const [isEditing, setIsEditing] = useState(false)
  
  // Get user's registered team
  const userTeam = user?.email ? getTeamByEmail(user.email) : null

  const [formData, setFormData] = useState({
    username: user?.username || '',
    avatar: user?.avatar || '👤',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  if (!user) {
    navigate('/login')
    return null
  }

  // Tournament stages with icons
  const stages = {
    enrolled: { title: 'Enrolled Teams', icon: Users, color: 'from-red-500 to-pink-600', rank: 5 },
    quarterFinals: { title: 'Quarter Finals', icon: Target, color: 'from-purple-500 to-violet-600', rank: 4 },
    semiFinals: { title: 'Semi Finals', icon: Medal, color: 'from-orange-400 to-yellow-600', rank: 3 },
    finals: { title: 'Finals', icon: Trophy, color: 'from-gray-300 to-gray-500', rank: 2 },
    champion: { title: 'Champion', icon: Crown, color: 'from-yellow-400 to-amber-600', rank: 1 }
  }

  // Get user's current stage from registered team
  const userStage = userTeam?.stage || 'enrolled'

  const availableAvatars = ['👤', '🎮', '🔥', '⚡', '🌟', '🏆', '🎯', '💎', '🚀', '👑', '🦁', '🐉']

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Validate passwords if changing
    if (formData.newPassword) {
      if (formData.newPassword !== formData.confirmPassword) {
        toast.error('Passwords do not match!')
        return
      }
      if (formData.newPassword.length < 6) {
        toast.error('Password must be at least 6 characters!')
        return
      }
    }

    updateUser({ 
      ...user, 
      username: formData.username,
      avatar: formData.avatar
    })
    
    toast.success('Profile updated successfully!')
    setIsEditing(false)
    setFormData({ ...formData, currentPassword: '', newPassword: '', confirmPassword: '' })
  }

  const StageIcon = stages[userStage].icon

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto mt-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          {/* Your Tournament Stage */}
          <div className="card">
            <h2 className="text-3xl font-bold text-white mb-6 text-center">Your Tournament Status</h2>
            
            {userTeam && (
              <div className="text-center mb-6">
                <p className="text-gray-400 mb-2">Your Team Number</p>
                <h3 className="text-3xl font-black bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                  {userTeam.teamNumber}
                </h3>
                <p className="text-gray-500 text-sm mt-1">{userTeam.teamName}</p>
              </div>
            )}
            
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className={`relative bg-gradient-to-r ${stages[userStage].color} p-8 rounded-xl text-center`}
            >
              <div className="flex flex-col items-center gap-4">
                <div className="bg-white/20 p-6 rounded-full backdrop-blur-sm">
                  <StageIcon className="w-16 h-16 text-white" />
                </div>
                <div>
                  <h3 className="text-4xl font-black text-white mb-2">{stages[userStage].title}</h3>
                  <p className="text-white/90 text-lg">Current Position in Tournament</p>
                </div>
              </div>

              {/* Progress indicator */}
              <div className="mt-6 flex items-center justify-center gap-2">
                {Object.keys(stages).reverse().map((stage, index) => (
                  <div
                    key={stage}
                    className={`h-2 w-12 rounded-full ${
                      stages[stage].rank >= stages[userStage].rank
                        ? 'bg-white'
                        : 'bg-white/30'
                    }`}
                  />
                ))}
              </div>
            </motion.div>

            <div className="mt-6 text-center">
              <p className="text-gray-400">
                Keep competing to advance to the next stage!
              </p>
            </div>
          </div>

          {/* Edit Profile Section */}
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-white">Edit Profile</h2>
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="btn-primary"
                >
                  Edit
                </button>
              )}
            </div>

            {isEditing ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Username */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Username
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      className="input-field pl-12"
                      required
                    />
                  </div>
                </div>

                {/* Avatar Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    Choose Avatar
                  </label>
                  <div className="grid grid-cols-6 md:grid-cols-12 gap-3">
                    {availableAvatars.map((avatar) => (
                      <button
                        key={avatar}
                        type="button"
                        onClick={() => setFormData({ ...formData, avatar })}
                        className={`text-4xl p-3 rounded-lg transition-all ${
                          formData.avatar === avatar
                            ? 'bg-gradient-to-br from-red-500 to-orange-500 scale-110'
                            : 'bg-gray-800 hover:bg-gray-700'
                        }`}
                      >
                        {avatar}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Password Section */}
                <div className="border-t border-gray-700 pt-6">
                  <h3 className="text-xl font-bold text-white mb-4">Change Password (Optional)</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Current Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="password"
                          name="currentPassword"
                          value={formData.currentPassword}
                          onChange={handleChange}
                          className="input-field pl-12"
                          placeholder="Leave blank to keep current"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        New Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="password"
                          name="newPassword"
                          value={formData.newPassword}
                          onChange={handleChange}
                          className="input-field pl-12"
                          placeholder="Minimum 6 characters"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Confirm New Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="password"
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          className="input-field pl-12"
                          placeholder="Re-enter new password"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button type="submit" className="btn-primary flex-1 flex items-center justify-center gap-2">
                    <Save className="w-5 h-5" />
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(false)
                      setFormData({
                        username: user?.username || '',
                        avatar: user?.avatar || '👤',
                        currentPassword: '',
                        newPassword: '',
                        confirmPassword: ''
                      })
                    }}
                    className="btn-secondary flex-1"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              /* Display Profile Info */
              <div className="space-y-6">
                <div className="flex items-center gap-6">
                  <div className="text-8xl">{user.avatar || '👤'}</div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1">{user.username}</h3>
                    <p className="text-gray-400">Tournament Participant</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Profile
