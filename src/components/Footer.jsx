import { Link } from 'react-router-dom'
import { Trophy, Mail, Phone, Facebook, Twitter, Instagram, MessageCircle, Youtube } from 'lucide-react'
import useSettingsStore from '../store/settingsStore'

const Footer = () => {
  const { socialMedia, support } = useSettingsStore()

  return (
    <footer className="bg-gray-900/50 backdrop-blur-lg border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand & Description */}
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-4">
              <img 
                src="/strk-logo.png" 
                alt="STRK Logo" 
                className="h-10 w-auto"
              />
              <span className="text-lg font-bold text-white">
                TOURNAMENTS
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

          {/* Quick Links & Support */}
          <div>
            <h3 className="text-white font-bold mb-4">Quick Links</h3>
            <div className="flex flex-col space-y-2">
              <Link 
                to="/dashboard" 
                className="text-gray-400 hover:text-red-500 transition-colors text-sm"
              >
                Dashboard
              </Link>
              <Link 
                to="/downloads" 
                className="text-gray-400 hover:text-red-500 transition-colors text-sm"
              >
                Downloads
              </Link>
            </div>

            {/* Support Contact */}
            {(support.email.enabled || support.phone.enabled) && (
              <div className="mt-6">
                <h3 className="text-white font-bold mb-3">Support</h3>
                <div className="space-y-2">
                  {support.email.enabled && support.email.address && (
                    <a 
                      href={`mailto:${support.email.address}`}
                      className="flex items-center gap-2 text-gray-400 hover:text-red-500 transition-colors text-sm"
                    >
                      <Mail className="w-4 h-4" />
                      {support.email.address}
                    </a>
                  )}
                  {support.phone.enabled && support.phone.number && (
                    <a 
                      href={`tel:${support.phone.number}`}
                      className="flex items-center gap-2 text-gray-400 hover:text-red-500 transition-colors text-sm"
                    >
                      <Phone className="w-4 h-4" />
                      {support.phone.number}
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-white font-bold mb-4">Follow Us</h3>
            <div className="flex flex-wrap gap-3">
              {socialMedia.facebook.enabled && socialMedia.facebook.url && (
                <a
                  href={socialMedia.facebook.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-gray-800 hover:bg-blue-600 rounded-lg transition-colors"
                  title="Facebook"
                >
                  <Facebook className="w-5 h-5 text-white" />
                </a>
              )}
              {socialMedia.twitter.enabled && socialMedia.twitter.url && (
                <a
                  href={socialMedia.twitter.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-gray-800 hover:bg-sky-500 rounded-lg transition-colors"
                  title="Twitter"
                >
                  <Twitter className="w-5 h-5 text-white" />
                </a>
              )}
              {socialMedia.instagram.enabled && socialMedia.instagram.url && (
                <a
                  href={socialMedia.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-gray-800 hover:bg-pink-600 rounded-lg transition-colors"
                  title="Instagram"
                >
                  <Instagram className="w-5 h-5 text-white" />
                </a>
              )}
              {socialMedia.discord.enabled && socialMedia.discord.url && (
                <a
                  href={socialMedia.discord.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-gray-800 hover:bg-indigo-600 rounded-lg transition-colors"
                  title="Discord"
                >
                  <MessageCircle className="w-5 h-5 text-white" />
                </a>
              )}
              {socialMedia.youtube.enabled && socialMedia.youtube.url && (
                <a
                  href={socialMedia.youtube.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-gray-800 hover:bg-red-600 rounded-lg transition-colors"
                  title="YouTube"
                >
                  <Youtube className="w-5 h-5 text-white" />
                </a>
              )}
              {socialMedia.whatsapp.enabled && socialMedia.whatsapp.number && (
                <a
                  href={`https://wa.me/${socialMedia.whatsapp.number.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-gray-800 hover:bg-green-600 rounded-lg transition-colors"
                  title="WhatsApp"
                >
                  <MessageCircle className="w-5 h-5 text-white" />
                </a>
              )}
            </div>
            
            {/* Show message if no social media enabled */}
            {!Object.values(socialMedia).some(s => s.enabled) && (
              <p className="text-gray-500 text-sm">Connect with us on social media (Coming soon!)</p>
            )}
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-gray-800">
          <p className="text-gray-400 text-sm text-center">
            © 2025 STRK Tournaments. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
