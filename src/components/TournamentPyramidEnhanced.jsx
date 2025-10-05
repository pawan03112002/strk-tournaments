import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Trophy, Users, Crown, Target, Medal, Award, TrendingUp, X, Zap } from 'lucide-react'

// Enhanced tournament data with more details
const tournamentData = {
  winner: {
    players: [
      { uid: 'UID001', name: 'Player Alpha', score: 2850, kills: 48, placement: 1, avatar: '👑' }
    ],
    title: 'Champion',
    color: '#FFD700',
    gradient: 'from-yellow-400 via-yellow-500 to-amber-600',
    icon: Crown
  },
  finals: {
    players: [
      { uid: 'UID001', name: 'Player Alpha', score: 2850, kills: 48, placement: 1, avatar: '🥇' },
      { uid: 'UID009', name: 'Player Iota', score: 2720, kills: 45, placement: 2, avatar: '🥈' }
    ],
    title: 'Finals',
    color: '#C0C0C0',
    gradient: 'from-gray-300 via-gray-400 to-gray-500',
    icon: Trophy
  },
  semiFinals: {
    players: [
      { uid: 'UID001', name: 'Player Alpha', score: 2650, kills: 42, placement: 1, avatar: '🎯' },
      { uid: 'UID005', name: 'Player Epsilon', score: 2580, kills: 40, placement: 2, avatar: '🎯' },
      { uid: 'UID009', name: 'Player Iota', score: 2520, kills: 38, placement: 3, avatar: '🎯' },
      { uid: 'UID013', name: 'Player Nu', score: 2480, kills: 36, placement: 4, avatar: '🎯' }
    ],
    title: 'Semi Finals',
    color: '#CD7F32',
    gradient: 'from-orange-400 via-amber-500 to-yellow-600',
    icon: Medal
  },
  quarterFinals: {
    players: [
      { uid: 'UID001', name: 'Player Alpha', score: 2450, kills: 35, placement: 1, avatar: '⚡' },
      { uid: 'UID004', name: 'Player Delta', score: 2380, kills: 33, placement: 2, avatar: '⚡' },
      { uid: 'UID005', name: 'Player Epsilon', score: 2350, kills: 32, placement: 3, avatar: '⚡' },
      { uid: 'UID008', name: 'Player Theta', score: 2320, kills: 31, placement: 4, avatar: '⚡' },
      { uid: 'UID009', name: 'Player Iota', score: 2290, kills: 30, placement: 5, avatar: '⚡' },
      { uid: 'UID012', name: 'Player Mu', score: 2250, kills: 29, placement: 6, avatar: '⚡' },
      { uid: 'UID013', name: 'Player Nu', score: 2220, kills: 28, placement: 7, avatar: '⚡' },
      { uid: 'UID016', name: 'Player Pi', score: 2180, kills: 27, placement: 8, avatar: '⚡' }
    ],
    title: 'Quarter Finals',
    color: '#7c3aed',
    gradient: 'from-purple-500 via-violet-600 to-purple-700',
    icon: Target
  },
  enrolled: {
    players: [
      { uid: 'UID001', name: 'Player Alpha', score: 2200, kills: 25, placement: 1, avatar: '🔥' },
      { uid: 'UID002', name: 'Player Beta', score: 2150, kills: 24, placement: 2, avatar: '🔥' },
      { uid: 'UID003', name: 'Player Gamma', score: 2100, kills: 23, placement: 3, avatar: '🔥' },
      { uid: 'UID004', name: 'Player Delta', score: 2080, kills: 22, placement: 4, avatar: '🔥' },
      { uid: 'UID005', name: 'Player Epsilon', score: 2050, kills: 21, placement: 5, avatar: '🔥' },
      { uid: 'UID006', name: 'Player Zeta', score: 2020, kills: 20, placement: 6, avatar: '🔥' },
      { uid: 'UID007', name: 'Player Eta', score: 1990, kills: 19, placement: 7, avatar: '🔥' },
      { uid: 'UID008', name: 'Player Theta', score: 1960, kills: 18, placement: 8, avatar: '🔥' },
      { uid: 'UID009', name: 'Player Iota', score: 1930, kills: 17, placement: 9, avatar: '🔥' },
      { uid: 'UID010', name: 'Player Kappa', score: 1900, kills: 16, placement: 10, avatar: '🔥' },
      { uid: 'UID011', name: 'Player Lambda', score: 1870, kills: 15, placement: 11, avatar: '🔥' },
      { uid: 'UID012', name: 'Player Mu', score: 1840, kills: 14, placement: 12, avatar: '🔥' },
      { uid: 'UID013', name: 'Player Nu', score: 1810, kills: 13, placement: 13, avatar: '🔥' },
      { uid: 'UID014', name: 'Player Xi', score: 1780, kills: 12, placement: 14, avatar: '🔥' },
      { uid: 'UID015', name: 'Player Omicron', score: 1750, kills: 11, placement: 15, avatar: '🔥' },
      { uid: 'UID016', name: 'Player Pi', score: 1720, kills: 10, placement: 16, avatar: '🔥' }
    ],
    title: 'Enrolled Players',
    color: '#ef4444',
    gradient: 'from-red-500 via-rose-600 to-pink-600',
    icon: Users
  }
}

// Modern 2D Pyramid Component
const Pyramid2D = ({ activeLayer, setActiveLayer }) => {
  const layers = [
    { key: 'winner', width: 120, label: '👑 Winner', count: 1 },
    { key: 'finals', width: 200, label: '🏆 Finals', count: 2 },
    { key: 'semiFinals', width: 280, label: '🥉 Semi Finals', count: 4 },
    { key: 'quarterFinals', width: 360, label: '⚡ Quarter Finals', count: 8 },
    { key: 'enrolled', width: 440, label: '🔥 Enrolled', count: 16 }
  ]

  return (
    <div className="flex flex-col items-center gap-3 py-8">
      {layers.map((layer, index) => {
        const stageData = tournamentData[layer.key]
        const isActive = activeLayer === layer.key
        
        return (
          <motion.div
            key={layer.key}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: index * 0.1, type: 'spring', stiffness: 100 }}
            whileHover={{ scale: 1.05 }}
            onClick={() => setActiveLayer(layer.key)}
            className={`relative cursor-pointer transition-all duration-300`}
            style={{ width: `${layer.width}px` }}
          >
            {/* Glow effect for active layer */}
            {isActive && (
              <motion.div
                animate={{
                  boxShadow: [
                    `0 0 20px ${stageData.color}80`,
                    `0 0 40px ${stageData.color}`,
                    `0 0 20px ${stageData.color}80`
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 rounded-lg"
              />
            )}
            
            {/* Layer block */}
            <div
              className={`relative px-6 py-4 rounded-lg transition-all duration-300 border-2 ${
                isActive ? 'border-white' : 'border-transparent'
              }`}
              style={{
                background: `linear-gradient(135deg, ${stageData.color}20, ${stageData.color}40)`,
                backdropFilter: 'blur(10px)'
              }}
            >
              {/* Animated background pattern */}
              <div className="absolute inset-0 opacity-10 overflow-hidden rounded-lg">
                <motion.div
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                  className="h-full w-full"
                  style={{
                    background: `repeating-linear-gradient(45deg, ${stageData.color}, ${stageData.color} 10px, transparent 10px, transparent 20px)`
                  }}
                />
              </div>
              
              {/* Content */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="text-white font-bold text-lg">{layer.label}</span>
                <div className="flex items-center gap-2">
                  <span className="text-white/80 text-sm">{layer.count} players</span>
                  {isActive && (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    >
                      <Zap className="w-4 h-4 text-yellow-400" />
                    </motion.div>
                  )}
                </div>
              </div>
              
              {/* Sparkle effects for winner */}
              {layer.key === 'winner' && (
                <>
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-yellow-400 rounded-full"
                      style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`
                      }}
                      animate={{
                        scale: [0, 1, 0],
                        opacity: [0, 1, 0]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.4
                      }}
                    />
                  ))}
                </>
              )}
            </div>
            
            {/* Connecting lines to next layer */}
            {index < layers.length - 1 && (
              <div className="flex justify-center">
                <motion.div
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                  className="w-0.5 h-3 bg-gradient-to-b from-gray-600 to-transparent"
                />
              </div>
            )}
          </motion.div>
        )
      })}
    </div>
  )
}

// Enhanced Player Card with stats
const PlayerCard = ({ player, index, stageData }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: index * 0.05, type: 'spring', stiffness: 200 }}
      whileHover={{ scale: 1.05, y: -5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`relative p-4 rounded-xl bg-gradient-to-br ${stageData.gradient} shadow-lg overflow-hidden group cursor-pointer`}
    >
      {/* Animated background glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 transition-all duration-500 group-hover:translate-x-full"></div>
      
      {/* Rank badge */}
      <div className="absolute top-2 right-2 w-8 h-8 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center">
        <span className="text-white font-bold text-xs">#{player.placement}</span>
      </div>

      {/* Player info */}
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-3">
          <div className="text-3xl">{player.avatar}</div>
          <div className="flex-1">
            <p className="text-white font-bold text-lg">{player.uid}</p>
            <p className="text-white/80 text-sm">{player.name}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 pt-3 border-t border-white/20">
          <div className="text-center">
            <p className="text-white/60 text-xs">Score</p>
            <p className="text-white font-bold">{player.score}</p>
          </div>
          <div className="text-center">
            <p className="text-white/60 text-xs">Kills</p>
            <p className="text-white font-bold">{player.kills}</p>
          </div>
          <div className="text-center">
            <p className="text-white/60 text-xs">Rank</p>
            <p className="text-white font-bold">#{player.placement}</p>
          </div>
        </div>
      </div>

      {/* Hover shine effect */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent pointer-events-none"
          />
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// Stage selector with enhanced design
const StageSelector = ({ stages, activeStage, setActiveStage }) => {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      {stages.map((stage) => {
        const StageIcon = stage.icon
        const isActive = activeStage === stage.key
        
        return (
          <motion.button
            key={stage.key}
            onClick={() => setActiveStage(stage.key)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`relative px-5 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-3 overflow-hidden group ${
              isActive
                ? `bg-gradient-to-r ${stage.gradient} text-white shadow-2xl`
                : 'bg-gray-800/50 text-gray-400 hover:bg-gray-700/50 backdrop-blur-sm border border-gray-700'
            }`}
          >
            {/* Animated background for active */}
            {isActive && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              />
            )}
            
            <StageIcon className={`w-5 h-5 relative z-10 ${isActive ? 'animate-pulse' : ''}`} />
            <span className="relative z-10">{stage.title}</span>
            <span className={`relative z-10 text-xs px-2 py-1 rounded-full ${
              isActive ? 'bg-black/30' : 'bg-white/10'
            }`}>
              {stage.count}
            </span>
          </motion.button>
        )
      })}
    </div>
  )
}

const TournamentPyramidEnhanced = () => {
  const [activeLayer, setActiveLayer] = useState('enrolled')
  const [searchTerm, setSearchTerm] = useState('')
  const [showSearch, setShowSearch] = useState(false)

  const stageData = tournamentData[activeLayer]
  const StageIcon = stageData.icon

  const filteredPlayers = stageData.players.filter(
    (player) =>
      player.uid.toLowerCase().includes(searchTerm.toLowerCase()) ||
      player.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const stages = Object.entries(tournamentData).map(([key, data]) => ({
    key,
    title: data.title,
    icon: data.icon,
    gradient: data.gradient,
    count: data.players.length
  })).reverse()

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gaming-dark via-black to-gaming-dark relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="flex flex-col gap-3 items-center mb-6">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-full border border-yellow-500/30 animate-pulse"
            >
              <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
              <span className="text-yellow-500 font-bold">HISTORIC FIRST - FREE FIRE PC TOURNAMENT</span>
            </motion.div>
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25, type: 'spring', stiffness: 200 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-full border border-red-500/30"
            >
              <Award className="w-5 h-5 text-red-500" />
              <span className="text-red-500 font-semibold">Live Tournament</span>
            </motion.div>
          </div>
          
          <h2 className="text-6xl font-black mb-4 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
            Tournament Bracket
          </h2>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto">
            First time in Free Fire PC history - Track player progression through our interactive 2D pyramid
          </p>
        </motion.div>

        {/* Stage Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <StageSelector stages={stages} activeStage={activeLayer} setActiveStage={setActiveLayer} />
        </motion.div>

        {/* 2D Pyramid Visualization */}
        <motion.div
          key={activeLayer}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-12"
        >
          <div className="card overflow-hidden border-2 border-gray-800/50 shadow-2xl bg-gradient-to-b from-gray-900 to-black">
            <Pyramid2D activeLayer={activeLayer} setActiveLayer={setActiveLayer} />
          </div>
        </motion.div>

        {/* Player List Section */}
        <motion.div
          key={`${activeLayer}-list`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="card border-2 border-gray-800/50 shadow-2xl"
        >
          {/* Section Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
            <div className="flex items-center gap-4">
              <div className={`p-4 rounded-xl bg-gradient-to-br ${stageData.gradient} shadow-lg`}>
                <StageIcon className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-3xl font-bold text-white flex items-center gap-2">
                  {stageData.title}
                  <TrendingUp className="w-6 h-6 text-green-500" />
                </h3>
                <p className="text-gray-400">
                  {stageData.players.length} qualified player{stageData.players.length !== 1 ? 's' : ''}
                </p>
              </div>
            </div>

            {/* Search Bar */}
            <div className="flex items-center gap-3">
              <AnimatePresence>
                {showSearch && (
                  <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 'auto', opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    className="relative"
                  >
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search UID or Name..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="input-field pl-10 pr-10 w-64"
                      autoFocus
                    />
                    {searchTerm && (
                      <button
                        onClick={() => setSearchTerm('')}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
              
              <button
                onClick={() => setShowSearch(!showSearch)}
                className={`p-3 rounded-lg transition-all ${
                  showSearch 
                    ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white' 
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                }`}
              >
                {showSearch ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Players Grid */}
          {filteredPlayers.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredPlayers.map((player, index) => (
                <PlayerCard
                  key={player.uid}
                  player={player}
                  index={index}
                  stageData={stageData}
                />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16"
            >
              <Search className="w-20 h-20 text-gray-700 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">No players found matching "{searchTerm}"</p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
}

export default TournamentPyramidEnhanced
