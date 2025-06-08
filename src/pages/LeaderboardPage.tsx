import React from 'react';
import { motion } from 'framer-motion';

const LeaderboardPage: React.FC = () => {
  const mockLeaderboard = [
    { rank: 1, name: 'GameMaster', wins: 156, winRate: 89.2 },
    { rank: 2, name: 'TicTacPro', wins: 134, winRate: 85.7 },
    { rank: 3, name: 'StrategyKing', wins: 98, winRate: 82.1 },
    { rank: 4, name: 'QuickWin', wins: 87, winRate: 79.5 },
    { rank: 5, name: 'BoardMaster', wins: 76, winRate: 77.3 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 py-8">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-8 text-white">
            <h1 className="text-4xl font-bold mb-4">🏆 Leaderboard</h1>
            <p className="text-gray-300 text-lg">See who's dominating the arena</p>
          </div>

          <div className="bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
            <div className="p-6">
              <div className="space-y-4">
                {mockLeaderboard.map((player, index) => (
                  <motion.div
                    key={player.rank}
                    className="flex items-center p-4 bg-gray-700 rounded-lg"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="text-2xl mr-4">
                      {player.rank === 1 ? '🥇' : player.rank === 2 ? '🥈' : player.rank === 3 ? '🥉' : '🎯'}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-bold text-lg">{player.name}</h3>
                      <p className="text-gray-300">Wins: {player.wins} | Win Rate: {player.winRate}%</p>
                    </div>
                    <div className="text-right">
                      <div className="text-yellow-400 font-bold">#{player.rank}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LeaderboardPage; 