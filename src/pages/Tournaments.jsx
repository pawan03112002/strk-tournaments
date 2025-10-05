import { useState } from 'react'
import { motion } from 'framer-motion'
import TournamentCard from '../components/TournamentCard'
import { Search, Filter, SlidersHorizontal } from 'lucide-react'

// Mock tournament data
const allTournaments = [
  {
    id: 1,
    name: 'Weekend Warriors Championship',
    description: 'Compete in the ultimate weekend showdown for massive prizes!',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800',
    date: '2025-10-10T18:00:00',
    entryFee: 50,
    prizePool: 10000,
    participants: 45,
    maxParticipants: 100,
    status: 'upcoming',
    mode: 'Squad'
  },
  {
    id: 2,
    name: 'Pro League Season 5',
    description: 'Professional tournament for elite Free Fire players',
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800',
    date: '2025-10-05T20:00:00',
    entryFee: 100,
    prizePool: 50000,
    participants: 78,
    maxParticipants: 100,
    status: 'live',
    mode: 'Squad'
  },
  {
    id: 3,
    name: 'Beginner Battle Royale',
    description: 'Perfect tournament for new players to showcase skills',
    image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800',
    date: '2025-10-15T16:00:00',
    entryFee: 25,
    prizePool: 5000,
    participants: 32,
    maxParticipants: 50,
    status: 'upcoming',
    mode: 'Solo'
  },
  {
    id: 4,
    name: 'Midnight Mayhem',
    description: 'Late night tournament for night owls and competitive players',
    image: 'https://images.unsplash.com/photo-1560253023-3ec5d502959f?w=800',
    date: '2025-10-08T23:00:00',
    entryFee: 75,
    prizePool: 15000,
    participants: 64,
    maxParticipants: 100,
    status: 'upcoming',
    mode: 'Duo'
  },
  {
    id: 5,
    name: 'Champion Series Finals',
    description: 'Grand finale of the champion series with huge prizes',
    image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=800',
    date: '2025-10-20T19:00:00',
    entryFee: 200,
    prizePool: 100000,
    participants: 89,
    maxParticipants: 100,
    status: 'upcoming',
    mode: 'Squad'
  },
  {
    id: 6,
    name: 'Speed Rush Tournament',
    description: 'Fast-paced tournament with quick matches and instant action',
    image: 'https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?w=800',
    date: '2025-10-12T17:00:00',
    entryFee: 40,
    prizePool: 8000,
    participants: 28,
    maxParticipants: 50,
    status: 'upcoming',
    mode: 'Solo'
  }
]

const Tournaments = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterMode, setFilterMode] = useState('all')
  const [showFilters, setShowFilters] = useState(false)

  const filteredTournaments = allTournaments.filter(tournament => {
    const matchesSearch = tournament.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tournament.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = filterStatus === 'all' || tournament.status === filterStatus
    const matchesMode = filterMode === 'all' || tournament.mode === filterMode
    
    return matchesSearch && matchesStatus && matchesMode
  })

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mt-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
            All Tournaments
          </h1>
          <p className="text-gray-400 text-lg">
            Find and join the perfect tournament for your skill level
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search tournaments..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field pl-12 w-full"
              />
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="btn-secondary flex items-center justify-center gap-2 md:w-auto"
            >
              <SlidersHorizontal className="w-5 h-5" />
              Filters
            </button>
          </div>

          {/* Filter Options */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="card p-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Status
                  </label>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="input-field"
                  >
                    <option value="all">All Status</option>
                    <option value="upcoming">Upcoming</option>
                    <option value="live">Live</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Game Mode
                  </label>
                  <select
                    value={filterMode}
                    onChange={(e) => setFilterMode(e.target.value)}
                    className="input-field"
                  >
                    <option value="all">All Modes</option>
                    <option value="Solo">Solo</option>
                    <option value="Duo">Duo</option>
                    <option value="Squad">Squad</option>
                  </select>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-400">
            Showing <span className="text-white font-bold">{filteredTournaments.length}</span> tournaments
          </p>
        </div>

        {/* Tournament Grid */}
        {filteredTournaments.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTournaments.map((tournament, index) => (
              <TournamentCard key={tournament.id} tournament={tournament} index={index} />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <Filter className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-400 mb-2">No tournaments found</h3>
            <p className="text-gray-500">Try adjusting your search or filters</p>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default Tournaments
