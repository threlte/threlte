import type { Scene } from 'three'
import { Sound } from './sound'
import { GameStates } from './types'
import { CameraControls } from './lib'

class Game {
  state: GameStates = $state(GameStates.Intro)
  gameOver = $state(false)
  cameraControls: CameraControls | undefined = $state(undefined)
  sound = new Sound()
  muted = $state(false)

  gameScene: Scene | undefined = $state(undefined)
  levelIndex: number = $state(0)

  playerPosition: [number, number] = $state([0, 0])

  score = $state(0)

  debug = $state(false)

  restart() {
    this.reset()
    this.state = GameStates.Menu
  }

  reset() {
    this.state = GameStates.Intro
    this.levelIndex = 0
    this.gameOver = false
    this.score = 0
    this.playerPosition = [0, 0]
  }
  nextLevel() {}

  startGame() {
    this.state = GameStates.LoadingLevel
  }
}

export const game = new Game()
