import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { io, Socket } from 'socket.io-client'
import toast from 'react-hot-toast'
import {
  GameState,
  GamePlayer,
  Room,
  ChatMessage,
  ErrorMessage
} from '@tic-tac-toe-arena/shared-types'

interface SocketContextType {
  socket: Socket | null
  isConnected: boolean
  currentPlayer: GamePlayer | null
  currentRoom: Room | null
  currentGame: GameState | null
  messages: ChatMessage[]
  
  // Actions
  authenticate: (playerName: string) => void
  createRoom: (roomData: any) => void
  joinRoom: (roomId: string, password?: string) => void
  leaveRoom: (roomId: string) => void
  makeMove: (gameId: string, position: number) => void
  setPlayerReady: (gameId: string) => void
  startGame: (gameId: string) => void
  sendMessage: (roomId: string, message: string) => void
}

const SocketContext = createContext<SocketContextType | null>(null)

export const useSocket = () => {
  const context = useContext(SocketContext)
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider')
  }
  return context
}

interface SocketProviderProps {
  children: ReactNode
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [currentPlayer, setCurrentPlayer] = useState<GamePlayer | null>(null)
  const [currentRoom, setCurrentRoom] = useState<Room | null>(null)
  const [currentGame, setCurrentGame] = useState<GameState | null>(null)
  const [messages, setMessages] = useState<ChatMessage[]>([])

  useEffect(() => {
    // Initialize socket connection
    const newSocket = io(import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001', {
      transports: ['websocket', 'polling'],
      autoConnect: true,
    })

    // Connection events
    newSocket.on('connect', () => {
      console.log('🔌 Connected to server')
      setIsConnected(true)
      toast.success('Connected to server!')
    })

    newSocket.on('disconnect', () => {
      console.log('🔌 Disconnected from server')
      setIsConnected(false)
      toast.error('Disconnected from server')
    })

    // Authentication
    newSocket.on('authenticated', (player: GamePlayer) => {
      console.log('👤 Authenticated as:', player.name)
      setCurrentPlayer(player)
      toast.success(`Welcome, ${player.name}!`)
    })

    // Room events
    newSocket.on('room-created', (room: Room) => {
      console.log('🏠 Room created:', room.name)
      setCurrentRoom(room)
      toast.success(`Room "${room.name}" created!`)
    })

    newSocket.on('room-joined', (room: Room, player: GamePlayer) => {
      console.log('🚪 Joined room:', room.name)
      setCurrentRoom(room)
      toast.success(`Joined room "${room.name}"`)
    })

    newSocket.on('room-left', (roomId: string) => {
      console.log('🚪 Left room:', roomId)
      setCurrentRoom(null)
      setCurrentGame(null)
      setMessages([])
      toast.success('Left room')
    })

    newSocket.on('player-joined', (player: GamePlayer) => {
      console.log('👤 Player joined:', player.name)
      toast.success(`${player.name} joined the room`)
    })

    newSocket.on('player-left', (playerId: string) => {
      console.log('👤 Player left:', playerId)
      toast(`Player left the room`, { icon: '👋' })
    })

    // Game events
    newSocket.on('game-started', (gameState: GameState) => {
      console.log('🎮 Game started!')
      setCurrentGame(gameState)
      toast.success('Game started! Good luck! 🎯')
    })

    newSocket.on('game-updated', (gameState: GameState) => {
      console.log('🎮 Game updated')
      setCurrentGame(gameState)
    })

    newSocket.on('move-made', (move: any, gameState: GameState) => {
      console.log('🎯 Move made:', move)
      setCurrentGame(gameState)
      
      if (gameState.status === 'finished') {
        if (gameState.winner) {
          const winner = gameState.players.find(p => p.symbol === gameState.winner)
          if (winner?.id === currentPlayer?.id) {
            toast.success('🎉 You won! Congratulations!')
          } else {
            toast('😔 You lost. Better luck next time!')
          }
        } else {
          toast('🤝 It\'s a draw!')
        }
      }
    })

    newSocket.on('game-ended', (gameState: GameState, stats: any) => {
      console.log('🏁 Game ended:', stats)
      setCurrentGame(gameState)
    })

    // Chat events
    newSocket.on('message-received', (message: ChatMessage) => {
      console.log('💬 Message received:', message)
      setMessages(prev => [...prev, message])
      
      if (message.type === 'chat' && message.playerId !== currentPlayer?.id) {
        toast(`${message.playerName}: ${message.message}`, {
          icon: '💬',
          duration: 3000,
        })
      }
    })

    // Error handling
    newSocket.on('error', (error: ErrorMessage) => {
      console.error('❌ Socket error:', error)
      toast.error(error.message || 'An error occurred')
    })

    setSocket(newSocket)

    // Cleanup on unmount
    return () => {
      newSocket.close()
    }
  }, [currentPlayer?.id])

  // Action functions
  const authenticate = (playerName: string) => {
    if (socket) {
      socket.emit('authenticate', playerName)
    }
  }

  const createRoom = (roomData: any) => {
    if (socket) {
      socket.emit('create-room', roomData)
    }
  }

  const joinRoom = (roomId: string, password?: string) => {
    if (socket) {
      socket.emit('join-room', roomId, password)
    }
  }

  const leaveRoom = (roomId: string) => {
    if (socket) {
      socket.emit('leave-room', roomId)
    }
  }

  const makeMove = (gameId: string, position: number) => {
    if (socket) {
      socket.emit('make-move', gameId, position)
    }
  }

  const setPlayerReady = (gameId: string) => {
    if (socket) {
      socket.emit('player-ready', gameId)
    }
  }

  const startGame = (gameId: string) => {
    if (socket) {
      socket.emit('start-game', gameId)
    }
  }

  const sendMessage = (roomId: string, message: string) => {
    if (socket) {
      socket.emit('send-message', roomId, message)
    }
  }

  const value: SocketContextType = {
    socket,
    isConnected,
    currentPlayer,
    currentRoom,
    currentGame,
    messages,
    authenticate,
    createRoom,
    joinRoom,
    leaveRoom,
    makeMove,
    setPlayerReady,
    startGame,
    sendMessage,
  }

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  )
} 