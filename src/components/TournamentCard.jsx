import { Link } from 'react-router-dom'
import { Calendar, Users, Trophy, IndianRupee } from 'lucide-react'
import { motion } from 'framer-motion'
import { format } from 'date-fns'

const TournamentCard = ({ tournament, index }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'upcoming':
        return 'bg-blue-500'
      case 'live':
        return 'bg-green-500 animate-pulse'
      case 'completed':
        return 'bg-gray-500'
      default:
        return 'bg-gray-500'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.05 }}
      className="card group cursor-pointer relative overflow-hidden"
    >
      {/* Status Badge */}
      <div className="absolute top-4 right-4 z-10">
        <span className={`${getStatusColor(tournament.status)} text-white text-xs font-bold px-3 py-1 rounded-full uppercase`}>
          {tournament.status}
        </span>
      </div>

      {/* Tournament Image */}
      <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
        <img
          src={tournament.image || 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800'}
          alt={tournament.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
        
        {/* Entry Fee Badge */}
        <div className="absolute bottom-4 left-4 flex items-center space-x-1 bg-yellow-500 text-black font-bold px-3 py-1 rounded-full">
          <IndianRupee className="w-4 h-4" />
          <span>{tournament.entryFee}</span>
        </div>
      </div>

      {/* Tournament Details */}
      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-white group-hover:text-red-500 transition-colors">
          {tournament.name}
        </h3>

        <p className="text-gray-400 text-sm line-clamp-2">
          {tournament.description}
        </p>

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-2 text-gray-300">
            <Calendar className="w-4 h-4 text-red-500" />
            <span className="text-sm">{format(new Date(tournament.date), 'MMM dd, yyyy')}</span>
          </div>

          <div className="flex items-center space-x-2 text-gray-300">
            <Users className="w-4 h-4 text-purple-500" />
            <span className="text-sm">{tournament.participants}/{tournament.maxParticipants}</span>
          </div>

          <div className="flex items-center space-x-2 text-gray-300">
            <Trophy className="w-4 h-4 text-yellow-500" />
            <span className="text-sm font-bold text-yellow-500">₹{tournament.prizePool}</span>
          </div>

          <div className="flex items-center space-x-2 text-gray-300">
            <span className="text-sm">{tournament.mode}</span>
          </div>
        </div>

        {/* Action Button */}
        <Link
          to={`/tournament/${tournament.id}`}
          className="block w-full text-center btn-primary"
        >
          View Details
        </Link>
      </div>

      {/* Glow Effect on Hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-red-500/0 via-red-500/0 to-red-500/0 group-hover:from-red-500/10 group-hover:via-red-500/5 group-hover:to-red-500/10 transition-all duration-500 pointer-events-none rounded-xl"></div>
    </motion.div>
  )
}

export default TournamentCard
