import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import { getHistory } from '../services/api'
import Navbar from '../components/Navbar'

function Dashboard() {
  const { user }              = useAuth()
  const navigate              = useNavigate()
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getHistory()
      .then(res => setHistory(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Navbar />

      <div className="pt-24 pb-12 px-4 sm:px-6 md:px-12 max-w-5xl mx-auto">

        {/* Welcome */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="text-red-500 text-xs tracking-[4px] uppercase mb-3">
            Welcome back
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold 
                         text-white mb-4 break-words">
            {user?.name?.split(' ')[0]}
            <span className="text-red-500">.</span>
          </h1>
          <p className="text-zinc-500 text-sm mb-8 max-w-md">
            Generate a quiz on any topic using AI and test your knowledge.
          </p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/generate')}
            className="w-full sm:w-auto bg-red-500 hover:bg-red-600 
                       text-white text-xs tracking-widest uppercase 
                       px-8 py-4 transition"
          >
            Generate New Quiz →
          </motion.button>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-12"
        >
          {[
            { label: 'Quizzes Taken', value: history.length },
            { label: 'Best Score',    value: history.length 
                ? Math.max(...history.map(h => h.score)) + '/' + 
                  (history[0]?.totalQuestions || 10)
                : '—' },
            { label: 'Topics',        value: new Set(history.map(h => h.topic)).size },
          ].map((stat, i) => (
            <div key={i}
              className="border border-zinc-800 px-4 py-4 
                         hover:border-zinc-600 transition">
              <p className="text-2xl font-bold text-white mb-1">
                {stat.value}
              </p>
              <p className="text-zinc-600 text-xs tracking-widest uppercase">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>

        {/* History */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="text-zinc-500 text-xs tracking-[3px] uppercase whitespace-nowrap">
              Recent Attempts
            </span>
            <div className="flex-1 h-px bg-zinc-800" />
          </div>

          {loading ? (
            <div className="flex items-center gap-3 text-zinc-600 text-sm py-8">
              <div className="w-4 h-4 border border-zinc-600 
                              border-t-red-500 rounded-full animate-spin" />
              Loading...
            </div>
          ) : history.length === 0 ? (
            <div className="border border-zinc-800 px-6 py-12 text-center">
              <p className="text-zinc-600 text-sm mb-4">
                No quizzes yet.
              </p>
              <button
                onClick={() => navigate('/generate')}
                className="text-red-500 text-xs tracking-widest 
                           uppercase hover:underline"
              >
                Generate your first quiz →
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {history.map((attempt, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center justify-between
                             border border-zinc-800 px-4 sm:px-6 py-4
                             hover:border-zinc-600 transition gap-4"
                >
                  <div className="min-w-0">
                    <p className="text-white text-sm font-medium mb-1 truncate">
                      {attempt.topic}
                    </p>
                    <p className="text-zinc-600 text-xs">
                      {new Date(attempt.completedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xl sm:text-2xl font-bold text-red-500">
                      {attempt.score}
                      <span className="text-zinc-600 text-sm font-normal">
                        /{attempt.totalQuestions}
                      </span>
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default Dashboard