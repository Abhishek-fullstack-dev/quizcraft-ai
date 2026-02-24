import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { getLeaderboard } from '../services/api'
import { useAuth } from '../context/AuthContext'
import Navbar from '../components/Navbar'

function Leaderboard() {
  const [data, setData]       = useState([])
  const [loading, setLoading] = useState(true)
  const { user }              = useAuth()

  useEffect(() => {
    getLeaderboard()
      .then(res => setData(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }, [])

  const getMedalColor = (i) => {
    if (i === 0) return 'text-yellow-500'
    if (i === 1) return 'text-zinc-400'
    if (i === 2) return 'text-amber-600'
    return 'text-zinc-700'
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Navbar />

      <div className="pt-24 pb-12 px-4 sm:px-6 md:px-12 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <p className="text-red-500 text-xs tracking-[4px] uppercase mb-3">
            Top Scores
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white">
            Leaderboard
          </h1>
        </motion.div>

        {loading ? (
          <div className="flex items-center gap-3 text-zinc-600 text-sm py-8">
            <div className="w-4 h-4 border border-zinc-600 
                            border-t-red-500 rounded-full animate-spin" />
            Loading...
          </div>
        ) : data.length === 0 ? (
          <div className="border border-zinc-800 px-6 py-12 text-center">
            <p className="text-zinc-600 text-sm">
              No attempts yet. Be the first!
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {data.map((entry, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className={`flex items-center gap-3 sm:gap-6 border 
                            px-4 sm:px-6 py-4 transition
                            ${entry.userName === user?.name
                              ? 'border-red-500/50 bg-red-500/5'
                              : 'border-zinc-800 hover:border-zinc-600'
                            }`}
              >
                {/* Rank */}
                <span className={`text-xl sm:text-2xl font-bold 
                                  w-6 sm:w-8 shrink-0 ${getMedalColor(i)}`}>
                  {i + 1}
                </span>

                {/* Name + topic */}
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-medium truncate">
                    {entry.userName}
                    {entry.userName === user?.name && (
                      <span className="text-red-500 text-xs ml-2">You</span>
                    )}
                  </p>
                  <p className="text-zinc-600 text-xs mt-0.5 truncate">
                    {entry.topic}
                  </p>
                </div>

                {/* Score */}
                <div className="text-right shrink-0">
                  <p className="text-lg sm:text-xl font-bold text-white">
                    {entry.score}
                    <span className="text-zinc-600 text-sm font-normal">
                      /{entry.totalQuestions}
                    </span>
                  </p>
                  <p className="text-zinc-600 text-xs">
                    {Math.round((entry.score / entry.totalQuestions) * 100)}%
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Leaderboard