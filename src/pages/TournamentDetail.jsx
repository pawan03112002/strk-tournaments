import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Calendar, Users, Trophy, IndianRupee, Clock, MapPin, Award, Shield } from 'lucide-react'
import { format } from 'date-fns'
import useAuthStore from '../store/authStore'
import toast from 'react-hot-toast'

// Mock tournament data
const tournamentData = {
  1: {
    id: 1,
    name: 'Weekend Warriors Championship',
    description: 'Compete in the ultimate weekend showdown for massive prizes! This tournament features the best players from around the world competing for glory and substantial cash prizes.',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800',
    date: '2025-10-10T18:00:00',
    entryFee: 50,
    prizePool: 10000,
    participants: 45,
    maxParticipants: 100,
    status: 'upcoming',
    mode: 'Squad',
    map: 'Bermuda',
    rules: [
      'No hacking or cheating allowed',
      'Must have level 30+ account',
      'Squad must have 4 players',
      'Team killing is prohibited',
      'Follow all Free Fire community guidelines'
    ],
    prizes: [
      { position: '1st Place', amount: 5000 },
      { position: '2nd Place', amount: 3000 },
      { position: '3rd Place', amount: 2000 }
    ],
    schedule: [
      { time: '18:00', event: 'Registration Closes' },
      { time: '18:15', event: 'Room ID Shared' },
      { time: '18:30', event: 'Match 1 Starts' },
      { time: '19:00', event: 'Match 2 Starts' },
      { time: '19:30', event: 'Final Match' }
    ]
  }
}

const TournamentDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const user = useAuthStore((state) => state.user)
  const tournament = tournamentData[id] || tournamentData[1]

  const handleJoinTournament = () => {
    if (!user) {
      toast.error('Please login to join tournament')
      navigate('/login')
      return
    }

    if (tournament.participants >= tournament.maxParticipants) {
      toast.error('Tournament is full!')
      return
    }

    // Navigate to payment page
    navigate(`/payment/${tournament.id}`)
  }

  return (
    <div className="min-h-screen py-20">
      {/* Hero Banner */}
      <div className="relative h-96 mb-8">
        <img
          src={tournament.image}
          alt={tournament.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gaming-dark via-gaming-dark/50 to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 right-0 px-4 sm:px-6 lg:px-8 pb-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <span className={`${tournament.status === 'live' ? 'bg-green-500 animate-pulse' : 'bg-blue-500'} text-white text-sm font-bold px-4 py-2 rounded-full uppercase`}>
                  {tournament.status}
                </span>
                <span className="bg-purple-500 text-white text-sm font-bold px-4 py-2 rounded-full">
                  {tournament.mode}
                </span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
                {tournament.name}
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl">
                {tournament.description}
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="card"
            >
              <h2 className="text-2xl font-bold text-white mb-6">Tournament Details</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="flex justify-center mb-2">
                    <Calendar className="w-8 h-8 text-red-500" />
                  </div>
                  <p className="text-gray-400 text-sm mb-1">Date</p>
                  <p className="text-white font-bold">{format(new Date(tournament.date), 'MMM dd')}</p>
                </div>

                <div className="text-center">
                  <div className="flex justify-center mb-2">
                    <Clock className="w-8 h-8 text-purple-500" />
                  </div>
                  <p className="text-gray-400 text-sm mb-1">Time</p>
                  <p className="text-white font-bold">{format(new Date(tournament.date), 'HH:mm')}</p>
                </div>

                <div className="text-center">
                  <div className="flex justify-center mb-2">
                    <Users className="w-8 h-8 text-blue-500" />
                  </div>
                  <p className="text-gray-400 text-sm mb-1">Players</p>
                  <p className="text-white font-bold">{tournament.participants}/{tournament.maxParticipants}</p>
                </div>

                <div className="text-center">
                  <div className="flex justify-center mb-2">
                    <MapPin className="w-8 h-8 text-green-500" />
                  </div>
                  <p className="text-gray-400 text-sm mb-1">Map</p>
                  <p className="text-white font-bold">{tournament.map}</p>
                </div>
              </div>
            </motion.div>

            {/* Rules */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="card"
            >
              <div className="flex items-center gap-3 mb-6">
                <Shield className="w-6 h-6 text-red-500" />
                <h2 className="text-2xl font-bold text-white">Rules & Regulations</h2>
              </div>
              <ul className="space-y-3">
                {tournament.rules.map((rule, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-red-500 mt-1">•</span>
                    <span className="text-gray-300">{rule}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Prize Distribution */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="card"
            >
              <div className="flex items-center gap-3 mb-6">
                <Award className="w-6 h-6 text-yellow-500" />
                <h2 className="text-2xl font-bold text-white">Prize Distribution</h2>
              </div>
              <div className="space-y-4">
                {tournament.prizes.map((prize, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                    <span className="text-lg font-bold text-white">{prize.position}</span>
                    <div className="flex items-center gap-2">
                      <IndianRupee className="w-5 h-5 text-yellow-500" />
                      <span className="text-2xl font-bold text-yellow-500">{prize.amount}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Schedule */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="card"
            >
              <div className="flex items-center gap-3 mb-6">
                <Clock className="w-6 h-6 text-purple-500" />
                <h2 className="text-2xl font-bold text-white">Schedule</h2>
              </div>
              <div className="space-y-3">
                {tournament.schedule.map((item, index) => (
                  <div key={index} className="flex items-center gap-4 p-3 bg-gray-800/50 rounded-lg">
                    <span className="text-lg font-bold text-purple-500 min-w-[60px]">{item.time}</span>
                    <span className="text-gray-300">{item.event}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="card sticky top-24"
            >
              <h3 className="text-2xl font-bold text-white mb-6">Join Tournament</h3>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-lg border border-red-500/30">
                  <span className="text-gray-300">Entry Fee</span>
                  <div className="flex items-center gap-1">
                    <IndianRupee className="w-5 h-5 text-yellow-500" />
                    <span className="text-2xl font-bold text-white">{tournament.entryFee}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-lg border border-yellow-500/30">
                  <span className="text-gray-300">Prize Pool</span>
                  <div className="flex items-center gap-1">
                    <Trophy className="w-5 h-5 text-yellow-500" />
                    <span className="text-2xl font-bold text-yellow-500">{tournament.prizePool}</span>
                  </div>
                </div>

                <div className="p-4 bg-gray-800/50 rounded-lg">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-400">Slots Available</span>
                    <span className="text-white font-bold">
                      {tournament.maxParticipants - tournament.participants}/{tournament.maxParticipants}
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-red-500 to-orange-500 h-2 rounded-full"
                      style={{ width: `${(tournament.participants / tournament.maxParticipants) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              <button
                onClick={handleJoinTournament}
                disabled={tournament.participants >= tournament.maxParticipants}
                className={`w-full ${
                  tournament.participants >= tournament.maxParticipants
                    ? 'bg-gray-600 cursor-not-allowed'
                    : 'btn-primary'
                } text-lg`}
              >
                {tournament.participants >= tournament.maxParticipants ? 'Tournament Full' : 'Join Now'}
              </button>

              {!user && (
                <p className="text-sm text-gray-400 text-center mt-4">
                  Please login to join this tournament
                </p>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TournamentDetail
