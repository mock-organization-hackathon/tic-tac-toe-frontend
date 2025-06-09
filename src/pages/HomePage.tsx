import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div className="text-center">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-8">
          🎯 Tic Tac Toe Arena
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-12">
          Challenge yourself or play with friends in this classic game!
        </p>
        
        <div className="grid gap-6 md:grid-cols-2 max-w-2xl mx-auto">
          <div className="card p-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              ⚡ Quick Play
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Jump right into a classic 3x3 game instantly
            </p>
            <Link to="/game" className="btn-primary inline-block">
              Start Game
            </Link>
          </div>
          
          <div className="card p-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              🎲 Two Player
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Play with a friend on the same device
            </p>
            <Link to="/game?mode=two-player" className="btn-secondary inline-block">
              Play Together
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;