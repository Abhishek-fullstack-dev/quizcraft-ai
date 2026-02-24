import { useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { submitQuiz } from '../services/api'
import Navbar from '../components/Navbar'

function TakeQuiz() {
  const { id }     = useParams()
  const location   = useLocation()
  const navigate   = useNavigate()
  const quiz       = location.state?.quiz

  const [current, setCurrent]       = useState(0)
  const [answers, setAnswers]       = useState({})
  const [submitting, setSubmitting] = useState(false)

  if (!quiz) {
    navigate('/dashboard')
    return null
  }

  const questions = quiz.questions
  const question  = questions[current]
  const total     = questions.length
  const progress  = ((current + 1) / total) * 100
  const answered  = Object.keys(answers).length

  const handleSelect = (option) => {
    setAnswers({ ...answers, [question.id]: option })
  }

  const handleSubmit = async () => {
    setSubmitting(true)
    try {
      const res = await submitQuiz(id, { answers })
      navigate('/results', { state: { result: res.data } })
    } catch (err) {
      console.error(err)
    } finally {
      setSubmitting(false)
    }
  }

  const options = [
    { key: 'A', value: question.optionA },
    { key: 'B', value: question.optionB },
    { key: 'C', value: question.optionC },
    { key: 'D', value: question.optionD },
  ]

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Navbar />

      <div className="pt-24 pb-12 px-4 sm:px-6 md:px-12 
                      max-w-3xl mx-auto">

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-xs text-zinc-600
                          uppercase tracking-widest mb-2">
            <span>Question {current + 1} of {total}</span>
            <span className="truncate ml-2 max-w-32 sm:max-w-none">
              {quiz.topic}
            </span>
          </div>
          <div className="w-full h-1 bg-zinc-800">
            <motion.div
              className="h-full bg-red-500"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
          {/* Answered counter */}
          <p className="text-zinc-700 text-xs mt-2">
            {answered} of {total} answered
          </p>
        </div>

        {/* Question */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-lg sm:text-xl md:text-2xl font-medium 
                           text-white mb-8 leading-relaxed">
              {question.questionText}
            </h2>

            {/* Options */}
            <div className="flex flex-col gap-3 mb-10">
              {options.map((opt) => (
                <motion.button
                  key={opt.key}
                  whileHover={{ x: 4 }}
                  onClick={() => handleSelect(opt.key)}
                  className={`flex items-start sm:items-center gap-4 
                              border px-4 sm:px-6 py-4 text-left 
                              text-sm transition duration-200 w-full
                              ${answers[question.id] === opt.key
                                ? 'border-red-500 text-white bg-red-500/10'
                                : 'border-zinc-800 text-zinc-400 hover:border-zinc-600 hover:text-white'
                              }`}
                >
                  <span className={`w-7 h-7 flex items-center justify-center
                                    border text-xs font-bold shrink-0
                                    ${answers[question.id] === opt.key
                                      ? 'border-red-500 text-red-500'
                                      : 'border-zinc-700 text-zinc-600'
                                    }`}>
                    {opt.key}
                  </span>
                  <span className="leading-relaxed">{opt.value}</span>
                </motion.button>
              ))}
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center gap-3">
              <button
                onClick={() => setCurrent(current - 1)}
                disabled={current === 0}
                className="border border-zinc-800 text-zinc-400 text-xs
                           tracking-widest uppercase px-4 sm:px-6 py-3
                           hover:border-zinc-600 hover:text-white
                           transition disabled:opacity-30"
              >
                ← Prev
              </button>

              {current < total - 1 ? (
                <button
                  onClick={() => setCurrent(current + 1)}
                  disabled={!answers[question.id]}
                  className="bg-red-500 hover:bg-red-600 text-white text-xs
                             tracking-widest uppercase px-4 sm:px-6 py-3
                             transition disabled:opacity-30"
                >
                  Next →
                </button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSubmit}
                  disabled={submitting || !answers[question.id]}
                  className="bg-red-500 hover:bg-red-600 text-white text-xs
                             tracking-widest uppercase px-6 sm:px-8 py-3
                             transition disabled:opacity-30
                             flex items-center gap-2"
                >
                  {submitting ? (
                    <>
                      <div className="w-3 h-3 border border-white/30 
                                      border-t-white rounded-full animate-spin" />
                      Submitting...
                    </>
                  ) : 'Submit →'}
                </motion.button>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

export default TakeQuiz