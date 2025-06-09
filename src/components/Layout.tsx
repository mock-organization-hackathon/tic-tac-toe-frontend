import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  const instalilyAscii = `
 ██▓ ███▄    █   ██████ ▄▄▄█████▓ ▄▄▄       ██▓     ██▓ ██▓  ▓██   ██▓
▓██▒ ██ ▀█   █ ▒██    ▒ ▓  ██▒ ▓▒▒████▄    ▓██▒    ▓██▒▓██▒   ▒██  ██▒
▒██▒▓██  ▀█ ██▒░ ▓██▄   ▒ ▓██░ ▒░▒██  ▀█▄  ▒██░    ▒██▒▒██░    ▒██ ██░
░██░▓██▒  ▐▌██▒  ▒   ██▒░ ▓██▓ ░ ░██▄▄▄▄██ ▒██░    ░██░▒██░    ░ ▐██▓░
░██░▒██░   ▓██░▒██████▒▒  ▒██▒ ░  ▓█   ▓██▒░██████▒░██░░██████▒ ░ ██▒▓░
░▓  ░ ▒░   ▒ ▒ ▒ ▒▓▒ ▒ ░  ▒ ░░    ▒▒   ▓▒█░░ ▒░▓  ░░▓  ░ ▒░▓  ░  ██▒▒▒ 
 ▒ ░░ ░░   ░ ▒░░ ░▒  ░ ░    ░      ▒   ▒▒ ░░ ░ ▒  ░ ▒ ░░ ░ ▒  ░▓██ ░▒░ 
 ▒ ░   ░   ░ ░ ░  ░  ░    ░        ░   ▒     ░ ░    ▒ ░  ░ ░   ▒ ▒ ░░  
 ░           ░       ░                 ░  ░    ░  ░ ░      ░  ░░ ░     
                                                                ░ ░     `;

  const navItems = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/play', label: 'Quick Play', icon: '⚡' },
    { path: '/rooms', label: 'Rooms', icon: '🎲' },
    { path: '/leaderboard', label: 'Leaderboard', icon: '🏆' },
  ];

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="bg-black bg-opacity-20 backdrop-blur-sm border-b border-white border-opacity-10 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="text-white text-xl font-bold">
              🎯 Tic-Tac-Toe Arena
            </Link>
            
            <div className="flex space-x-6">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                    location.pathname === item.path
                      ? 'bg-white bg-opacity-20 text-white'
                      : 'text-gray-300 hover:text-white hover:bg-white hover:bg-opacity-10'
                  }`}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="min-h-screen">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-black bg-opacity-20 backdrop-blur-sm border-t border-white border-opacity-10 py-6">
        <div className="container mx-auto px-4">
          {/* ASCII Art */}
          <div className="ascii-art-container mb-4 flex justify-center">
            <pre className="ascii-art text-center">{instalilyAscii}</pre>
          </div>
          
          <div className="text-center text-gray-300">
            <p>&copy; 2024 Tic-Tac-Toe Arena. Built for testing Multi Repository PR Orchestration.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;