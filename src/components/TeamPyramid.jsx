import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Crown, Trophy, Medal, Target, Users, ChevronDown } from 'lucide-react'
import useTournamentStore from '../store/tournamentStore'

// Stage configuration
const stageConfig = {
  champion: {
    title: 'Champion',
    icon: Crown,
    color: '#FFD700',
    gradient: 'from-yellow-400 via-yellow-500 to-amber-600'
  },
  finals: {
    title: 'Finals',
    icon: Trophy,
    color: '#C0C0C0',
    gradient: 'from-gray-300 via-gray-400 to-gray-500'
  },
  semiFinals: {
    title: 'Semi Finals',
    icon: Medal,
    color: '#CD7F32',
    gradient: 'from-orange-400 via-amber-500 to-yellow-600'
  },
  quarterFinals: {
    title: 'Quarter Finals',
    icon: Target,
    color: '#7c3aed',
    gradient: 'from-purple-500 via-violet-600 to-purple-700'
  },
  enrolled: {
    title: 'Enrolled Teams',
    icon: Users,
    color: '#ef4444',
    gradient: 'from-red-500 via-rose-600 to-pink-600'
  }
}

const TeamPyramid = () => {
  const { registeredTeams } = useTournamentStore()
  const [activeStage, setActiveStage] = useState('enrolled')
  const [expandedStage, setExpandedStage] = useState(null)
  const [showFullList, setShowFullList] = useState(false)
  const [selectedStage, setSelectedStage] = useState(null)
  const [modalPage, setModalPage] = useState(0)

  // Filter teams by stage
  const getTeamsByStage = (stage) => {
    return registeredTeams
      .filter(team => team.stage === stage)
      .map(team => ({
        name: team.teamNumber,
        teamName: team.teamName,
        logo: team.teamLogo || '🎮',
        wins: 0
      }))
  }

  // Build tournament stages with real team data
  const tournamentStages = {
    champion: {
      ...stageConfig.champion,
      teams: getTeamsByStage('champion')
    },
    finals: {
      ...stageConfig.finals,
      teams: getTeamsByStage('finals')
    },
    semiFinals: {
      ...stageConfig.semiFinals,
      teams: getTeamsByStage('semiFinals')
    },
    quarterFinals: {
      ...stageConfig.quarterFinals,
      teams: getTeamsByStage('quarterFinals')
    },
    enrolled: {
      ...stageConfig.enrolled,
      teams: getTeamsByStage('enrolled')
    }
  }

  const stages = [
    { key: 'champion', width: 140 },
    { key: 'finals', width: 220 },
    { key: 'semiFinals', width: 300 },
    { key: 'quarterFinals', width: 380 },
    { key: 'enrolled', width: 460 }
  ]

  const handleStageClick = (key) => {
    setActiveStage(key)
    setExpandedStage(expandedStage === key ? null : key)
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gaming-dark via-black to-gaming-dark relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-500/30 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-full mb-6 border border-yellow-500/30"
          >
            <Trophy className="w-5 h-5 text-yellow-500" />
            <span className="text-yellow-500 font-bold">Tournament Progression</span>
          </motion.div>
          
          <h2 className="text-5xl font-black mb-4 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
            Team Standings
          </h2>
          <p className="text-gray-400 text-xl">
            Click on each stage to view competing teams
          </p>
        </motion.div>

        {/* Pyramid */}
        <div className="card bg-gradient-to-b from-gray-900 to-black border-2 border-gray-800/50 overflow-hidden mb-8">
          <div className="flex flex-col items-center gap-0 py-8">
            {stages.map((stage, index) => {
              const stageData = tournamentStages[stage.key]
              const isActive = activeStage === stage.key
              const isExpanded = expandedStage === stage.key
              const StageIcon = stageData.icon

              return (
                <div key={stage.key} className="w-full flex flex-col items-center">
                  {/* Stage Block */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, type: 'spring', stiffness: 100 }}
                    whileHover={{ scale: 1.03 }}
                    onClick={() => handleStageClick(stage.key)}
                    className="relative cursor-pointer transition-all duration-300 mb-2"
                    style={{ width: `${stage.width}px` }}
                  >
                    {/* Glow effect for active stage */}
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
                        className="absolute inset-0 rounded-xl"
                      />
                    )}
                    
                    {/* Stage content */}
                    <div
                      className={`relative px-4 py-3 rounded-xl transition-all duration-300 border-2 ${
                        isActive ? 'border-white' : 'border-transparent'
                      }`}
                      style={{
                        background: `linear-gradient(135deg, ${stageData.color}20, ${stageData.color}40)`,
                        backdropFilter: 'blur(10px)'
                      }}
                    >
                      {/* Animated background pattern */}
                      <div className="absolute inset-0 opacity-10 overflow-hidden rounded-xl">
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
                        <div className="flex items-center gap-2">
                          <StageIcon className="w-5 h-5 text-white" />
                          <span className="text-white font-bold text-sm md:text-base">{stageData.title}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                            <span className="text-white font-bold text-sm">{stageData.teams.length}</span>
                          </div>
                          <motion.div
                            animate={{ rotate: isExpanded ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <ChevronDown className="w-4 h-4 text-white/60" />
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Expanded Teams List */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="w-full max-w-2xl overflow-hidden mb-4"
                      >
                        <div className="px-4 py-4 bg-gray-900/50 rounded-lg border border-gray-700/50 backdrop-blur-sm">
                          {stageData.teams.length > 20 ? (
                            <div className="text-center py-6">
                              <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-gray-700 to-gray-800 rounded-lg border border-gray-600 mb-4">
                                <Users className="w-6 h-6 text-white" />
                                <div className="text-left">
                                  <p className="text-white font-bold text-xl">{stageData.teams.length.toLocaleString()}</p>
                                  <p className="text-gray-400 text-sm">Teams Competing</p>
                                </div>
                              </div>
                              <button
                                onClick={() => {
                                  setSelectedStage(stage.key)
                                  setModalPage(0)
                                  setShowFullList(true)
                                }}
                                className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
                              >
                                View Details
                              </button>
                            </div>
                          ) : stageData.teams.length === 0 ? (
                            <div className="text-center py-8">
                              <Users className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                              <p className="text-gray-400">No teams at this stage yet</p>
                              <p className="text-gray-500 text-sm mt-1">Teams will appear here as they progress</p>
                            </div>
                          ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              {stageData.teams.map((team, teamIndex) => (
                                <motion.div
                                  key={teamIndex}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: teamIndex * 0.05 }}
                                  className={`flex items-center justify-between p-3 rounded-lg bg-gradient-to-r ${stageData.gradient} bg-opacity-20 border border-white/10`}
                                >
                                  <div className="flex items-center gap-3">
                                    <span className="text-2xl">{typeof team.logo === 'string' && team.logo.startsWith('data:') ? (
                                      <img src={team.logo} alt="Team Logo" className="w-6 h-6 rounded-full object-cover" />
                                    ) : (
                                      team.logo
                                    )}</span>
                                    <div>
                                      <p className="text-white font-semibold text-sm">{team.name}</p>
                                      {team.teamName && (
                                        <p className="text-white/60 text-xs">{team.teamName}</p>
                                      )}
                                    </div>
                                  </div>
                                  {teamIndex === 0 && stage.key !== 'enrolled' && (
                                    <Trophy className="w-4 h-4 text-yellow-400" />
                                  )}
                                </motion.div>
                              ))}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Connecting line to next stage */}
                  {index < stages.length - 1 && (
                    <div className="flex justify-center w-full py-1">
                      <motion.div
                        initial={{ scaleY: 0 }}
                        whileInView={{ scaleY: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 + 0.2 }}
                        className="w-0.5 h-4 bg-gradient-to-b from-gray-600 to-transparent"
                      />
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Stats Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-5 gap-4"
        >
          {stages.map((stage) => {
            const stageData = tournamentStages[stage.key]
            const StageIcon = stageData.icon
            return (
              <div key={stage.key} className="card text-center">
                <StageIcon className="w-6 h-6 mx-auto mb-2" style={{ color: stageData.color }} />
                <div className="text-2xl font-bold text-white mb-1">
                  {stageData.teams.length}
                </div>
                <p className="text-gray-400 text-xs">{stageData.title}</p>
              </div>
            )
          })}
        </motion.div>

        {/* Total Count */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-4"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-full">
            <Users className="w-5 h-5 text-blue-400" />
            <span className="text-white font-bold">
              Total Registered: {stages.reduce((acc, stage) => acc + tournamentStages[stage.key].teams.length, 0).toLocaleString()} teams
            </span>
          </div>
          <p className="text-gray-500 text-sm mt-2">Click on any stage to view competing teams</p>
        </motion.div>
      </div>

      {/* Full Team List Modal */}
      <AnimatePresence>
        {showFullList && selectedStage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => {
              setShowFullList(false)
              setModalPage(0)
            }}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gray-900 rounded-xl border-2 border-gray-700 max-w-4xl w-full max-h-[80vh] overflow-hidden"
            >
              {/* Modal Header */}
              <div className={`bg-gradient-to-r ${tournamentStages[selectedStage].gradient} p-6 flex items-center justify-between`}>
                <div className="flex items-center gap-3">
                  {(() => {
                    const StageIcon = tournamentStages[selectedStage].icon
                    return <StageIcon className="w-8 h-8 text-white" />
                  })()}
                  <div>
                    <h3 className="text-2xl font-bold text-white">{tournamentStages[selectedStage].title}</h3>
                    <p className="text-white/80">{tournamentStages[selectedStage].teams.length.toLocaleString()} Teams</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setShowFullList(false)
                    setModalPage(0)
                  }}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Modal Content - Optimized with Pagination */}
              <div className="p-6">
                {(() => {
                  const teams = tournamentStages[selectedStage].teams
                  const itemsPerPage = 100
                  const totalPages = Math.ceil(teams.length / itemsPerPage)
                  const startIndex = modalPage * itemsPerPage
                  const endIndex = startIndex + itemsPerPage
                  const currentTeams = teams.slice(startIndex, endIndex)
                  
                  return (
                    <>
                      {/* Pagination Info */}
                      <div className="mb-4 flex items-center justify-between flex-wrap gap-2">
                        <p className="text-gray-400 text-sm">
                          Showing {startIndex + 1}-{Math.min(endIndex, teams.length)} of {teams.length.toLocaleString()} teams
                        </p>
                        {totalPages > 1 && (
                          <div className="flex gap-2">
                            <button
                              onClick={() => setModalPage(Math.max(0, modalPage - 1))}
                              disabled={modalPage === 0}
                              className="px-3 py-1 bg-gray-700 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600 transition-colors text-sm"
                            >
                              Previous
                            </button>
                            <span className="px-3 py-1 text-gray-300 text-sm">
                              Page {modalPage + 1} / {totalPages}
                            </span>
                            <button
                              onClick={() => setModalPage(Math.min(totalPages - 1, modalPage + 1))}
                              disabled={modalPage === totalPages - 1}
                              className="px-3 py-1 bg-gray-700 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600 transition-colors text-sm"
                            >
                              Next
                            </button>
                          </div>
                        )}
                      </div>
                      
                      {/* Teams Grid */}
                      <div className="overflow-y-auto max-h-[50vh]">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                          {currentTeams.map((team, index) => (
                            <div
                              key={startIndex + index}
                              className={`flex items-center gap-2 p-3 rounded-lg bg-gradient-to-r ${tournamentStages[selectedStage].gradient} bg-opacity-20 border border-white/10`}
                            >
                              <span className="text-xl">{typeof team.logo === 'string' && team.logo.startsWith('data:') ? (
                                <img src={team.logo} alt="Team Logo" className="w-6 h-6 rounded-full object-cover" />
                              ) : (
                                team.logo
                              )}</span>
                              <div className="flex-1 min-w-0">
                                <p className="text-white font-semibold text-sm truncate">{team.name}</p>
                                {team.teamName && (
                                  <p className="text-white/60 text-xs truncate">{team.teamName}</p>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  )
                })()}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default TeamPyramid
