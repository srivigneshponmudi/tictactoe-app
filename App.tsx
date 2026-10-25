import { useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

type Player = 'X' | 'O';
type Cell = Player | null;

// The board is a list of 9 cells, numbered like this:
// 0 1 2
// 3 4 5
// 6 7 8
const WIN_LINES: number[][] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function createEmptyBoard(): Cell[] {
  return Array(9).fill(null);
}

function findWinner(board: Cell[]): { player: Player; line: number[] } | null {
  for (const line of WIN_LINES) {
    const [first, second, third] = line;
    const mark = board[first];

    if (mark && mark === board[second] && mark === board[third]) {
      return { player: mark, line };
    }
  }

  return null;
}

export default function App() {
  const { width } = useWindowDimensions();
  const [board, setBoard] = useState<Cell[]>(() => createEmptyBoard());
  const [currentPlayer, setCurrentPlayer] = useState<Player>('X');

  const winner = findWinner(board);
  const isDraw = winner === null && board.every((cell) => cell !== null);
  const gameOver = winner !== null || isDraw;

  const boardSize = Math.min(width - 48, 360);
  const gap = 8;
  const cellSize = (boardSize - gap * 2) / 3;

  function handleCellPress(index: number) {
    if (gameOver || board[index] !== null) {
      return;
    }

    const nextBoard = [...board];
    nextBoard[index] = currentPlayer;
    setBoard(nextBoard);
    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
  }

  function restartGame() {
    setBoard(createEmptyBoard());
    setCurrentPlayer('X');
  }

  let status = `${currentPlayer}'s turn`;
  if (winner) {
    status = `${winner.player} wins`;
  } else if (isDraw) {
    status = "It's a draw";
  }

  return (
    <View style={styles.screen}>
      <StatusBar style="dark" />
      <Text style={styles.title}>Tic Tac Toe</Text>
      <Text style={styles.status}>{status}</Text>

      <View style={[styles.board, { width: boardSize, gap }]}>
        {[0, 1, 2].map((row) => (
          <View key={row} style={[styles.row, { gap }]}>
            {[0, 1, 2].map((column) => {
              const index = row * 3 + column;
              const cell = board[index];
              const isWinningCell = winner?.line.includes(index) ?? false;

              return (
                <Pressable
                  key={index}
                  style={({ pressed }) => [
                    styles.cell,
                    { width: cellSize, height: cellSize },
                    isWinningCell && styles.winningCell,
                    pressed && !gameOver && cell === null && styles.cellPressed,
                  ]}
                  onPress={() => handleCellPress(index)}
                  accessibilityRole="button"
                  accessibilityLabel={
                    cell === null
                      ? `Empty square ${index + 1}`
                      : `${cell} in square ${index + 1}`
                  }
                >
                  <Text style={[styles.mark, cell === 'O' && styles.markO]}>{cell}</Text>
                </Pressable>
              );
            })}
          </View>
        ))}
      </View>

      <Pressable style={styles.restartButton} onPress={restartGame}>
        <Text style={styles.restartText}>Restart Game</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F4F1EA',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 48,
  },
  title: {
    fontSize: 36,
    fontWeight: '700',
    color: '#1F2933',
    marginBottom: 8,
  },
  status: {
    fontSize: 22,
    color: '#3E4C59',
    marginBottom: 28,
  },
  board: {
    marginBottom: 32,
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cellPressed: {
    backgroundColor: '#E7E2D8',
  },
  winningCell: {
    backgroundColor: '#D8F3DC',
  },
  mark: {
    fontSize: 52,
    fontWeight: '700',
    color: '#1D4E89',
  },
  markO: {
    color: '#C44900',
  },
  restartButton: {
    backgroundColor: '#1F2933',
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 28,
    minWidth: 200,
    alignItems: 'center',
  },
  restartText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
});
