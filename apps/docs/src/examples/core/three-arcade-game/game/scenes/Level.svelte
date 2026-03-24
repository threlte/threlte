<script lang="ts">
  import { onDestroy } from 'svelte'
  import type { ArcadeAudio } from '../sound'
  import { arenaBorderWidth, arenaHeight, arenaWidth, blockGap } from '../config'
  import { useTimeout } from '../hooks/useTimeout'
  import { levels } from './levels'
  import { game } from '../Game.svelte'
  import Block from '../objects/Block.svelte'
  import type { BlockData } from '../objects/types'

  let blocks = $state<BlockData[]>([])

  const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

  let bgVolume = 0.6

  let levelBackgroundAudio: ArcadeAudio | undefined = undefined

  const map = (value: number, inMin: number, inMax: number, outMin: number, outMax: number) => {
    return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin
  }

  const playLevelSound = () => {
    levelBackgroundAudio = game.sound.play('levelSlow', {
      loop: true,
      volume: bgVolume,
      playbackRate: map(game.levelIndex, 0, levels.length - 1, 1.0, 2)
    })
  }

  playLevelSound()

  onDestroy(() => {
    if (levelBackgroundAudio) {
      levelBackgroundAudio.source.stop()
    }
  })

  let levelStarted = false
  const buildBlocks = async () => {
    if (game.state !== 'level-loading') return
    const { rows, columns } = levels[game.levelIndex]!

    const blockSize =
      (arenaWidth - arenaBorderWidth - ((columns - 1) * blockGap + 2 * blockGap)) / columns
    const startAtX = ((arenaWidth - arenaBorderWidth) / 2) * -1 + blockSize / 2
    const startAtZ = ((arenaHeight - arenaBorderWidth) / 2) * -1 + blockSize / 2 + blockGap

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        blocks.push({
          position: {
            x: startAtX + blockGap + j * blockGap + j * blockSize,
            z: startAtZ + i * blockGap + i * blockSize
          },
          hit: false,
          size: blockSize,
          freeze: false,
          staticColors: {
            inner: 'blue',
            outer: 'red'
          },
          blinkingColors: undefined
        })
        blocks = blocks
        await wait(16)
      }
    }

    levelStarted = true
    game.state = 'await-ball-spawn'
  }

  const { timeout } = useTimeout()

  buildBlocks()

  const onGameOver = async () => {
    if (!levelStarted) return
    blocks.forEach((block) => {
      block.freeze = true
      if (!block.hit) {
        block.blinkingColors = {
          innerA: 'red',
          innerB: 'black',
          outerA: 'red',
          outerB: 'red'
        }
      } else {
        block.blinkingColors = undefined
        block.staticColors = {
          inner: 'black',
          outer: 'red'
        }
      }
    })
    timeout(() => {
      blocks.forEach((block) => {
        block.blinkingColors = undefined
        if (!block.hit) {
          block.staticColors = {
            inner: 'red',
            outer: 'red'
          }
        } else {
          block.staticColors = {
            inner: 'black',
            outer: 'red'
          }
        }
      })
    }, 1e3)
    if (levelBackgroundAudio) levelBackgroundAudio.fade(0, 300)
    game.sound.play('gameOver2', { volume: 0.5 })?.onEnded()
  }

  const onLevelComplete = async () => {
    if (!levelStarted) return
    blocks.forEach((block) => {
      block.freeze = true
      block.blinkingColors = {
        innerA: 'black',
        innerB: 'green',
        outerA: 'white',
        outerB: 'white'
      }
    })
    timeout(() => {
      blocks.forEach((block) => {
        block.staticColors = {
          inner: 'green',
          outer: 'white'
        }
        block.blinkingColors = undefined
      })
    }, 1e3)
    if (levelBackgroundAudio) levelBackgroundAudio.fade(0.2, 200)
    await game.sound.play('levelComplete')?.onEnded()
    if (levelBackgroundAudio) levelBackgroundAudio.fade(bgVolume, 200)
  }

  $effect(() => {
    if (game.state === 'game-over') onGameOver()
    if (game.state === 'level-complete') onLevelComplete()
  })

  const onHit = (block: BlockData) => {
    if (game.state === 'game-over' || game.state === 'level-complete') return
    game.score += 1
    block.hit = true
    block.blinkingColors = undefined
    block.staticColors = {
      inner: 'yellow',
      outer: 'red'
    }
    if (blocks.every((block) => block.hit)) {
      game.state = 'level-complete'
    }
  }
</script>

{#each blocks as block, index (index)}
  <Block
    {...block}
    onHit={() => {
      onHit(block)
    }}
  />
{/each}
