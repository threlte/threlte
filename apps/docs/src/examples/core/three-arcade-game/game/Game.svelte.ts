import { Color, PerspectiveCamera, Scene, Texture } from 'three'
import { levels } from './levels'
import type { RigidBody } from '@dimforge/rapier3d-compat'

type GameStates =
  | 'off'
  | 'intro'
  | 'await-intro-skip'
  | 'menu'
  | 'game-over'
  | 'await-ball-spawn'
  | 'playing'
  | 'level-loading'
  | 'level-complete'
  | 'outro'

class Game {
  state: GameStates = $state('off')
  levelIndex: number = $state(0)
  score = $state(0)
  gameOver = $state(false)
  playerPosition = $state(0)
  ballPosition = $state({
    x: 0,
    z: 0
  })
  baseColor = $derived.by(() => {
    if (this.state == 'outro') return 'green'
    return 'red'
  })
  muted = $state(true)
  blinkClock: 0 | 1 = $state(0)
  arcadeMachineScene: Scene | undefined = $state(undefined)
  averageScreenColor = $state(new Color('black'))
  gameScene: Scene | undefined = $state(undefined)
  gameCamera: PerspectiveCamera | undefined = $state(undefined)
  gameTexture: Texture | undefined = $state(undefined)
  ballRigidBody: RigidBody | undefined = $state(undefined)
  debug = $state(false)
  orbitControls = $state(false)
  restart() {
    this.reset()
    this.state = 'menu'
  }
  reset() {
    this.state = 'intro'
    this.levelIndex = 0
    this.gameOver = false
    this.score = 0
    this.playerPosition = 0
    this.ballPosition = {
      x: 0,
      z: 0
    }
  }
  nextLevel() {
    if (this.levelIndex < levels.length - 1) {
      this.levelIndex += 1
      this.state = 'level-loading'
    } else {
      this.state = 'outro'
    }
  }

  switchOff() {
    this.reset()
    this.state = 'off'
  }

  /**
   * Optionally resets the game and starts it again
   */
  startGame() {
    this.state = 'level-loading'
  }
}

export const game = new Game()

export const debugValue = $state(0.5)
