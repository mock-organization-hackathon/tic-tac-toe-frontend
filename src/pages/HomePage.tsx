import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Bot, Users } from 'lucide-react';
import GameModeCard from '../components/GameModeCard';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold text-gray-800 mb-4 text-shadow-lg">
            Tic Tac Toe
          </h1>
          <p className="text-xl text-gray-600">
            Choose your game mode and start playing!
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          <GameModeCard
            title="Player vs Player"
            description="Play against a friend locally"
            icon={<Users className="w-12 h-12" />}
            onClick={() => navigate('/game?mode=pvp')}
            pattern="diagonal-lines"
            colorClass="from-green-400 to-green-600"
            hoverColorClass="from-green-500 to-green-700"
            ariaLabel="Start Player vs Player mode - play against a friend on the same device"
          />
          
          <GameModeCard
            title="Player vs AI"
            description="Challenge our smart AI opponent"
            icon={<Bot className="w-12 h-12" />}
            onClick={() => navigate('/game?mode=pve')}
            pattern="dots"
            colorClass="from-red-400 to-red-600"
            hoverColorClass="from-red-500 to-red-700"
            ariaLabel="Start Player vs AI mode - challenge the computer opponent"
          />
          
          <GameModeCard
            title="Online Multiplayer"
            description="Play against players worldwide"
            icon={<User className="w-12 h-12" />}
            onClick={() => navigate('/multiplayer')}
            pattern="grid"
            colorClass="from-purple-400 to-purple-600"
            hoverColorClass="from-purple-500 to-purple-700"
            ariaLabel="Start Online Multiplayer mode - play against other players online"
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;