import "bootstrap/dist/css/bootstrap.css";
import { useState } from "react";
import { TennisGame } from "./Tenis-game";

export function TenisForm() {
  const [playerOneName, setPlayerOneName] = useState("");
  const [playerTwoName, setPlayerTwoName] = useState("");
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isGameFInished, setIsGameFinished] = useState(false);
  const GAME = new TennisGame(playerOneName, playerTwoName);

  function handleSubmit(event: any) {
    event.preventDefault();
    setPlayerOneName(event.target.elements.playerOneName.value);
    setPlayerTwoName(event.target.elements.playerTwoName.value);
    setIsGameStarted(true);
  }

  function playerOnePoint(event: any) {
    event.preventDefault();
    GAME.playerOnePoint();
    showScore();
  }
  function playerTwoPoint(event: any) {
    event.preventDefault();
    GAME.playerTwoPoint();
    showScore();
  }

  function showScore() {
    var ul: any = document.getElementById("score-list");
    var li: any = document.createElement("li");
    li.className = "list-group-item text-dark fw-light";
    li.style = "font-size: 50%";
    li.appendChild(document.createTextNode(GAME.getScore().toString()));
    ul.appendChild(li);
    checkGameFinished();
  }

  function checkGameFinished() {
    if (GAME.getScore().toString().includes("Win")) {
      setIsGameFinished(true);
    }
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
                disabled={isGameFInished}
                onClick={playerOnePoint}
              >
                Won Point
              </button>
            </div>

            <div className="card align-items-center">
              <div className="card-block text-center">
                <h4 className="card-title text-dark">SCORE</h4>
              </div>
              <ul className="list-group list-group-flush" id="score-list"></ul>
            </div>

            <div className="col">
              <label>{playerTwoName}</label>
              <br />
              <button
                className="btn btn-secondary"
                disabled={isGameFInished}
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
