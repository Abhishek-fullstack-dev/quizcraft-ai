import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import { register } from '../services/api'

function Register() {
  const [form, setForm]       = useState({ name: '', email: '', password: '' })
  const [error, setError]     = useState('')
  const [loading, setLoading] = useState(false)
  const { loginUser }         = useAuth()
  const navigate              = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await register(form)
      loginUser(res.data)
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        {/* Header */}
        <div className="mb-10">
          <p className="text-red-500 text-xs tracking-[4px] uppercase mb-3">
            Get Started
          </p>
          <h1 className="text-5xl font-bold text-white mb-2">
            Create Account
          </h1>
          <p className="text-zinc-500 text-sm">
            Already have an account?{' '}
            <Link to="/login" className="text-red-500 hover:underline">
              Sign in
            </Link>
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-400
                          text-sm px-4 py-3 mb-6">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-zinc-500 text-xs tracking-widest uppercase mb-2 block">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="Abhishek Kumar"
              className="w-full bg-zinc-900 border border-zinc-800 text-white
                         px-4 py-3 text-sm outline-none
                         focus:border-red-500 transition duration-300"
            />
          </div>

          <div>
            <label className="text-zinc-500 text-xs tracking-widest uppercase mb-2 block">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="you@gmail.com"
              className="w-full bg-zinc-900 border border-zinc-800 text-white
                         px-4 py-3 text-sm outline-none
                         focus:border-red-500 transition duration-300"
            />
          </div>

          <div>
            <label className="text-zinc-500 text-xs tracking-widest uppercase mb-2 block">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              placeholder="Min 6 characters"
              className="w-full bg-zinc-900 border border-zinc-800 text-white
                         px-4 py-3 text-sm outline-none
                         focus:border-red-500 transition duration-300"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="bg-red-500 hover:bg-red-600 text-white text-sm
                       tracking-widest uppercase py-4 mt-2
                       transition duration-300 disabled:opacity-50"
          >
            {loading ? 'Creating account...' : 'Create Account →'}
          </motion.button>
        </form>
      </motion.div>
    </div>
  )
}

export default Register