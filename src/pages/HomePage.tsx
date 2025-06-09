import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ASCII_ART } from 'tic-tac-toe-shared-types';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.1 }}
          >
            <pre className="text-yellow-400 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-mono leading-tight whitespace-pre overflow-x-auto">
              {ASCII_ART}
            </pre>
          </motion.div>
          
          <motion.h1
            className="text-6xl md:text-8xl font-bold text-white mb-6"
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            🎯 Tic-Tac-Toe
          </motion.h1>
          
          <motion.p
            className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Challenge friends in real-time multiplayer battles across different game modes
          </motion.p>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <GameModeCard
              title="Quick Play"
              description="Jump into a classic 3x3 game instantly"
              icon="⚡"
              color="from-blue-500 to-cyan-500"
              onClick={() => navigate('/play')}
            />
            
            <GameModeCard
              title="Giant Mode"
              description="Challenge yourself with 5x5 boards"
              icon="🏰"
              color="from-green-500 to-emerald-500"
              onClick={() => navigate('/play')}
            />
            
            <GameModeCard
              title="Rooms"
              description="Create or join custom game rooms"
              icon="🏠"
              color="from-purple-500 to-pink-500"
              onClick={() => navigate('/rooms')}
            />
            
            <GameModeCard
              title="Leaderboard"
              description="See who's the ultimate champion"
              icon="🏆"
              color="from-yellow-500 to-orange-500"
              onClick={() => navigate('/leaderboard')}
            />
            
            <GameModeCard
              title="Profile"
              description="View your stats and achievements"
              icon="👤"
              color="from-indigo-500 to-purple-500"
              onClick={() => navigate('/profile')}
            />
            
            <GameModeCard
              title="Tutorial"
              description="Learn the ropes and master strategies"
              icon="📚"
              color="from-red-500 to-pink-500"
              onClick={() => navigate('/tutorial')}
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

interface GameModeCardProps {
  title: string;
  description: string;
  icon: string;
  color: string;
  onClick: () => void;
}

const GameModeCard: React.FC<GameModeCardProps> = ({ title, description, icon, color, onClick }) => {
  return (
    <motion.div
      className={`bg-gradient-to-br ${color} p-6 rounded-2xl shadow-xl cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
    >
      <div className="text-center">
        <div className="text-4xl mb-4">{icon}</div>
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-100 text-sm opacity-90">{description}</p>
      </div>
    </motion.div>
  );
};

export default HomePage;