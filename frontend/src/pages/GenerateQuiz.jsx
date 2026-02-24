import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { genrateQuiz } from '../services/api'
import Navbar from '../components/Navbar'

const SUGGESTIONS = [
  'Java Spring Boot', 'React Hooks', 'World War II',
  'Machine Learning', 'SQL Databases', 'Indian History'
]

function GenerateQuiz() {
  const [topic, setTopic]     = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')
  const navigate              = useNavigate()

  const handleGenerate = async (e) => {
    e.preventDefault()
    if (!topic.trim()) return
    setError('')
    setLoading(true)
    try {
      const res = await genrateQuiz({ topic })
      navigate(`/quiz/${res.data.id}`, { state: { quiz: res.data } })
    } catch (err) {
      setError('Failed to generate quiz. Try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Navbar />

      <div className="pt-24 pb-12 px-4 sm:px-6 md:px-12 
                      max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-red-500 text-xs tracking-[4px] uppercase mb-4">
            AI Powered
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Generate Quiz
          </h1>
          <p className="text-zinc-500 text-sm mb-10">
            Enter any topic and our AI will create 10 questions instantly.
          </p>

          {error && (
            <div className="bg-red-500/10 border border-red-500
                            text-red-400 text-sm px-4 py-3 mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleGenerate} className="flex flex-col gap-4">
            <div>
              <label className="text-zinc-500 text-xs tracking-widest
                                uppercase mb-2 block">
                Topic
              </label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g. Java Spring Boot, React Hooks..."
                disabled={loading}
                className="w-full bg-zinc-900 border border-zinc-800
                           text-white px-4 py-4 text-sm outline-none
                           focus:border-red-500 transition duration-300
                           disabled:opacity-50"
              />
            </div>

            {/* Quick suggestions */}
            <div className="flex flex-wrap gap-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setTopic(s)}
                  disabled={loading}
                  className="border border-zinc-800 text-zinc-500 
                             text-xs px-3 py-1.5 hover:border-zinc-600 
                             hover:text-white transition disabled:opacity-30"
                >
                  {s}
                </button>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              type="submit"
              disabled={loading || !topic.trim()}
              className="w-full bg-red-500 hover:bg-red-600 text-white 
                         text-sm tracking-widest uppercase py-4
                         transition duration-300 disabled:opacity-50
                         flex items-center justify-center gap-3"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30
                                  border-t-white rounded-full animate-spin" />
                  AI is generating your quiz...
                </>
              ) : (
                'Generate Quiz →'
              )}
            </motion.button>
          </form>

          {loading && (
            <p className="text-zinc-600 text-xs text-center mt-4">
              This takes 5–10 seconds. Please wait.
            </p>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default GenerateQuiz