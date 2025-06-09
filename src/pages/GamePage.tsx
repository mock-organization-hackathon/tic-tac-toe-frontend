import React, { useState } from 'react';

type Player = 'X' | 'O' | null;
type Board = Player[];

const GamePage: React.FC = () => {
  const [board, setBoard] = useState<Board>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<'X' | 'O'>('X');
  const [winner, setWinner] = useState<Player>(null);
  const [gameOver, setGameOver] = useState(false);

  const checkWinner = (board: Board): Player => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6] // diagonals
    ];

    for (const [a, b, c] of lines) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }

    return null;
  };

  const handleCellClick = (index: number) => {
    if (board[index] || winner || gameOver) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    const gameWinner = checkWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
      setGameOver(true);
    } else if (newBoard.every(cell => cell !== null)) {
      setGameOver(true);
    } else {
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer('X');
    setWinner(null);
    setGameOver(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-12rem)]">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          🎯 Tic Tac Toe
        </h1>
        
        {winner ? (
          <p className="text-2xl font-semibold text-green-600 dark:text-green-400">
            🎉 Player {winner} Wins!
          </p>
        ) : gameOver ? (
          <p className="text-2xl font-semibold text-yellow-600 dark:text-yellow-400">
            🤝 It's a Draw!
          </p>
        ) : (
          <p className="text-xl text-gray-700 dark:text-gray-300">
            Current Player: <span className="font-bold text-blue-600 dark:text-blue-400">{currentPlayer}</span>
          </p>
        )}
      </div>

      <div className="game-board p-6 mb-8">
        <div className="grid grid-cols-3 gap-2 w-72 h-72">
          {board.map((cell, index) => (
            <button
              key={index}
              onClick={() => handleCellClick(index)}
              className="game-cell w-full h-full text-4xl font-bold rounded-lg flex items-center justify-center"
              disabled={cell !== null || gameOver}
            >
              {cell}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={resetGame}
        className="btn-primary text-lg px-8 py-3"
      >
        🔄 New Game
      </button>
    </div>
  );
};

export default GamePage;