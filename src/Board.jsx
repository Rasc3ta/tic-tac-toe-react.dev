import { useState } from "react";

const squareStyle = {
  height: "2.5rem",
  width: "2rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "2.5rem",
  padding: "1.75rem",
};

function Square({ value, onSquareClicked }) {
  return (
    <button onClick={onSquareClicked} style={squareStyle} className="square">
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  //  const [xIsNext, setXIsNext] = useState(true);
  //  const [squares, setSquares] = useState(Array(9).fill(null));

  function handleClick(i) {
    const nextSquares = [...squares];
    if (nextSquares[i] || calculateWinner(squares)) {
      return;
    }
    nextSquares[i] = xIsNext ? "X" : "O";
    // setSquares(nextSquares);
    // setXIsNext(!xIsNext);
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner : " + winner;
  } else {
    status = "Next Player : " + (xIsNext ? "X" : "O");
  }

  return (
    <>
      <div className="status">{status}</div>
      <div style={{ display: "flex" }} className="board-row">
        <Square
          onSquareClicked={() => handleClick(0)}
          value={squares[0]}
        ></Square>
        <Square
          onSquareClicked={() => handleClick(1)}
          value={squares[1]}
        ></Square>
        <Square
          onSquareClicked={() => handleClick(2)}
          value={squares[2]}
        ></Square>
      </div>
      <div style={{ display: "flex" }} className="board-row">
        <Square
          onSquareClicked={() => handleClick(3)}
          value={squares[3]}
        ></Square>
        <Square
          onSquareClicked={() => handleClick(4)}
          value={squares[4]}
        ></Square>
        <Square
          onSquareClicked={() => handleClick(5)}
          value={squares[5]}
        ></Square>
      </div>
      <div style={{ display: "flex" }} className="board-row">
        <Square
          onSquareClicked={() => handleClick(6)}
          value={squares[6]}
        ></Square>
        <Square
          onSquareClicked={() => handleClick(7)}
          value={squares[7]}
        ></Square>
        <Square
          onSquareClicked={() => handleClick(8)}
          value={squares[8]}
        ></Square>
      </div>
    </>
  );
}

export default function Game() {
  // const [xIsNext, setXIsNext] = useState(true); //redundant
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;


  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    //todo
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1)
    setXIsNext(!xIsNext);
  }

  function jumpTo(nextMove){
    // TODO
    setCurrentMove(nextMove);
    setXIsNext(nextMove % 2 === 0);
  }

  const moves = history.map((squares, move)=>{
    let description;
    description = (move>0)?`Go to move #${move}`:"Go to game start";

    return (
      <li key={move}>
        <button onClick={()=>jumpTo(move)}>{description}</button>
      </li>
    )
    

  });

  return (
    <div className="game" style={{display:'flex', flexFlow:'row-wrap'}}>
      <div className="game-board">
        <Board
          xIsNext={xIsNext}
          squares={currentSquares}
          onPlay={handlePlay}
        ></Board>
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
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
}
