import { useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'

function Results() {
  const location = useLocation()
  const navigate = useNavigate()
  const result   = location.state?.result

  if (!result) {
    navigate('/dashboard')
    return null
  }

  const percentage = Math.round((result.score / result.totalQuestions) * 100)

  const getScoreColor = () => {
    if (percentage >= 80) return 'text-green-500'
    if (percentage >= 50) return 'text-yellow-500'
    return 'text-red-500'
  }

  const getScoreMessage = () => {
    if (percentage >= 80) return 'Excellent work!'
    if (percentage >= 50) return 'Good effort!'
    return 'Keep practicing!'
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Navbar />

      <div className="pt-24 pb-12 px-4 sm:px-6 md:px-12 
                      max-w-3xl mx-auto">

        {/* Score header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-zinc-500 text-xs tracking-[4px] uppercase mb-4 
                        truncate px-4">
            {result.topic}
          </p>

          {/* Big score */}
          <div className={`text-6xl sm:text-8xl font-bold mb-4 
                           ${getScoreColor()}`}>
            {result.score}
            <span className="text-2xl sm:text-3xl text-zinc-600">
              /{result.totalQuestions}
            </span>
          </div>

          <p className="text-zinc-400 text-base sm:text-lg mb-1">
            {getScoreMessage()}
          </p>
          <p className="text-zinc-600 text-sm">{percentage}% correct</p>

          {/* Score bar */}
          <div className="w-full max-w-xs mx-auto h-1 bg-zinc-800 mt-6 mb-8">
            <motion.div
              className={`h-full ${
                percentage >= 80 ? 'bg-green-500' :
                percentage >= 50 ? 'bg-yellow-500' : 'bg-red-500'
              }`}
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ duration: 1, delay: 0.3 }}
            />
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/generate')}
              className="w-full sm:w-auto bg-red-500 hover:bg-red-600 
                         text-white text-xs tracking-widest uppercase 
                         px-8 py-3 transition"
            >
              Try Another Quiz →
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/leaderboard')}
              className="w-full sm:w-auto border border-zinc-700 
                         text-zinc-400 text-xs tracking-widest uppercase 
                         px-8 py-3 hover:border-white hover:text-white 
                         transition"
            >
              Leaderboard
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/dashboard')}
              className="w-full sm:w-auto border border-zinc-700 
                         text-zinc-400 text-xs tracking-widest uppercase 
                         px-8 py-3 hover:border-white hover:text-white 
                         transition"
            >
              Dashboard
            </motion.button>
          </div>
        </motion.div>

        {/* Question breakdown */}
        <div className="flex items-center gap-4 mb-6">
          <span className="text-zinc-500 text-xs tracking-[3px] 
                           uppercase whitespace-nowrap">
            Breakdown
          </span>
          <div className="flex-1 h-px bg-zinc-800" />
          <span className="text-zinc-700 text-xs whitespace-nowrap">
            {result.results?.filter(r => r.correct).length} correct
          </span>
        </div>

        <div className="flex flex-col gap-3">
          {result.results?.map((item, i) => (
            <motion.div
              key={item.questionId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`border px-4 sm:px-6 py-4 ${
                item.correct
                  ? 'border-green-500/30 bg-green-500/5'
                  : 'border-red-500/30 bg-red-500/5'
              }`}
            >
              {/* Question */}
              <div className="flex items-start gap-3 mb-3">
                <span className={`text-xs font-bold mt-0.5 shrink-0 ${
                  item.correct ? 'text-green-500' : 'text-red-500'
                }`}>
                  {item.correct ? '✓' : '✗'}
                </span>
                <p className="text-white text-sm leading-relaxed">
                  {item.questionText}
                </p>
              </div>

              {/* Answer details */}
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 
                              ml-6 text-xs">
                <div>
                  <span className="text-zinc-600 uppercase tracking-wider">
                    Your answer:{' '}
                  </span>
                  <span className={item.correct 
                    ? 'text-green-400' : 'text-red-400'}>
                    {item.yourAnswer || 'Not answered'}
                  </span>
                </div>
                {!item.correct && (
                  <div>
                    <span className="text-zinc-600 uppercase tracking-wider">
                      Correct:{' '}
                    </span>
                    <span className="text-green-400">
                      {item.correctAnswer}
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Results