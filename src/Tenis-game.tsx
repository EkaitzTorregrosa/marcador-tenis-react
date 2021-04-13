export class TennisGame {
  private playerOneScore: number = 0;
  private playerTwoScore: number = 0;
  private playerTwoName: String;
  private playerOneName: String;

  public constructor(playerOneName: String, playerTwoName: String) {
    this.playerOneName = playerOneName;
    this.playerTwoName = playerTwoName;
  }

  public getScore(): String {
    if (this.hasWinner()) {
      return "Win " + this.playerWithHighestScore();
    }

    if (this.hasAdvantage()) {
      return "Advantage " + this.playerWithHighestScore();
    }

    if (this.isDeuce()) return "Deuce";

    if (this.playerOneScore === this.playerTwoScore) {
      return this.convertScore(this.playerOneScore) + " all";
    }

    return (
      this.convertScore(this.playerOneScore) +
      " - " +
      this.convertScore(this.playerTwoScore)
    );
  }

  private isDeuce(): Boolean {
    return (
      this.playerOneScore >= 3 && this.playerTwoScore === this.playerOneScore
    );
  }

  private playerWithHighestScore(): String {
    if (this.playerOneScore > this.playerTwoScore) {
      return this.playerOneName;
    } else {
      return this.playerTwoName;
    }
  }

  private hasWinner(): Boolean {
    if (
      this.playerTwoScore >= 4 &&
      this.playerTwoScore >= this.playerOneScore + 2
    )
      return true;
    if (
      this.playerOneScore >= 4 &&
      this.playerOneScore >= this.playerTwoScore + 2
    )
      return true;
    return false;
  }

  private hasAdvantage(): Boolean {
    if (
      this.playerOneScore >= 4 &&
      this.playerOneScore === this.playerTwoScore + 1
    ) {
      return true;
    } else if (
      this.playerTwoScore >= 4 &&
      this.playerTwoScore === this.playerOneScore + 1
    ) {
      return true;
    } else {
      return false;
    }
  }

  public playerOnePoint() {
    this.playerOneScore++;
  }

  public playerTwoPoint() {
    this.playerTwoScore++;
  }

  private convertScore(score: number): String {
    switch (score) {
      case 3:
        return "Forty";
      case 2:
        return "Thirty";
      case 1:
        return "Fifteen";
      case 0:
        return "Love";
      default:
        return "Incorrect score";
    }
  }
}
