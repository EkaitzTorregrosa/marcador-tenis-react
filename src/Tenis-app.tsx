import "bootstrap/dist/css/bootstrap.css";
import { useEffect, useState } from "react";
import { TennisGame } from "./Tenis-game";

export function TenisForm() {
  const [playerOneName, setPlayerOneName] = useState("");
  const [playerTwoName, setPlayerTwoName] = useState("");
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isGameFinished, setIsGameFinished] = useState(false);
  const [, setScoreBoard] = useState("");
  const [game, setGame] = useState(
    new TennisGame(playerOneName, playerTwoName)
  );
  const [punctuationsArray] = useState<string[]>([]);

  useEffect(() => {
    if (isGameStarted) {
      let newGame: TennisGame = new TennisGame(playerOneName, playerTwoName);
      setGame(newGame);
    }
  }, [isGameStarted, playerOneName, playerTwoName]);

  function handleSubmit(event: any) {
    event.preventDefault();
    setPlayerOneName(event.target.elements.playerOneName.value);
    setPlayerTwoName(event.target.elements.playerTwoName.value);
    setIsGameStarted(true);
    punctuationsArray.push(game.getScore().toString());
  }

  function playerOnePoint(event: any) {
    event.preventDefault();
    game.playerOnePoint();
    showScore();
    punctuationsArray.push(game.getScore().toString());
  }
  function playerTwoPoint(event: any) {
    event.preventDefault();
    game.playerTwoPoint();
    showScore();
    punctuationsArray.push(game.getScore().toString());
  }

  function showScore() {
    setScoreBoard(game.getScore().toString());
    checkGameFinished();
  }

  function checkGameFinished() {
    if (game.getScore().toString().includes("Win")) {
      setIsGameFinished(true);
    }
  }

  function printScore() {
    return punctuationsArray.map((score) => {
      if (score.includes("Win")) {
        return (
          <li
            className="list-group-item list-group-item-success text-dark font-weight-bold"
            style={{ fontSize: "70%" }}
          >
            {score}
          </li>
        );
      } else {
        return (
          <li
            className="list-group-item text-dark font-weight-light"
            style={{ fontSize: "50%" }}
          >
            {score}
          </li>
        );
      }
    });
  }

  function newGame() {
    setIsGameStarted(false);
  }

  if (isGameStarted) {
    return (
      <div className="container mt-5 col-6">
        <form id="formPesos" onSubmit={newGame}>
          <div className="row">
            <div className="col">
              <label>{playerOneName}</label>
              <br />
              <button
                className="btn btn-secondary"
                disabled={isGameFinished}
                onClick={playerOnePoint}
              >
                Won Point
              </button>
            </div>

            <div className="card align-items-center">
              <div className="card-block text-center">
                <h4 className="card-title text-dark">SCORE</h4>
              </div>
              <ul className="list-group list-group-flush" id="score-list">
                {printScore()}
              </ul>
            </div>

            <div className="col">
              <label>{playerTwoName}</label>
              <br />
              <button
                className="btn btn-secondary"
                disabled={isGameFinished}
                onClick={playerTwoPoint}
              >
                Won Point
              </button>
            </div>
          </div>
          <div className="mt-5">
            <button type="submit" className="btn btn-primary">
              New Game
            </button>
          </div>
        </form>
      </div>
    );
  } else {
    return (
      <div className="container mt-5 col-6">
        <form id="formPesos" onSubmit={handleSubmit}>
          <div className="row">
            <div className="col">
              <label>Player 1</label>
              <input
                type="text"
                name="playerOneName"
                className="form-control"
                placeholder="Player 1 name"
                required={true}
              />
            </div>
            <div className="col">
              <label>Player 2</label>
              <input
                type="text"
                name="playerTwoName"
                className="form-control"
                placeholder="Player 2 name"
                required={true}
              />
            </div>
          </div>
          <div className="mt-5">
            <button type="submit" className="btn btn-primary">
              Play!
            </button>
          </div>
        </form>
      </div>
    );
  }
}
