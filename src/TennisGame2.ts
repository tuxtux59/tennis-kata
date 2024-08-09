import { TennisGame } from './TennisGame';

/**
 * A Tennis Game calculator refactored by @tutux59
 */
export class TennisGame2 implements TennisGame {

  // Player points
  P1point: number = 0;
  P2point: number = 0;

  // Player names
  private player1Name: string;
  private player2Name: string;

  // Score names when max is under 4 or Deuce
  private scoreNames: { [key: number]: string } = {
    0: 'Love',
    1: 'Fifteen',
    2: 'Thirty',
    3: 'Forty',
  }

  /**
   * Creates a TennisGame2 instance
   * @param {string} player1Name Name of first player
   * @param {string} player2Name Name of second player
   */
  constructor(player1Name: string, player2Name: string) {
    this.player1Name = player1Name;
    this.player2Name = player2Name;
  }

  /**
   * Returns the string of an advantage or winned game
   * @param {string} winner name of current winner
   * @param {number} pointDiff point difference
   * @returns {string} The named result of the game
   */
  handleHighResults(winner: string, pointDiff: number): string {
    let scoreResult = pointDiff > 1 ? 'Win for' : 'Advantage'

    return [scoreResult, winner].join(' ');
  }

  /**
   * Convert number to it's related tennis name, ex: 1 -> Fifteen
   * @param {number} scorevalue value to convert into name
   * @returns {string} the converted score into string
   */
  scoreName(scorevalue: number): string {
    return this.scoreNames[scorevalue]
  }

  /**
   * Returns the result name when its lower than deuce or advantage
   * @param min current min value of the game
   * @param max current max value of the game
   * @returns {string} the complete name of the result
   */
  handleLowResults(min: number, max: number): string {
    let minScore = this.scoreName(min);
    let maxScore = this.scoreName(max);
    if (max == min) return minScore + '-All';

    return [minScore, maxScore].join('-')
  }

  getScore(): string {
    let max = Math.max(this.P1point, this.P2point)
    let min = Math.min(this.P1point, this.P2point)
    switch (true) {
      case min == max && max >= 3:
        return 'Deuce'
      case max >= 4:
        let winner = this.P1point > this.P2point ? this.player1Name : this.player2Name
        return this.handleHighResults(winner, max - min)
      default:
        return this.handleLowResults(this.P1point, this.P2point)
    }
  }

  P1Score(): void {
    this.P1point++;
  }

  P2Score(): void {
    this.P2point++;
  }

  wonPoint(player: string): void {
    if (player === 'player1')
      this.P1Score();
    else
      this.P2Score();
  }
}
