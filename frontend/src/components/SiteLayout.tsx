import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { 
  FaTwitter, 
  FaInstagram, 
  FaTelegram, 
  FaFacebook,
  FaShieldAlt,
  FaChevronRight
} from 'react-icons/fa'

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0B0B12] text-white">
      <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-black/40 border-b border-white/10">
        <div className="max-w-7xl mx-auto h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 text-white">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <FaShieldAlt className="w-4 h-4 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg tracking-tight">MLSecOps</span>
              <span className="text-xs text-white/60">Secure your data</span>
            </div>
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            <NavLink 
              to="/overview" 
              className={({ isActive }) => 
                `px-3 py-2 rounded text-sm transition-colors ${
                  isActive 
                    ? 'text-[#94E52F] font-semibold' 
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`
              }
            >
              Overview
            </NavLink>
            <NavLink 
              to="/findings" 
              className={({ isActive }) => 
                `px-3 py-2 rounded text-sm transition-colors ${
                  isActive 
                    ? 'text-[#94E52F] font-semibold' 
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`
              }
            >
              Findings
            </NavLink>
            <NavLink 
              to="/reports" 
              className={({ isActive }) => 
                `px-3 py-2 rounded text-sm transition-colors ${
                  isActive 
                    ? 'text-[#94E52F] font-semibold' 
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`
              }
            >
              Reports
            </NavLink>
            <NavLink 
              to="/evidence" 
              className={({ isActive }) => 
                `px-3 py-2 rounded text-sm transition-colors ${
                  isActive 
                    ? 'text-[#94E52F] font-semibold' 
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`
              }
            >
              Evidence
            </NavLink>
            <NavLink 
              to="/playground" 
              className={({ isActive }) => 
                `px-3 py-2 rounded text-sm transition-colors ${
                  isActive 
                    ? 'text-[#94E52F] font-semibold' 
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`
              }
            >
              Playground
            </NavLink>
            <NavLink 
              to="/docs" 
              className={({ isActive }) => 
                `px-3 py-2 rounded text-sm transition-colors ${
                  isActive 
                    ? 'text-[#94E52F] font-semibold' 
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`
              }
            >
              Docs
            </NavLink>
          </nav>
          <div className="flex items-center gap-3">
            <Link 
              to="/playground" 
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm bg-gray-700 hover:bg-[#94E52F] text-white hover:text-gray-900 transition-all duration-200 font-medium"
            >
              Start <FaChevronRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </header>
      <main className="w-full">
        {children}
      </main>
      <footer className="border-t border-purple-500/15 py-8 bg-gradient-to-r from-purple-900/8 via-blue-900/6 to-indigo-900/8">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between text-sm text-white/80">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center">
              <FaShieldAlt className="w-4 h-4 text-white" />
            </div>
            <span className="font-medium">© MLSecOps2025. All rights reserved</span>
          </div>
          
          {/* Social Media Icons */}
          <div className="flex items-center gap-6">
            <a href="#" aria-label="Twitter" className="hover:text-purple-300 transition-colors">
              <FaTwitter className="w-5 h-5" />
            </a>
            <a href="#" aria-label="Instagram" className="hover:text-pink-300 transition-colors">
              <FaInstagram className="w-5 h-5" />
            </a>
            <a href="#" aria-label="Telegram" className="hover:text-blue-300 transition-colors">
              <FaTelegram className="w-5 h-5" />
            </a>
            <a href="#" aria-label="Facebook" className="hover:text-purple-300 transition-colors">
              <FaFacebook className="w-5 h-5" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}