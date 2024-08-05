import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { ThemeContext } from '../ThemeContext';

const initialBoard = Array(9).fill(null);

const TicTacToeScreen: React.FC = () => {
  const [board, setBoard] = useState<string[]>(initialBoard);
  const [isXNext, setIsXNext] = useState<boolean>(true);
  const [gameMode, setGameMode] = useState<'none' | 'player' | 'bot'>('none');
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');
  const winner = calculateWinner(board);
  const isTie = !winner && board.every(cell => cell !== null);

  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    if (gameMode === 'bot' && !isXNext && !winner && !isTie) {
      handleBotMove();
    }
  }, [isXNext, gameMode, winner, isTie]);

  const handlePress = (index: number) => {
    if (board[index] || winner || isTie) return;
    const newBoard = board.slice();
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const handleBotMove = () => {
    let move = -1;
    if (difficulty === 'easy') {
      move = getRandomMove();
    } else if (difficulty === 'medium') {
      move = getMediumMove();
    } else if (difficulty === 'hard') {
      move = getBestMove();
    }
    if (move !== -1) {
      setTimeout(() => {
        handlePress(move);
      }, 500);
    }
  };

  const getRandomMove = () => {
    const availableMoves = board.map((val, index) => val === null ? index : null).filter(val => val !== null);
    return availableMoves[Math.floor(Math.random() * availableMoves.length)];
  };

  const getMediumMove = () => {
    const player = isXNext ? 'O' : 'X';
    return findWinningMove(player) || findWinningMove(isXNext ? 'X' : 'O') || getRandomMove();
  };

  const getBestMove = () => {
    const player = isXNext ? 'O' : 'X';
    return findWinningMove(player) || findWinningMove(isXNext ? 'X' : 'O') || minimaxDecision(board, player);
  };

  const minimaxDecision = (newBoard, player) => {
    let bestVal = -Infinity;
    let bestMove = -1;

    for (let i = 0; i < 9; i++) {
      if (newBoard[i] === null) {
        newBoard[i] = player;
        const moveVal = minimax(newBoard, 0, false);
        newBoard[i] = null;

        if (moveVal > bestVal) {
          bestMove = i;
          bestVal = moveVal;
        }
      }
    }
    return bestMove;
  };

  const minimax = (newBoard, depth, isMaximizing) => {
    const player = isMaximizing ? (isXNext ? 'O' : 'X') : (isXNext ? 'X' : 'O');
    const opponent = isXNext ? 'X' : 'O';
    const winner = calculateWinner(newBoard);

    if (winner) {
      return winner === (isXNext ? 'X' : 'O') ? 10 - depth : depth - 10;
    }
    if (newBoard.every(cell => cell !== null)) {
      return 0;
    }

    if (isMaximizing) {
      let bestVal = -Infinity;
      for (let i = 0; i < 9; i++) {
        if (newBoard[i] === null) {
          newBoard[i] = player;
          bestVal = Math.max(bestVal, minimax(newBoard, depth + 1, false));
          newBoard[i] = null;
        }
      }
      return bestVal;
    } else {
      let bestVal = Infinity;
      for (let i = 0; i < 9; i++) {
        if (newBoard[i] === null) {
          newBoard[i] = opponent;
          bestVal = Math.min(bestVal, minimax(newBoard, depth + 1, true));
          newBoard[i] = null;
        }
      }
      return bestVal;
    }
  };

  const findWinningMove = (player) => {
    for (let i = 0; i < 9; i++) {
      if (board[i] === null) {
        const testBoard = board.slice();
        testBoard[i] = player;
        if (calculateWinner(testBoard) === player) {
          return i;
        }
      }
    }
    return null;
  };

  const renderSquare = (index: number) => (
    <TouchableOpacity
      key={index}
      style={theme.squareTicTacToe}
      onPress={() => {
        if (gameMode === 'player' || (gameMode === 'bot' && isXNext)) {
          handlePress(index);
        }
      }}
      disabled={board[index] !== null || winner !== null || isTie}
    >
      <Text style={theme.textTicTacToe}>{board[index]}</Text>
    </TouchableOpacity>
  );

  const status = winner
    ? `Winner: ${winner}`
    : isTie
      ? 'Tie!'
      : `Next player: ${isXNext ? 'X' : 'O'}`;

  const startGame = (mode: 'player' | 'bot') => {
    setGameMode(mode);
    setBoard(initialBoard);
    setIsXNext(true);
  };

  const handleChangeDifficulty = (level: 'easy' | 'medium' | 'hard') => {
    setDifficulty(level);
    Alert.alert("Difficulty Set", `Bot difficulty set to ${level}`);
  };

  if (gameMode === 'none') {
    return (
      <View style={theme.containerTicTacToe}>
        <Text style={theme.titleTicTacToe}>Tic Tac Toe</Text>
        <TouchableOpacity style={theme.buttonTicTacToe} onPress={() => startGame('player')}>
          <Text style={theme.buttonTextTicTacToe}>Player vs Player</Text>
        </TouchableOpacity>
        <TouchableOpacity style={theme.buttonTicTacToe} onPress={() => {
          Alert.alert(
            'Select Difficulty',
            '',
            [
              { text: 'Easy', onPress: () => { startGame('bot'); setDifficulty('easy'); } },
              { text: 'Medium', onPress: () => { startGame('bot'); setDifficulty('medium'); } },
              { text: 'Hard', onPress: () => { startGame('bot'); setDifficulty('hard'); } },
              { text: 'Cancel', style: 'cancel' }
            ]
          );
        }}>
          <Text style={theme.buttonTextTicTacToe}>Player vs Bot</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={theme.containerTicTacToe}>
      <Text style={theme.statusTicTacToe}>{status}</Text>
      {(winner || isTie) && (
        <TouchableOpacity style={theme.buttonTicTacToe} onPress={() => startGame(gameMode)}>
          <Text style={theme.buttonTextTicTacToe}>Restart</Text>
        </TouchableOpacity>
      )}
      <View style={theme.boardTicTacToe}>
        {[0, 1, 2].map((row) => (
          <View style={theme.rowTicTacToe} key={row}>
            {[0, 1, 2].map((col) => renderSquare(row * 3 + col))}
          </View>
        ))}
      </View>
    </View>
  );
};

const calculateWinner = (squares: string[]): string | null => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

export default TicTacToeScreen;