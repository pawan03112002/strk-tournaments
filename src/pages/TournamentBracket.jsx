import { useState, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Text, MeshDistortMaterial } from '@react-three/drei'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Trophy, Users, Crown, Target, Medal } from 'lucide-react'
import * as THREE from 'three'

// Mock player data for each tournament stage
const tournamentData = {
  enrolled: [
    { uid: 'UID001', name: 'Player Alpha', status: 'active' },
    { uid: 'UID002', name: 'Player Beta', status: 'active' },
    { uid: 'UID003', name: 'Player Gamma', status: 'active' },
    { uid: 'UID004', name: 'Player Delta', status: 'active' },
    { uid: 'UID005', name: 'Player Epsilon', status: 'active' },
    { uid: 'UID006', name: 'Player Zeta', status: 'active' },
    { uid: 'UID007', name: 'Player Eta', status: 'active' },
    { uid: 'UID008', name: 'Player Theta', status: 'active' },
    { uid: 'UID009', name: 'Player Iota', status: 'active' },
    { uid: 'UID010', name: 'Player Kappa', status: 'active' },
    { uid: 'UID011', name: 'Player Lambda', status: 'active' },
    { uid: 'UID012', name: 'Player Mu', status: 'active' },
    { uid: 'UID013', name: 'Player Nu', status: 'active' },
    { uid: 'UID014', name: 'Player Xi', status: 'active' },
    { uid: 'UID015', name: 'Player Omicron', status: 'active' },
    { uid: 'UID016', name: 'Player Pi', status: 'active' },
  ],
  quarterFinals: [
    { uid: 'UID001', name: 'Player Alpha', status: 'qualified' },
    { uid: 'UID004', name: 'Player Delta', status: 'qualified' },
    { uid: 'UID005', name: 'Player Epsilon', status: 'qualified' },
    { uid: 'UID008', name: 'Player Theta', status: 'qualified' },
    { uid: 'UID009', name: 'Player Iota', status: 'qualified' },
    { uid: 'UID012', name: 'Player Mu', status: 'qualified' },
    { uid: 'UID013', name: 'Player Nu', status: 'qualified' },
    { uid: 'UID016', name: 'Player Pi', status: 'qualified' },
  ],
  semiFinals: [
    { uid: 'UID001', name: 'Player Alpha', status: 'qualified' },
    { uid: 'UID005', name: 'Player Epsilon', status: 'qualified' },
    { uid: 'UID009', name: 'Player Iota', status: 'qualified' },
    { uid: 'UID013', name: 'Player Nu', status: 'qualified' },
  ],
  finals: [
    { uid: 'UID001', name: 'Player Alpha', status: 'finalist' },
    { uid: 'UID009', name: 'Player Iota', status: 'finalist' },
  ],
  winner: [
    { uid: 'UID001', name: 'Player Alpha', status: 'winner' },
  ]
}

// 3D Pyramid Layer Component
const PyramidLayer = ({ position, size, color, label, rotation }) => {
  const meshRef = useRef()

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = rotation + state.clock.getElapsedTime() * 0.1
    }
  })

  return (
    <group position={position}>
      <mesh ref={meshRef}>
        <cylinderGeometry args={[size, size * 1.5, 0.3, 4]} />
        <MeshDistortMaterial
          color={color}
          distort={0.2}
          speed={2}
          roughness={0.2}
          metalness={0.8}
          transparent
          opacity={0.7}
        />
      </mesh>
      <Text
        position={[0, 0.3, 0]}
        fontSize={0.3}
        color="white"
        anchorX="center"
        anchorY="middle"
        fontWeight="bold"
      >
        {label}
      </Text>
    </group>
  )
}

// 3D Pyramid Scene
const PyramidScene = ({ activeLayer, setActiveLayer }) => {
  const layers = [
    { position: [0, 4, 0], size: 0.5, color: '#FFD700', label: 'Winner', key: 'winner', rotation: 0 },
    { position: [0, 3, 0], size: 1, color: '#C0C0C0', label: 'Finals', key: 'finals', rotation: Math.PI / 4 },
    { position: [0, 2, 0], size: 1.5, color: '#CD7F32', label: 'Semi Finals', key: 'semiFinals', rotation: Math.PI / 2 },
    { position: [0, 1, 0], size: 2, color: '#7c3aed', label: 'Quarter Finals', key: 'quarterFinals', rotation: Math.PI / 3 },
    { position: [0, 0, 0], size: 2.5, color: '#ef4444', label: 'Enrolled', key: 'enrolled', rotation: 0 },
  ]

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -10]} color="#ff0000" intensity={1} />
      <pointLight position={[10, 10, 10]} color="#7c3aed" intensity={1} />
      
      {layers.map((layer, index) => (
        <group
          key={layer.key}
          onClick={() => setActiveLayer(layer.key)}
          onPointerOver={(e) => {
            e.stopPropagation()
            document.body.style.cursor = 'pointer'
          }}
          onPointerOut={() => {
            document.body.style.cursor = 'default'
          }}
        >
          <PyramidLayer {...layer} />
        </group>
      ))}
      
      <OrbitControls
        enableZoom={true}
        enablePan={true}
        minDistance={5}
        maxDistance={15}
        autoRotate={false}
      />
    </>
  )
}

// Player List Component
const PlayerList = ({ players, searchTerm }) => {
  const filteredPlayers = players.filter(
    (player) =>
      player.uid.toLowerCase().includes(searchTerm.toLowerCase()) ||
      player.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getStatusColor = (status) => {
    switch (status) {
      case 'winner': return 'bg-yellow-500/20 border-yellow-500'
      case 'finalist': return 'bg-gray-400/20 border-gray-400'
      case 'qualified': return 'bg-purple-500/20 border-purple-500'
      default: return 'bg-red-500/20 border-red-500'
    }
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {filteredPlayers.map((player, index) => (
        <motion.div
          key={player.uid}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          className={`p-4 rounded-lg border-2 ${getStatusColor(player.status)} backdrop-blur-sm`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-bold">{player.uid}</p>
              <p className="text-gray-400 text-sm">{player.name}</p>
            </div>
            <div className="text-right">
              <span className={`text-xs px-2 py-1 rounded-full ${
                player.status === 'winner' ? 'bg-yellow-500 text-black' :
                player.status === 'finalist' ? 'bg-gray-400 text-black' :
                player.status === 'qualified' ? 'bg-purple-500 text-white' :
                'bg-red-500 text-white'
              }`}>
                {player.status}
              </span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

const TournamentBracket = () => {
  const [activeLayer, setActiveLayer] = useState('enrolled')
  const [searchTerm, setSearchTerm] = useState('')

  const layerInfo = {
    enrolled: { title: 'Enrolled Players', icon: Users, color: 'from-red-500 to-orange-500', count: 16 },
    quarterFinals: { title: 'Quarter Finals', icon: Target, color: 'from-purple-500 to-pink-500', count: 8 },
    semiFinals: { title: 'Semi Finals', icon: Medal, color: 'from-blue-500 to-purple-500', count: 4 },
    finals: { title: 'Finals', icon: Trophy, color: 'from-gray-400 to-gray-600', count: 2 },
    winner: { title: 'Winner', icon: Crown, color: 'from-yellow-500 to-orange-500', count: 1 },
  }

  const currentLayer = layerInfo[activeLayer]
  const Icon = currentLayer.icon
  const currentPlayers = tournamentData[activeLayer]

  return (
    <div className="min-h-screen pt-20 pb-10">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-500/20 border border-yellow-500 rounded-full mb-4 animate-pulse">
            <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
            </svg>
            <span className="text-yellow-400 font-black text-sm">FIRST EVER FREE FIRE PC TOURNAMENT</span>
          </div>
          
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
            Tournament Bracket
          </h1>
          <p className="text-gray-400 text-lg mb-4">
            3D Interactive Tournament Pyramid - Click on layers to explore
          </p>
          
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 border-2 border-blue-500 rounded-full">
            <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V4z"/>
            </svg>
            <span className="text-blue-400 font-bold">PC PLAYERS ONLY</span>
          </div>
        </motion.div>

        {/* Layer Navigation Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {Object.entries(layerInfo).map(([key, info]) => {
            const LayerIcon = info.icon
            return (
              <button
                key={key}
                onClick={() => setActiveLayer(key)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 ${
                  activeLayer === key
                    ? `bg-gradient-to-r ${info.color} text-white shadow-lg scale-105`
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                }`}
              >
                <LayerIcon className="w-4 h-4" />
                {info.title}
                <span className="text-xs bg-black/30 px-2 py-0.5 rounded-full">
                  {info.count}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* 3D Pyramid Visualization */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="card overflow-hidden"
          style={{ height: '500px' }}
        >
          <Canvas camera={{ position: [0, 3, 10], fov: 50 }}>
            <PyramidScene activeLayer={activeLayer} setActiveLayer={setActiveLayer} />
          </Canvas>
        </motion.div>
      </div>

      {/* Player List Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          key={activeLayer}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card"
        >
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
            <div className="flex items-center gap-3">
              <div className={`p-3 rounded-lg bg-gradient-to-r ${currentLayer.color}`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">{currentLayer.title}</h2>
                <p className="text-gray-400 text-sm">
                  {currentPlayers.length} player{currentPlayers.length !== 1 ? 's' : ''}
                </p>
              </div>
            </div>

            {/* Search Bar */}
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search UID or Name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10 w-full"
              />
            </div>
          </div>

          {/* Players Grid */}
          {currentPlayers.length > 0 ? (
            <PlayerList players={currentPlayers} searchTerm={searchTerm} />
          ) : (
            <div className="text-center py-12">
              <Trophy className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400">No players in this stage yet</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default TournamentBracket
