import { motion } from 'framer-motion'
import { Trophy, Gamepad2, Users, Calendar, DollarSign, Award, Settings, LogOut } from 'lucide-react'
import useAuthStore from '../store/authStore'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import useTournamentStore from '../store/tournamentStore'

const Dashboard = () => {
  const user = useAuthStore((state) => state.user)
  const logout = useAuthStore((state) => state.logout)
  const navigate = useNavigate()
  
  // Safely get team
  let myTeam = null
  try {
    const getTeamByEmail = useTournamentStore((state) => state.getTeamByEmail)
    if (user?.email && getTeamByEmail) {
      myTeam = getTeamByEmail(user.email)
    }
  } catch (error) {
    console.log('Could not fetch team:', error)
  }

  if (!user) {
    navigate('/login')
    return null
  }

  const handleLogout = async () => {
    try {
      await logout()
      toast.success('Logged out successfully!')
      navigate('/')
    } catch (error) {
      console.error('Logout error:', error)
      navigate('/')
    }
  }

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-4xl mx-auto w-full">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-red-500 to-orange-500 rounded-full mb-6 shadow-2xl"
          >
            <Gamepad2 className="w-16 h-16 text-white" />
          </motion.div>

          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-white">
            Welcome, <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">{user.username}!</span>
          </h1>
          <p className="text-gray-400 text-xl mb-3">Ready to compete in the Free Fire PC Tournament?</p>
          
          <div className="flex flex-col gap-2 items-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-500/20 border border-yellow-500 rounded-full animate-pulse">
              <Trophy className="w-5 h-5 text-yellow-400" />
              <span className="text-yellow-400 font-bold text-sm">FIRST EVER PC TOURNAMENT</span>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 border border-blue-500 rounded-full">
              <span className="text-blue-400 font-bold text-sm">MAKE HISTORY WITH US</span>
            </div>
          </div>
        </motion.div>

        {/* Participate Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/tournament-registration')}
            className="group relative inline-flex items-center justify-center gap-4 px-12 py-6 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl text-white font-bold text-2xl shadow-2xl overflow-hidden"
          >
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <Trophy className="w-8 h-8 relative z-10 group-hover:animate-bounce" />
            <span className="relative z-10">Participate in Tournament</span>
          </motion.button>

          <p className="text-gray-500 text-sm mt-6">Click above to register your team for the tournament</p>
        </motion.div>

        {/* Fee Refund Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 card bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-2 border-green-500/50 text-center"
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-5xl mb-3"
          >
            💰
          </motion.div>
          <p className="text-green-400 font-bold text-2xl mb-2">100% FEE REFUND!</p>
          <p className="text-gray-300 text-sm">
            Reach Quarter Finals and get your registration fee back!
          </p>
        </motion.div>

        {/* My Team Status */}
        {myTeam && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-8 card bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-2 border-blue-500/50"
          >
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Users className="w-6 h-6 text-blue-400" />
              My Team
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-400 text-sm">Team Name</p>
                <p className="text-white font-bold text-lg">{myTeam.teamName}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Team Number</p>
                <p className="text-white font-bold text-lg">#{myTeam.teamNumber}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Payment Status</p>
                <p className={`font-bold text-lg ${myTeam.paymentStatus === 'completed' ? 'text-green-400' : 'text-yellow-400'}`}>
                  {myTeam.paymentStatus === 'completed' ? '✓ Paid' : 'Pending'}
                </p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Team Members</p>
                <p className="text-white font-bold text-lg">{myTeam.players?.length || 0}/4 Players</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-12"
        >
          <button
            onClick={() => navigate('/profile')}
            className="card hover:bg-white/5 transition-all group"
          >
            <Settings className="w-8 h-8 text-gray-400 group-hover:text-blue-400 mb-3 mx-auto" />
            <p className="text-white font-bold">Profile Settings</p>
            <p className="text-gray-500 text-xs mt-1">Update your info</p>
          </button>

          <button
            onClick={() => navigate('/tournament-registration')}
            className="card hover:bg-white/5 transition-all group"
          >
            <Users className="w-8 h-8 text-gray-400 group-hover:text-green-400 mb-3 mx-auto" />
            <p className="text-white font-bold">Register Team</p>
            <p className="text-gray-500 text-xs mt-1">Join tournament</p>
          </button>

          <button
            onClick={() => navigate('/downloads')}
            className="card hover:bg-white/5 transition-all group"
          >
            <Gamepad2 className="w-8 h-8 text-gray-400 group-hover:text-purple-400 mb-3 mx-auto" />
            <p className="text-white font-bold">Downloads</p>
            <p className="text-gray-500 text-xs mt-1">Get game files</p>
          </button>

          <button
            onClick={handleLogout}
            className="card hover:bg-red-500/10 transition-all group border-red-500/20"
          >
            <LogOut className="w-8 h-8 text-gray-400 group-hover:text-red-400 mb-3 mx-auto" />
            <p className="text-white font-bold">Logout</p>
            <p className="text-gray-500 text-xs mt-1">Sign out</p>
          </button>
        </motion.div>

        {/* Info Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12"
        >
          <div className="card text-center">
            <div className="text-3xl font-bold text-orange-500 mb-2">20,736</div>
            <p className="text-gray-400 text-sm">Total Teams</p>
          </div>
          <div className="card text-center">
            <div className="text-3xl font-bold text-yellow-500 mb-2">48 Players</div>
            <p className="text-gray-400 text-sm">Per Match</p>
          </div>
          <div className="card text-center">
            <div className="text-3xl font-bold text-green-500 mb-2">PC Only</div>
            <p className="text-gray-400 text-sm">Platform</p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Dashboard
