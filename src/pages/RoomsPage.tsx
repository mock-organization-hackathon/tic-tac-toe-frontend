import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSocket } from '../services/SocketContext';
import { Room, CreateRoomData } from '@tic-tac-toe-arena/shared-types';

const RoomsPage: React.FC = () => {
  const socket = useSocket();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [showCreateRoom, setShowCreateRoom] = useState(false);
  const [newRoom, setNewRoom] = useState<Partial<CreateRoomData>>({
    name: '',
    maxPlayers: 2,
    isPrivate: false,
    gameMode: 'classic'
  });

  useEffect(() => {
    if (!socket) return;

    // Listen for room updates
    socket.on('room-created', (room: Room) => {
      setRooms(prev => [...prev, room]);
    });

    // Request initial rooms list
    // In a real app, this would be an API call
    setRooms([
      {
        id: '1',
        name: 'Quick Match Room',
        hostId: 'host1',
        maxPlayers: 2,
        currentPlayerCount: 1,
        isPrivate: false,
        gameMode: 'classic',
        status: 'open',
        createdAt: new Date()
      },
      {
        id: '2',
        name: 'Giant Board Challenge',
        hostId: 'host2',
        maxPlayers: 2,
        currentPlayerCount: 0,
        isPrivate: false,
        gameMode: 'giant',
        status: 'open',
        createdAt: new Date()
      }
    ]);

    return () => {
      socket.off('room-created');
    };
  }, [socket]);

  const createRoom = () => {
    if (!socket || !newRoom.name) return;
    
    socket.emit('create-room', newRoom as CreateRoomData);
    setShowCreateRoom(false);
    setNewRoom({
      name: '',
      maxPlayers: 2,
      isPrivate: false,
      gameMode: 'classic'
    });
  };

  const joinRoom = (roomId: string, password?: string) => {
    if (!socket) return;
    socket.emit('join-room', roomId, password);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 py-8">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-8 text-white">
            <h1 className="text-4xl font-bold mb-4">🏠 Game Rooms</h1>
            <p className="text-gray-300 text-lg">Join an existing room or create your own</p>
          </div>

          {/* Create Room Button */}
          <div className="text-center mb-8">
            <motion.button
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold text-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowCreateRoom(true)}
            >
              + Create New Room
            </motion.button>
          </div>

          {/* Create Room Modal */}
          {showCreateRoom && (
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <motion.div
                className="bg-gray-800 p-6 rounded-2xl max-w-md w-full mx-4"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
              >
                <h3 className="text-2xl font-bold text-white mb-4">Create Room</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-white mb-2">Room Name</label>
                    <input
                      type="text"
                      className="w-full bg-gray-700 text-white p-3 rounded-lg"
                      value={newRoom.name || ''}
                      onChange={(e) => setNewRoom(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Enter room name..."
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white mb-2">Game Mode</label>
                    <select
                      className="w-full bg-gray-700 text-white p-3 rounded-lg"
                      value={newRoom.gameMode}
                      onChange={(e) => setNewRoom(prev => ({ ...prev, gameMode: e.target.value as any }))}
                    >
                      <option value="classic">Classic (3x3)</option>
                      <option value="giant">Giant (5x5)</option>
                      <option value="timed">Timed Mode</option>
                    </select>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="private"
                      className="mr-2"
                      checked={newRoom.isPrivate}
                      onChange={(e) => setNewRoom(prev => ({ ...prev, isPrivate: e.target.checked }))}
                    />
                    <label htmlFor="private" className="text-white">Private Room</label>
                  </div>
                  
                  {newRoom.isPrivate && (
                    <div>
                      <label className="block text-white mb-2">Password</label>
                      <input
                        type="password"
                        className="w-full bg-gray-700 text-white p-3 rounded-lg"
                        value={newRoom.password || ''}
                        onChange={(e) => setNewRoom(prev => ({ ...prev, password: e.target.value }))}
                        placeholder="Enter password..."
                      />
                    </div>
                  )}
                </div>
                
                <div className="flex space-x-4 mt-6">
                  <button
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg"
                    onClick={createRoom}
                  >
                    Create
                  </button>
                  <button
                    className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 rounded-lg"
                    onClick={() => setShowCreateRoom(false)}
                  >
                    Cancel
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Rooms List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rooms.map((room, index) => (
              <motion.div
                key={room.id}
                className="bg-gray-800 p-6 rounded-2xl shadow-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-white">{room.name}</h3>
                  <span className={`px-2 py-1 rounded text-xs ${
                    room.status === 'open' ? 'bg-green-600' :
                    room.status === 'full' ? 'bg-yellow-600' :
                    room.status === 'playing' ? 'bg-blue-600' : 'bg-red-600'
                  }`}>
                    {room.status.toUpperCase()}
                  </span>
                </div>
                
                <div className="space-y-2 text-gray-300 mb-4">
                  <p>🎮 Mode: {room.gameMode}</p>
                  <p>👥 Players: {room.currentPlayerCount}/{room.maxPlayers}</p>
                  <p>🔒 {room.isPrivate ? 'Private' : 'Public'}</p>
                </div>
                
                <motion.button
                  className={`w-full py-2 rounded-lg font-semibold ${
                    room.status === 'open' 
                      ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                      : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  }`}
                  whileHover={room.status === 'open' ? { scale: 1.02 } : {}}
                  whileTap={room.status === 'open' ? { scale: 0.98 } : {}}
                  onClick={() => room.status === 'open' && joinRoom(room.id)}
                  disabled={room.status !== 'open'}
                >
                  {room.status === 'open' ? 'Join Room' : 
                   room.status === 'full' ? 'Room Full' :
                   room.status === 'playing' ? 'Game in Progress' : 'Room Closed'}
                </motion.button>
              </motion.div>
            ))}
          </div>

          {/* Empty State */}
          {rooms.length === 0 && (
            <motion.div
              className="text-center text-white py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="text-6xl mb-4">🏠</div>
              <h3 className="text-2xl font-bold mb-2">No rooms available</h3>
              <p className="text-gray-300">Be the first to create a room!</p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default RoomsPage; 