import { Link } from 'react-router-dom'
import { Trophy } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-gray-900/50 backdrop-blur-lg border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          {/* Brand */}
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-4">
              <Trophy className="w-8 h-8 text-red-500" />
              <span className="text-xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                STRK TOURNAMENTS
              </span>
            </div>
            <p className="text-gray-400 text-sm mb-3 max-w-md">
              The <span className="text-yellow-500 font-bold">FIRST EVER</span> Free Fire PC-only tournament platform. Make history with us!
            </p>
            <div className="flex gap-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-yellow-500/10 border border-yellow-500/50 rounded-full">
                <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
                <span className="text-yellow-400 font-bold text-xs">Historic First</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/50 rounded-full">
                <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V4z"/>
                </svg>
                <span className="text-blue-400 font-semibold text-xs">PC Only</span>
              </div>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <Link 
              to="/dashboard" 
              className="text-gray-400 hover:text-red-500 transition-colors font-medium"
            >
              Dashboard
            </Link>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-800">
          <p className="text-gray-400 text-sm text-center">
            © 2025 STRK Tournaments. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
