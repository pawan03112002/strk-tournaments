import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Hero3D from '../components/Hero3D'
import GameInfo from '../components/GameInfo'
import TeamPyramid from '../components/TeamPyramid'
import { Trophy, Shield, Users, Download, Monitor, Zap, AlertCircle, CheckCircle, XCircle } from 'lucide-react'

const features = [
  {
    icon: Shield,
    title: 'Secure Platform',
    description: 'Advanced security measures to protect your data and transactions',
    color: 'text-blue-500'
  },
  {
    icon: Users,
    title: 'Active Community',
    description: 'Join thousands of passionate Free Fire PC players worldwide',
    color: 'text-purple-500'
  },
  {
    icon: Trophy,
    title: 'Fair Competition',
    description: 'Advanced anti-cheat system ensures fair play for everyone',
    color: 'text-red-500'
  }
]

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section with 3D Animation */}
      <Hero3D />

      {/* Grand Prize Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gaming-dark to-black relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-yellow-500/20 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1.5s' }}></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="text-5xl md:text-6xl font-black text-white mb-4">
                GRAND PRIZE
              </h2>
              <p className="text-gray-400 text-xl">Winner Takes It All!</p>
            </motion.div>

            {/* Prize Display */}
            <div className="grid md:grid-cols-2 gap-8 items-center max-w-5xl mx-auto">
              {/* 3D Animated Trophy */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="flex justify-center"
              >
                <motion.div
                  animate={{ 
                    y: [0, -20, 0],
                    rotateY: [0, 360]
                  }}
                  transition={{ 
                    y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                    rotateY: { duration: 10, repeat: Infinity, ease: "linear" }
                  }}
                  className="relative"
                  style={{ perspective: '1000px' }}
                >
                  {/* Glow Effect */}
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 0.8, 0.5]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full blur-3xl"
                  />
                  
                  {/* Trophy */}
                  <div className="relative text-9xl md:text-[12rem] filter drop-shadow-2xl">
                    🏆
                  </div>

                  {/* Sparkles */}
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute text-4xl"
                      style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                      }}
                      animate={{
                        scale: [0, 1, 0],
                        opacity: [0, 1, 0],
                        rotate: [0, 180, 360]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.3
                      }}
                    >
                      ✨
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>

              {/* Prize Amount */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                {/* Indian Rupees */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="card bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border-2 border-yellow-500/50 p-8"
                >
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="text-4xl">🇮🇳</span>
                    <span className="text-gray-400 text-lg">India</span>
                  </div>
                  <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-6xl md:text-7xl font-black bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-500 bg-clip-text text-transparent mb-2"
                  >
                    ₹10,00,000
                  </motion.div>
                  <p className="text-gray-300 text-sm">Ten Lakh Rupees</p>
                </motion.div>

                {/* International */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="card bg-gradient-to-br from-blue-500/20 to-purple-500/20 border-2 border-blue-500/50 p-8"
                >
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="text-4xl">🌍</span>
                    <span className="text-gray-400 text-lg">International</span>
                  </div>
                  <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                    className="text-6xl md:text-7xl font-black bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-2"
                  >
                    $12,000
                  </motion.div>
                  <p className="text-gray-300 text-sm">Twelve Thousand USD</p>
                </motion.div>

                {/* Call to Action */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/30 rounded-lg p-4"
                >
                  <p className="text-white font-bold mb-2">🔥 Limited Slots Available!</p>
                  <p className="text-gray-400 text-sm">
                    Register now to compete for the biggest prize in Free Fire PC history!
                  </p>
                </motion.div>

                {/* Fee Refund Highlight */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-2 border-green-500/50 rounded-lg p-4"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                      💰
                    </motion.div>
                    <p className="text-green-400 font-bold text-lg">100% FEE REFUND!</p>
                  </div>
                  <p className="text-gray-300 text-sm mb-1">
                    Reach <span className="text-yellow-400 font-bold">Quarter Finals</span> and get your registration fee back!
                  </p>
                  <p className="text-gray-400 text-xs">
                    • Teams advancing from Enrollment to Quarter Finals receive full refund
                  </p>
                </motion.div>
              </motion.div>
            </div>

            {/* Additional Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              viewport={{ once: true }}
              className="mt-12 flex flex-wrap justify-center gap-6 text-gray-400"
            >
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-500" />
                <span>Winner Takes All</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-orange-500" />
                <span>20,736 Teams Competing</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-500" />
                <span>83,000+ Players</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-gaming-dark relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-red-500 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold mb-4 text-white">
              Why Choose Us?
            </h2>
            <p className="text-gray-400 text-lg">
              The best platform for Free Fire PC competitive gaming
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card group hover:scale-105"
              >
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-gradient-to-br from-gray-800 to-gray-900 rounded-full group-hover:scale-110 transition-transform">
                    <feature.icon className={`w-8 h-8 ${feature.color}`} />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 text-center">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-center text-sm">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Game Info */}
      <GameInfo />

      {/* Tournament Instructions - Bilingual */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gaming-dark to-black relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1.5s' }}></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold mb-4 text-white">
              Tournament Guidelines
            </h2>
            <p className="text-gray-400 text-lg mb-2">टूर्नामेंट दिशानिर्देश</p>
            <p className="text-orange-500 font-semibold">Read carefully before participating</p>
          </motion.div>

          {/* Instructions Grid */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* English Instructions */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="card"
            >
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-700">
                <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">🇬🇧</span>
                </div>
                <h3 className="text-2xl font-bold text-white">English</h3>
              </div>

              <div className="space-y-4">
                {[
                  { icon: XCircle, text: "Don't use panels and macro keys during the tournament.", color: "text-red-500" },
                  { icon: Download, text: "Download our STRK Recorder application from the downloads page.", color: "text-blue-500" },
                  { icon: AlertCircle, text: "Before the tournament, close all running applications on your PC.", color: "text-yellow-500" },
                  { icon: CheckCircle, text: "Run STRK Recorder - it's safe! If Windows shows a security popup, click 'More info' and 'Run anyway', then start recording.", color: "text-green-500" },
                  { icon: Monitor, text: "Do NOT connect or disconnect any monitor during recording. This will stop recording and result in disqualification.", color: "text-red-500" },
                  { icon: CheckCircle, text: "Launch your emulator and show your macro keys option is disabled.", color: "text-blue-500" },
                  { icon: Trophy, text: "You will be invited to a custom match - join and play fairly.", color: "text-purple-500" },
                  { icon: AlertCircle, text: "Any player found using malpractices during the match will be disqualified immediately.", color: "text-orange-500" },
                  { icon: CheckCircle, text: "After match completion, stop the recording and keep the .ram file (encrypted recording) safe.", color: "text-green-500" },
                  { icon: Users, text: "Our team will contact the winner via provided contact details and request .ram files from all squad members.", color: "text-blue-500" },
                  { icon: Shield, text: "If the winner is found using malpractices, the second place team will be verified, and so on.", color: "text-yellow-500" },
                  { icon: Trophy, text: "Teams reaching Quarter Finals from Enrollment round will receive a FULL FEE REFUND!", color: "text-green-500" },
                  { icon: XCircle, text: "DO NOT stream the tournament on any social media platform (YouTube, Twitch, Facebook, etc.). Streaming is strictly prohibited.", color: "text-red-500" },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex gap-3 p-3 bg-gray-800/30 rounded-lg hover:bg-gray-800/50 transition-colors"
                  >
                    <div className="flex-shrink-0">
                      <item.icon className={`w-5 h-5 ${item.color} mt-0.5`} />
                    </div>
                    <div>
                      <span className="text-orange-500 font-bold mr-2">{index + 1}.</span>
                      <span className="text-gray-300 text-sm">{item.text}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Hindi Instructions */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="card"
            >
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-700">
                <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">🇮🇳</span>
                </div>
                <h3 className="text-2xl font-bold text-white">हिंदी</h3>
              </div>

              <div className="space-y-4">
                {[
                  { icon: XCircle, text: "टूर्नामेंट के दौरान panels और macro keys का उपयोग न करें।", color: "text-red-500" },
                  { icon: Download, text: "Downloads page से हमारा STRK Recorder application डाउनलोड करें।", color: "text-blue-500" },
                  { icon: AlertCircle, text: "टूर्नामेंट से पहले, अपने PC पर चल रहे सभी applications बंद कर दें।", color: "text-yellow-500" },
                  { icon: CheckCircle, text: "STRK Recorder चलाएं - यह सुरक्षित है! यदि Windows security popup दिखाए, तो 'More info' और 'Run anyway' पर क्लिक करें, फिर recording शुरू करें।", color: "text-green-500" },
                  { icon: Monitor, text: "Recording के दौरान कोई भी monitor connect या disconnect न करें। ऐसा करने पर recording बंद हो जाएगी और आप disqualify हो जाएंगे।", color: "text-red-500" },
                  { icon: CheckCircle, text: "अपना emulator launch करें और दिखाएं कि आपका macro keys option disabled है।", color: "text-blue-500" },
                  { icon: Trophy, text: "आपको एक custom match के लिए आमंत्रित किया जाएगा - join करें और निष्पक्ष खेलें।", color: "text-purple-500" },
                  { icon: AlertCircle, text: "Match के दौरान यदि कोई खिलाड़ी malpractices करता पाया जाता है, तो उसे तुरंत disqualify कर दिया जाएगा।", color: "text-orange-500" },
                  { icon: CheckCircle, text: "Match पूरा होने के बाद, recording बंद करें और .ram file (encrypted recording) सुरक्षित रखें।", color: "text-green-500" },
                  { icon: Users, text: "हमारी team विजेता से संपर्क करेगी और सभी squad members से .ram files मांगेगी।", color: "text-blue-500" },
                  { icon: Shield, text: "यदि विजेता malpractices करता पाया जाता है, तो दूसरे स्थान की team को verify किया जाएगा, और इसी तरह आगे।", color: "text-yellow-500" },
                  { icon: Trophy, text: "Enrollment round से Quarter Finals में पहुंचने वाली teams को पूरी FEE REFUND मिलेगी!", color: "text-green-500" },
                  { icon: XCircle, text: "किसी भी social media platform (YouTube, Twitch, Facebook, आदि) पर tournament को stream न करें। Streaming सख्त मना है।", color: "text-red-500" },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex gap-3 p-3 bg-gray-800/30 rounded-lg hover:bg-gray-800/50 transition-colors"
                  >
                    <div className="flex-shrink-0">
                      <item.icon className={`w-5 h-5 ${item.color} mt-0.5`} />
                    </div>
                    <div>
                      <span className="text-orange-500 font-bold mr-2">{index + 1}.</span>
                      <span className="text-gray-300 text-sm">{item.text}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Important Notice */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-12 card bg-gradient-to-r from-red-500/10 to-orange-500/10 border-2 border-red-500/30"
          >
            <div className="flex items-start gap-4">
              <AlertCircle className="w-8 h-8 text-red-500 flex-shrink-0" />
              <div>
                <h4 className="text-xl font-bold text-white mb-2">
                  Important Notice / महत्वपूर्ण सूचना
                </h4>
                <p className="text-gray-300 mb-2">
                  • Failure to comply with any of these guidelines will result in immediate disqualification.
                </p>
                <p className="text-gray-300">
                  • इन दिशानिर्देशों का पालन न करने पर तत्काल disqualification हो सकती है।
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Team Pyramid */}
      <TeamPyramid />

      {/* Download Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-gaming-dark relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/30 rounded-full blur-3xl animate-pulse-slow"></div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="card border-2 border-purple-500/30 overflow-hidden"
          >
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Left Side - Info */}
              <div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center gap-2 px-3 py-1 bg-purple-500/20 rounded-full mb-4 border border-purple-500/30"
                >
                  <Monitor className="w-4 h-4 text-purple-400" />
                  <span className="text-purple-400 text-sm font-semibold">Recording Software</span>
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent"
                >
                  STRK Recorder
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="text-gray-400 text-lg mb-4"
                >
                  Capture your best gaming moments with our professional screen recording software.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.45 }}
                  className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/20 border border-green-500 rounded-full mb-6"
                >
                  <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3 4a2 2 0 012-2h10a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V4z"/>
                  </svg>
                  <span className="text-green-400 text-sm font-semibold">Standalone EXE - No Installation</span>
                </motion.div>

                {/* Features List */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  className="space-y-3 mb-8"
                >
                  {[
                    { icon: Download, text: 'Standalone EXE - No installation required' },
                    { icon: Monitor, text: 'High-quality screen recording' },
                    { icon: Zap, text: 'Optimized for gaming performance' }
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="p-2 bg-purple-500/20 rounded-lg">
                        <feature.icon className="w-4 h-4 text-purple-400" />
                      </div>
                      <span className="text-gray-300">{feature.text}</span>
                    </div>
                  ))}
                </motion.div>

                {/* Download Buttons */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <Link
                    to="/downloads"
                    className="group inline-flex items-center justify-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-white font-bold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 hover:scale-105 shadow-lg"
                  >
                    <Download className="w-5 h-5 group-hover:animate-bounce" />
                    Download Now
                    <span className="text-xs opacity-80">(75.4 MB)</span>
                  </Link>
                  <Link
                    to="/downloads"
                    className="inline-flex items-center justify-center px-6 py-3 border-2 border-purple-500 rounded-lg text-purple-400 font-semibold hover:bg-purple-500/10 transition-all duration-300"
                  >
                    Learn More
                  </Link>
                </motion.div>
              </div>

              {/* Right Side - Visual */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="relative"
              >
                <div className="relative bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl p-8 border border-purple-500/30">
                  {/* App Icon Mockup */}
                  <div className="flex justify-center">
                    <div className="w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl flex items-center justify-center shadow-2xl transform hover:scale-110 transition-transform duration-300">
                      <Monitor className="w-16 h-16 text-white" />
                    </div>
                  </div>

                  {/* Floating elements */}
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="absolute -top-4 -right-4 w-20 h-20 bg-purple-500/30 rounded-full blur-2xl"
                  ></motion.div>
                  <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="absolute -bottom-4 -left-4 w-24 h-24 bg-pink-500/30 rounded-full blur-2xl"
                  ></motion.div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-red-600 to-orange-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center relative z-10"
        >
          <h2 className="text-5xl font-bold mb-6 text-white">
            Ready to Compete?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of players and start your journey to becoming a Free Fire PC champion today!
          </p>
          <div className="flex justify-center">
            <a
              href="/register"
              className="bg-white text-red-600 font-bold py-4 px-10 rounded-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105 text-lg"
            >
              Create Account
            </a>
          </div>
        </motion.div>
      </section>
    </div>
  )
}

export default Home
