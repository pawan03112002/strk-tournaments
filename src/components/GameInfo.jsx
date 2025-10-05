import { motion } from 'framer-motion'
import { Users, Target, Trophy, Zap } from 'lucide-react'

const GameInfo = () => {
  const squadInfo = [
    {
      icon: Users,
      title: '4-Player Squad',
      description: 'Team up with 3 other players for intense BR matches',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Target,
      title: '48 Players',
      description: '48 players drop into the battlefield for ultimate survival',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Trophy,
      title: 'Last Team Standing',
      description: 'Survive, strategize, and become the last squad alive',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: Zap,
      title: 'Fast-Paced Action',
      description: '15-20 minute matches packed with intense combat',
      color: 'from-red-500 to-rose-500'
    }
  ]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-gaming-dark relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-96 h-96 bg-orange-500 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
            Free Fire BR Squad Mode
          </h2>
          <p className="text-gray-400 text-xl">
            Experience the ultimate battle royale on PC
          </p>
        </motion.div>

        {/* Game Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="card overflow-hidden bg-gradient-to-br from-orange-900/30 to-red-900/30 border-2 border-orange-500/30">
            <div className="grid md:grid-cols-2 gap-8 items-center p-8">
              {/* Left side - Free Fire Official Banner */}
              <div className="relative aspect-video bg-black rounded-lg overflow-hidden border-4 border-orange-500 shadow-2xl">
                {/* Free Fire Official Banner Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-600 via-orange-500 to-red-600" />
                
                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />
                
                {/* Subtle shine effect */}
                <motion.div
                  animate={{ 
                    x: ['-200%', '200%']
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    repeatDelay: 2,
                    ease: "easeInOut"
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                  style={{ transform: 'skewX(-20deg)' }}
                />
                
                {/* Central content - Free Fire Style */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="text-center relative z-10">
                    {/* FREE FIRE Logo */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ 
                        opacity: 1, 
                        scale: [1, 1.1, 1],
                        rotate: [0, -5, 5, 0]
                      }}
                      transition={{ 
                        opacity: { duration: 0.5 },
                        scale: { duration: 2, repeat: Infinity },
                        rotate: { duration: 3, repeat: Infinity }
                      }}
                      className="mb-6"
                    >
                      <div className="text-8xl filter drop-shadow-2xl">🔥</div>
                    </motion.div>
                    
                    {/* FREE FIRE Text */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ 
                        opacity: 1, 
                        y: [0, -8, 0]
                      }}
                      transition={{ 
                        opacity: { duration: 0.5, delay: 0.2 },
                        y: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                      }}
                      className="relative mb-4"
                    >
                      <div className="text-5xl font-black tracking-tighter mb-1"
                        style={{
                          background: 'linear-gradient(to bottom, #ffffff 0%, #ffa500 50%, #ff4500 100%)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.9))'
                        }}
                      >
                        FREE FIRE
                      </div>
                      <div className="text-2xl font-bold text-white tracking-widest"
                        style={{
                          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8), 0 0 10px rgba(255, 165, 0, 0.5)'
                        }}
                      >
                        PC EDITION
                      </div>
                    </motion.div>
                    
                    {/* Battle Royale Badge */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ 
                        opacity: 1, 
                        scale: [1, 1.05, 1]
                      }}
                      transition={{ 
                        opacity: { duration: 0.5, delay: 0.4 },
                        scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                      }}
                      className="inline-block px-6 py-2 bg-black/80 border-2 border-orange-500 rounded-full"
                    >
                      <span className="text-orange-400 font-bold text-sm tracking-wider">BATTLE ROYALE</span>
                    </motion.div>
                  </div>
                </div>
                
                {/* Animated corner accents */}
                <motion.div 
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-orange-500"
                />
                <motion.div 
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                  className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-orange-500"
                />
              </div>

              {/* Right side - Info */}
              <div>
                <h3 className="text-3xl font-bold text-white mb-4">Squad Battle Royale</h3>
                <p className="text-gray-300 mb-6">
                  Join the most intense 4v4 squad battles in Free Fire PC. Drop into the battlefield, 
                  loot weapons, eliminate enemies, and be the last team standing. Play with your squad 
                  in this PC-exclusive tournament!
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: 'Max Players', value: '48' },
                    { label: 'Squad Size', value: '4' },
                    { label: 'Match Time', value: '15-20m' },
                    { label: 'Platform', value: 'PC' }
                  ].map((stat, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.05, borderColor: 'rgba(249, 115, 22, 0.8)' }}
                      className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-3 cursor-pointer transition-all"
                    >
                      <p className="text-orange-400 text-sm mb-1">{stat.label}</p>
                      <motion.p
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                        className="text-white font-bold text-2xl"
                      >
                        {stat.value}
                      </motion.p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Squad Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {squadInfo.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="card group hover:scale-105 transition-transform"
            >
              <div className="mb-4">
                <div className={`inline-flex p-4 rounded-lg bg-gradient-to-r ${item.color}`}>
                  <item.icon className="w-8 h-8 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
              <p className="text-gray-400 text-sm">{item.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Tournament Format Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12"
        >
          <div className="card bg-gradient-to-r from-red-600/20 to-orange-600/20 border-2 border-red-500/30 overflow-hidden">
            {/* Background image */}
            <div 
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: 'url(https://ffesports.garena.com/wp-content/uploads/sites/6/2021/11/Free-Fire-PC.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            />
            <div className="p-8 text-center relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/20 border border-red-500 rounded-full mb-4">
                <Trophy className="w-5 h-5 text-red-400" />
                <span className="text-red-400 font-bold">Tournament Format</span>
              </div>
              <h3 className="text-3xl font-bold text-white mb-4">PC-Only Squad Tournament</h3>
              <p className="text-gray-300 text-lg max-w-3xl mx-auto">
                This is the <span className="text-yellow-400 font-bold">FIRST EVER</span> Free Fire tournament 
                exclusively for PC players. Teams compete in classic Battle Royale squad mode with 
                4 players per team. Prove your skills and dominate the battlefield!
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default GameInfo
