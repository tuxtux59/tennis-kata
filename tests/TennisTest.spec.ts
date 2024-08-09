import * as fs from 'fs';
import * as path from 'path';
import { TennisGame, TennisGame2 } from '../src';

function getAllScores(): Array<[number, number, string]> {
  const testCases = path.resolve(__dirname, 'scores.json');
  const scoreData = fs.readFileSync(testCases).toString();
  const scores = JSON.parse(scoreData);
  return JSON.parse(JSON.stringify(scores));
}

const scores: Array<[number, number, string]> = getAllScores();

function checkScore(
  game: TennisGame,
  player1Score: number,
  player2Score: number,
  expectedScore: string
): void {
  const highestScore: number = Math.max(player1Score, player2Score);
  for (let i = 0; i < highestScore; i++) {
    if (i < player1Score) game.wonPoint('player1');
    
    if (i < player2Score) game.wonPoint('player2');
  }
  expect(game.getScore()).toEqual(expectedScore);
}

describe('TennisGame', () => {

  describe('TennisGame2', () => {
    let game: TennisGame2;

    beforeAll(() => {
      game = new TennisGame2('player1', 'player 2');
    })
    
    scores.forEach(([player1Score, player2Score, expectedScore]) => {
      it(`scores ${player1Score}:${player2Score} as ${expectedScore}`, () => {
        const score = new TennisGame2('player1', 'player2')
        checkScore(score, player1Score, player2Score, expectedScore);
      });
    });

    describe('scoreName/1', () => {
      it('should return proper value', () => {
        expect(game.scoreName(0)).toEqual('Love');
        expect(game.scoreName(1)).toEqual('Fifteen');
        expect(game.scoreName(2)).toEqual('Thirty');
        expect(game.scoreName(3)).toEqual('Forty');
      })
    })
    
    describe('handleHighResults/2', () => {
      it('should return proper value', () => {
        expect(game.handleHighResults('player 1', 1)).toEqual('Advantage player 1');
        expect(game.handleHighResults('player 2', 2)).toEqual('Win for player 2');
        expect(game.handleHighResults('player 1', 4)).toEqual('Win for player 1');
        expect(game.handleHighResults('player 2', 1)).toEqual('Advantage player 2');
      })
    })
  });

});
