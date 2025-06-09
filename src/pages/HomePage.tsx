import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

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
              description="Start a game instantly"
              icon="⚡"
              onClick={() => navigate('/play')}
              className="from-blue-500 to-cyan-500 border-4 border-blue-600 shadow-lg ring-2 ring-blue-300"
              ariaLabel="Quick Play game mode - Start an instant match"
            />
            
            <GameModeCard
              title="Giant Mode"
              description="Play on a larger board"
              icon="🎯"
              onClick={() => navigate('/play')}
              className="from-green-500 to-emerald-500 border-4 border-green-600 shadow-lg ring-2 ring-green-300"
              ariaLabel="Giant Mode - Play tic-tac-toe on an expanded board"
            />
            
            <GameModeCard
              title="Rooms"
              description="Join or create game rooms"
              icon="🏠"
              onClick={() => navigate('/rooms')}
              className="from-purple-500 to-pink-500 border-4 border-purple-600 shadow-lg ring-2 ring-purple-300"
              ariaLabel="Rooms - Join or create multiplayer game rooms"
            />
            
            <GameModeCard
              title="Leaderboard"
              description="View top players"
              icon="🏆"
              onClick={() => navigate('/leaderboard')}
              className="from-yellow-500 to-orange-500 border-4 border-yellow-600 shadow-lg ring-2 ring-yellow-300"
              ariaLabel="Leaderboard - View rankings and top players"
            />
            
            <GameModeCard
              title="Profile"
              description="Manage your account"
              icon="👤"
              onClick={() => navigate('/profile')}
              className="from-gray-500 to-slate-500 border-4 border-gray-600 shadow-lg ring-2 ring-gray-300"
              ariaLabel="Profile - Manage your account and settings"
            />
            
            <GameModeCard
              title="Tutorial"
              description="Learn how to play"
              icon="📚"
              onClick={() => navigate('/tutorial')}
              className="from-red-500 to-rose-500 border-4 border-red-600 shadow-lg ring-2 ring-red-300"
              ariaLabel="Tutorial - Learn game rules and strategies"
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
  onClick: () => void;
  className?: string;
  ariaLabel?: string;
}

const GameModeCard: React.FC<GameModeCardProps> = ({ title, description, icon, onClick, className = '', ariaLabel }) => {
  return (
    <motion.button
      className={`bg-gradient-to-br ${className} p-6 rounded-2xl shadow-xl cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:ring-4 hover:ring-white/50 focus:outline-none focus:ring-4 focus:ring-white focus:scale-105 active:scale-95 text-white font-semibold relative overflow-hidden text-left`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      aria-label={ariaLabel || `${title} - ${description}`}
    >
      {/* High contrast pattern overlay for additional visual distinction */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-white/10 pointer-events-none" />
      
      <div className="relative z-10 text-center">
        <div className="text-4xl mb-3 drop-shadow-lg">{icon}</div>
        <h3 className="text-xl font-bold mb-2 text-white drop-shadow-md">{title}</h3>
        <p className="text-white/90 text-sm font-medium drop-shadow-sm">{description}</p>
      </div>
      
      {/* Visual indicator for focus/interaction */}
      <div className="absolute top-2 right-2 w-3 h-3 bg-white/30 rounded-full opacity-0 transition-opacity hover:opacity-100" />
    </motion.button>
  );
};

export default HomePage;