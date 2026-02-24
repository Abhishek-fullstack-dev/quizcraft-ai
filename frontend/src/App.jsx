import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Register     from './pages/Register'
import Login        from './pages/Login'
import Dashboard    from './pages/Dashboard'
import GenerateQuiz from './pages/GenerateQuiz'
import TakeQuiz     from './pages/TakeQuiz'
import Results      from './pages/Results'
import Leaderboard  from './pages/Leaderboard'

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/"          element={<Navigate to="/login" replace />} />
          <Route path="/login"     element={<Login />} />
          <Route path="/register"  element={<Register />} />
          <Route path="/dashboard" element={
            <ProtectedRoute><Dashboard /></ProtectedRoute>
          } />
          <Route path="/generate"  element={
            <ProtectedRoute><GenerateQuiz /></ProtectedRoute>
          } />
          <Route path="/quiz/:id"  element={
            <ProtectedRoute><TakeQuiz /></ProtectedRoute>
          } />
          <Route path="/results" element={
  <ProtectedRoute><Results /></ProtectedRoute>
          }/>
          <Route path="/leaderboard" element={
  <ProtectedRoute><Leaderboard /></ProtectedRoute>
} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}