import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Navbar() {
  const { user, logoutUser } = useAuth()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogout = () => {
    logoutUser()
    navigate('/login')
    setMenuOpen(false)
  }

  return (
    <nav className="fixed top-0 left-0 w-full bg-zinc-950 border-b 
                    border-zinc-800 px-6 md:px-12 py-4 z-50">
      <div className="flex justify-between items-center">
        
        {/* Logo */}
        <Link to="/dashboard"
          className="text-white font-bold text-lg tracking-widest uppercase">
          Quiz<span className="text-red-500">Craft</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/leaderboard"
            className="text-zinc-400 text-sm hover:text-white transition">
            Leaderboard
          </Link>
          <span className="text-zinc-500 text-sm font-medium">
            {user?.name}
          </span>
          <button
            onClick={handleLogout}
            className="border border-zinc-700 text-zinc-400 text-xs
                       tracking-widest uppercase px-4 py-2
                       hover:border-red-500 hover:text-red-500 transition"
          >
            Logout
          </button>
        </div>

        {/* Burger Button - mobile only */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300
                           ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300
                           ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300
                           ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300
                       ${menuOpen ? 'max-h-60 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
        <div className="flex flex-col gap-4 pb-4 border-t border-zinc-800 pt-4">
          <span className="text-zinc-500 text-sm font-medium">
            👤 {user?.name}
          </span>
          <Link
            to="/leaderboard"
            onClick={() => setMenuOpen(false)}
            className="text-zinc-400 text-sm hover:text-white transition"
          >
            Leaderboard
          </Link>
          <button
            onClick={handleLogout}
            className="border border-zinc-700 text-zinc-400 text-xs
                       tracking-widest uppercase px-4 py-2 w-fit
                       hover:border-red-500 hover:text-red-500 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar