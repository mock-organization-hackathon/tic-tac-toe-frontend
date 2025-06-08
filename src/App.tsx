import { Routes, Route } from 'react-router-dom'
import { motion } from 'framer-motion'

import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import LobbyPage from './pages/LobbyPage'
import GamePage from './pages/GamePage'
import LeaderboardPage from './pages/LeaderboardPage'
import RoomsPage from './pages/RoomsPage'
import ProfilePage from './pages/ProfilePage'

function App() {
  return (
    <div className="min-h-screen">
      <Layout>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/play" element={<GamePage />} />
            <Route path="/lobby" element={<LobbyPage />} />
            <Route path="/game/:gameId" element={<GamePage />} />
            <Route path="/rooms" element={<RoomsPage />} />
            <Route path="/leaderboard" element={<LeaderboardPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/tutorial" element={<HomePage />} />
          </Routes>
        </motion.div>
      </Layout>
    </div>
  )
}

export default App 