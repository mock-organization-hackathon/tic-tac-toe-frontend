import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

type Player = 'X' | 'O';
type Cell = Player | null;

const GamePage: React.FC = () => {
  const navigate = useNavigate();
  const [board, setBoard] = useState<Cell[]>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<Player>('X');
  const [winner, setWinner] = useState<Player | null>(null);
  const [winningLine, setWinningLine] = useState<number[]>([]);
  const [gameStatus, setGameStatus] = useState<'playing' | 'finished' | 'draw'>('playing');

  // Winning combinations for 3x3 board
  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
  ];

  // Check for winner
  useEffect(() => {
    const checkWinner = () => {
      for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
          setWinner(board[a]);
          setWinningLine(combination);
          setGameStatus('finished');
          return;
        }
      }

      // Check for draw
      if (board.every(cell => cell !== null)) {
        setGameStatus('draw');
      }
    };

    checkWinner();
  }, [board]);

  const makeMove = (index: number) => {
    if (board[index] || gameStatus !== 'playing') return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);
    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer('X');
    setWinner(null);
    setWinningLine([]);
    setGameStatus('playing');
  };

  const getCellClassName = (index: number) => {
    let className = "h-20 w-20 bg-gray-700 rounded-lg text-3xl font-bold transition-all duration-200 hover:bg-gray-600 flex items-center justify-center cursor-pointer";
    
    if (board[index]) {
      className += " cursor-not-allowed";
    }
    
    if (winningLine.includes(index)) {
      className += " bg-green-600 animate-pulse";
    }
    
    return className;
  };

  const getCellContent = (index: number) => {
    const cell = board[index];
    if (cell === 'X') return <span className="text-blue-400">X</span>;
    if (cell === 'O') return <span className="text-red-400">O</span>;
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 py-8">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto"
        >
          {/* Game Header */}
          <div className="text-center mb-8 text-white">
            <h1 className="text-4xl font-bold mb-4">🎯 Tic-Tac-Toe Arena</h1>
            <div className="text-center mb-6">
              {gameStatus === 'playing' && (
                <p className="text-blue-400 text-lg">
                  Player {currentPlayer}'s turn
                </p>
              )}
              {gameStatus === 'finished' && (
                <p className="text-green-400 text-lg">
                  🎉 Player {winner} wins!
                </p>
              )}
              {gameStatus === 'draw' && (
                <p className="text-yellow-400 text-lg">
                  🤝 It's a draw!
                </p>
              )}
            </div>
          </div>

          {/* Game Board */}
          <motion.div
            className="grid grid-cols-3 gap-2 bg-gray-800 p-4 rounded-2xl shadow-2xl mx-auto max-w-md mb-8"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            {board.map((cell, index) => (
              <motion.button
                key={index}
                className={getCellClassName(index)}
                onClick={() => makeMove(index)}
                whileHover={!cell && gameStatus === 'playing' ? { scale: 1.05 } : {}}
                whileTap={!cell && gameStatus === 'playing' ? { scale: 0.95 } : {}}
              >
                {getCellContent(index)}
              </motion.button>
            ))}
          </motion.div>

          {/* Game Actions */}
          <div className="text-center space-y-4">
            <motion.button
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold text-lg mr-4"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={resetGame}
            >
              🔄 New Game
            </motion.button>
            <motion.button
              className="bg-gray-600 hover:bg-gray-700 text-white px-8 py-3 rounded-lg font-semibold text-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/')}
            >
              🏠 Back to Menu
            </motion.button>
          </div>

          {/* Game Stats */}
          <div className="mt-8 bg-gray-800 rounded-lg p-4 text-white">
            <h3 className="text-lg font-bold mb-2">Game Info</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-300">Current Player:</span>
                <span className={`ml-2 font-bold ${currentPlayer === 'X' ? 'text-blue-400' : 'text-red-400'}`}>
                  {currentPlayer}
                </span>
              </div>
              <div>
                <span className="text-gray-300">Status:</span>
                <span className="ml-2 font-bold">
                  {gameStatus === 'playing' ? '🎮 In Progress' : 
                   gameStatus === 'finished' ? '🏆 Finished' : 
                   '🤝 Draw'}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default GamePage; 