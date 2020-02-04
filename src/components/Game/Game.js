import React from "react";
import Board from "../Board/Board";

const Game = props => {
 const [history, setHistory] = React.useState([
  { squares: Array(9).fill(null) }
 ]);
 const [current, setCurrent] = React.useState(history[history.length - 1]);
 const [xisNext, setXisNext] = React.useState(true);

 const calculateWinner = squares => {
  const lines = [
   [0, 1, 2],
   [3, 4, 5],
   [6, 7, 8],
   [0, 3, 6],
   [1, 4, 7],
   [2, 5, 8],
   [0, 4, 8],
   [2, 4, 6]
  ];

  for (let i = 0; i < lines.length; i++) {
   const [a, b, c] = lines[i];

   if (
    current.squares[a] &&
    current.squares[a] === current.squares[b] &&
    current.squares[a] === current.squares[c]
   ) {
    return true;
   }
  }
  return false;
 };
 React.useEffect(() => {
  setCurrent(history[history.length - 1]);
 }, [history]);

 const handleClick = i => {
  const squares = current.squares.slice();

  squares[i] = xisNext ? "X" : "O";
  setXisNext(!xisNext);
  setHistory(history.concat([{ squares: squares }]));
 };

 const jumpTo = move => {
  setXisNext(move % 2 === 0);
  setCurrent(history[move]);
 };

 const moves = history.map((step, move) => {
  const desc = move ? "Go to move #" + move : "Go to game start";
  return (
   <li key={move}>
    <button onClick={() => jumpTo(move)}>{desc}</button>
   </li>
  );
 });

 return (
  <div className="game">
   {!calculateWinner(current.squares) ? (
    <>
     <div className="game-board">
      <Board current={current} handleClick={i => handleClick(i)}></Board>
      <br></br>
      <br></br>
      <ol>{moves}</ol>
     </div>
     <div className="game-info">{xisNext ? "X" : "O"} go next</div>
    </>
   ) : (
    <div>{!xisNext ? "X" : "O"} is the winner</div>
   )}
  </div>
 );
};

export default Game;
