import { useState, useEffect } from 'react'
import { Shield, AlertTriangle } from 'lucide-react'

const IncognitoBlocker = ({ children }) => {
  const [isIncognito, setIsIncognito] = useState(false)
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    const detectIncognito = async () => {
      try {
        // Method 1: Check FileSystem API
        if ('storage' in navigator && 'estimate' in navigator.storage) {
          const { quota } = await navigator.storage.estimate()
          // In incognito, quota is usually very low (< 120MB)
          if (quota < 120000000) {
            setIsIncognito(true)
            setIsChecking(false)
            return
          }
        }

        // Method 2: Check localStorage persistence
        try {
          localStorage.setItem('incognito_test', '1')
          localStorage.removeItem('incognito_test')
        } catch (e) {
          // If localStorage throws error, likely incognito in some browsers
          setIsIncognito(true)
          setIsChecking(false)
          return
        }

        // Method 3: Check if IndexedDB is available
        if (!window.indexedDB) {
          setIsIncognito(true)
          setIsChecking(false)
          return
        }

        // If all checks pass, not in incognito
        setIsIncognito(false)
        setIsChecking(false)
      } catch (error) {
        console.error('Incognito detection error:', error)
        // If detection fails, allow access (fail-safe)
        setIsIncognito(false)
        setIsChecking(false)
      }
    }

    detectIncognito()
  }, [])

  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <div className="text-white text-xl">Checking browser mode...</div>
      </div>
    )
  }

  if (isIncognito) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black px-4">
        <div className="max-w-md w-full bg-red-500/10 border-2 border-red-500 rounded-2xl p-8 text-center">
          <AlertTriangle className="w-20 h-20 text-red-500 mx-auto mb-6 animate-pulse" />
          
          <h1 className="text-3xl font-bold text-white mb-4">
            🚫 Incognito Mode Detected
          </h1>
          
          <p className="text-gray-300 mb-6">
            This website cannot be accessed in <span className="text-red-500 font-bold">Incognito/Private</span> mode for security reasons.
          </p>
          
          <div className="bg-gray-800/50 rounded-lg p-4 mb-6 text-left">
            <h3 className="text-white font-bold mb-2">📋 How to Access:</h3>
            <ol className="text-gray-300 text-sm space-y-2 list-decimal list-inside">
              <li>Close this incognito/private window</li>
              <li>Open a <span className="text-green-500 font-bold">normal browser window</span></li>
              <li>Visit the website again</li>
            </ol>
          </div>
          
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
            <p className="text-blue-400 text-xs">
              <Shield className="w-4 h-4 inline mr-1" />
              Security Notice: We require normal browsing mode to ensure data persistence and security.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return children
}

export default IncognitoBlocker
