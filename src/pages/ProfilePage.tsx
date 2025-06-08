import React from 'react';
import { motion } from 'framer-motion';

const ProfilePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 py-8">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto text-center text-white"
        >
          <h1 className="text-4xl font-bold mb-4">👤 Profile</h1>
          <p className="text-gray-300 text-lg mb-8">Your gaming statistics and achievements</p>
          
          <div className="bg-gray-800 rounded-2xl p-8">
            <div className="text-6xl mb-4">🎮</div>
            <h2 className="text-2xl font-bold mb-4">Player Profile</h2>
            <p className="text-gray-300">Profile functionality coming soon!</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProfilePage; 