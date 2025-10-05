import { motion } from 'framer-motion'
import { Download, Monitor, Shield, Zap, CheckCircle, AlertCircle, HardDrive, Cpu, Package } from 'lucide-react'

const Downloads = () => {
  const handleDownload = () => {
    // Create a download link for the StrkRecorder.exe file
    const link = document.createElement('a')
    link.href = '/StrkRecorder.exe'
    link.download = 'StrkRecorder.exe'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const features = [
    {
      icon: Package,
      title: 'Standalone Application',
      description: 'No installation required - just download and run the .exe file'
    },
    {
      icon: Monitor,
      title: 'Screen Recording',
      description: 'Record your gameplay in high quality with minimal performance impact'
    },
    {
      icon: Zap,
      title: 'High Performance',
      description: 'Optimized for gaming with hardware acceleration support'
    },
    {
      icon: Shield,
      title: 'Secure & Safe',
      description: 'No malware, no adware - completely safe to use'
    }
  ]

  const systemRequirements = [
    { label: 'File Type', value: 'Standalone Executable (.exe)' },
    { label: 'Operating System', value: 'Windows 10/11 (64-bit)' },
    { label: 'Processor', value: 'Intel Core i3 or AMD equivalent' },
    { label: 'RAM', value: '4 GB minimum, 8 GB recommended' },
    { label: 'Storage', value: 'No installation - Run directly from download' },
    { label: 'Graphics', value: 'DirectX 11 compatible' }
  ]

  return (
    <div className="min-h-screen pt-20 pb-10">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gaming-dark to-black relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-96 h-96 bg-red-500 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            {/* App Icon */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-red-500 to-orange-500 rounded-3xl mb-6 shadow-2xl"
            >
              <Package className="w-12 h-12 text-white" />
            </motion.div>

            <h1 className="text-6xl font-black mb-4 bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
              STRK Recorder
            </h1>
            <p className="text-2xl text-gray-300 mb-4">
              Professional Screen Recording Software
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 border border-green-500 rounded-full mb-8">
              <Package className="w-5 h-5 text-green-400" />
              <span className="text-green-400 font-bold">Standalone EXE - No Installation Required</span>
            </div>
            <p className="text-gray-400 text-lg mb-12 max-w-2xl mx-auto">
              Capture your best gaming moments with our powerful, portable screen recording application. 
              Just download and run - no installation needed!
            </p>

            {/* Download Button */}
            <motion.button
              onClick={handleDownload}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl text-white font-bold text-lg shadow-2xl overflow-hidden"
            >
              {/* Animated background */}
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <Download className="w-6 h-6 relative z-10 group-hover:animate-bounce" />
              <span className="relative z-10">Download StrkRecorder.exe</span>
              <span className="relative z-10 text-sm opacity-80">(75.4 MB)</span>
            </motion.button>

            {/* Version & Update Info */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Version 1.0.0</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Standalone EXE</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>No Installation</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Free Download</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Features</h2>
            <p className="text-gray-400">Everything you need to create professional recordings</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card text-center group hover:scale-105 transition-transform"
              >
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-full group-hover:from-red-500/30 group-hover:to-orange-500/30 transition-colors">
                    <feature.icon className="w-8 h-8 text-red-500" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* System Requirements */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-gaming-dark">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="card"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg">
                <Cpu className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white">System Requirements</h2>
            </div>

            <div className="space-y-4">
              {systemRequirements.map((req, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg border border-gray-700/50"
                >
                  <span className="text-gray-400 font-medium">{req.label}</span>
                  <span className="text-white font-semibold">{req.value}</span>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg mb-4"
            >
              <div className="flex items-start gap-3">
                <Package className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-green-500 font-semibold mb-1">Portable Application</p>
                  <p className="text-gray-400 text-sm">
                    StrkRecorder is a standalone executable file. No installation needed - just download, 
                    run the .exe file, and start recording instantly!
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg"
            >
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-yellow-500 font-semibold mb-1">Important Note</p>
                  <p className="text-gray-400 text-sm">
                    Windows Defender or antivirus software might flag the application as unknown. 
                    This is normal for newly released software. The application is completely safe and virus-free.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Getting Started Guide */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gaming-dark">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-white mb-4">How to Use</h2>
            <p className="text-gray-400">Get started instantly - No installation required!</p>
          </motion.div>

          <div className="space-y-6">
            {[
              {
                step: 1,
                title: 'Download StrkRecorder.exe',
                description: 'Click the download button above - the file will be saved to your Downloads folder (75.4 MB)'
              },
              {
                step: 2,
                title: 'Double-Click to Run',
                description: 'Simply double-click StrkRecorder.exe to launch the application - no installation wizard required!'
              },
              {
                step: 3,
                title: 'Handle Security Warning (if shown)',
                description: 'If Windows SmartScreen appears, click "More info" then "Run anyway" - the app is 100% safe'
              },
              {
                step: 4,
                title: 'Start Recording Right Away',
                description: 'The app launches instantly! Configure your settings and start capturing your epic gameplay moments'
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-4 p-6 bg-gray-800/30 rounded-xl border border-gray-700/50"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center font-bold text-white text-xl">
                  {step.step}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-gray-400">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Download CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-red-600 to-orange-600">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Start Recording?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Download STRK Recorder now and capture your best moments!
          </p>
          <motion.button
            onClick={handleDownload}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 px-10 py-5 bg-white text-red-600 rounded-xl font-bold text-xl shadow-2xl hover:bg-gray-100 transition-colors"
          >
            <Download className="w-6 h-6" />
            Download Now
          </motion.button>
        </motion.div>
      </section>
    </div>
  )
}

export default Downloads
