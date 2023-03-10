<script lang="ts">
  import { onDestroy } from 'svelte'
  import { get, writable } from 'svelte/store'
  import { play, type ArcadeAudio } from '../../sound'
  import { arenaBorderWidth, arenaHeight, arenaWidth, blockGap } from '../config'
  import { useTimeout } from '../hooks/useTimeout'
  import { levels } from '../levels'
  import { gameState } from '../state'
  import Block, { type BlockData } from './Block.svelte'

  let blocks: BlockData[] = []

  const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

  let bgVolume = 0.6

  const { state, score, levelIndex } = gameState

  let levelBackgroundAudio: ArcadeAudio | undefined = undefined

  const map = (value: number, inMin: number, inMax: number, outMin: number, outMax: number) => {
    return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin
  }

  const playLevelSound = () => {
    levelBackgroundAudio = play('levelSlow', {
      loop: true,
      volume: bgVolume,
      playbackRate: map($levelIndex, 0, levels.length - 1, 1.0, 2)
    })
  }

  playLevelSound()

  onDestroy(() => {
    if (levelBackgroundAudio) {
      console.log('stopping audio')
      levelBackgroundAudio.source.stop()
    }
  })

  let levelStarted = false
  const buildBlocks = async () => {
    if ($state !== 'level-loading') return
    const { rows, columns } = levels[get(levelIndex)]!

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
          hit: writable(false),
          size: blockSize,
          freeze: writable(false),
          staticColors: writable({
            inner: 'blue',
            outer: 'red'
          }),
          blinkingColors: writable(undefined)
        })
        blocks = blocks
        await wait(16)
      }
    }

    levelStarted = true
    state.set('await-ball-spawn')
  }

  const { timeout } = useTimeout()

  buildBlocks()

  const onGameOver = async () => {
    if (!levelStarted) return
    blocks.forEach((block) => {
      block.freeze.set(true)
      if (!get(block.hit)) {
        block.blinkingColors.set({
          innerA: 'red',
          innerB: 'black',
          outerA: 'red',
          outerB: 'red'
        })
      } else {
        block.blinkingColors.set(undefined)
        block.staticColors.set({
          inner: 'black',
          outer: 'red'
        })
      }
    })
    timeout(() => {
      blocks.forEach((block) => {
        block.blinkingColors.set(undefined)
        if (!get(block.hit)) {
          block.staticColors.set({
            inner: 'red',
            outer: 'red'
          })
        } else {
          block.staticColors.set({
            inner: 'black',
            outer: 'red'
          })
        }
      })
    }, 1e3)
    if (levelBackgroundAudio) levelBackgroundAudio.fade(0, 300)
    play('gameOver2', { volume: 0.5 })?.onEnded()
  }

  const onLevelComplete = async () => {
    if (!levelStarted) return
    blocks.forEach((block) => {
      block.freeze.set(true)
      block.blinkingColors.set({
        innerA: 'black',
        innerB: 'green',
        outerA: 'white',
        outerB: 'white'
      })
    })
    timeout(() => {
      blocks.forEach((block) => {
        block.staticColors.set({
          inner: 'green',
          outer: 'white'
        })
        block.blinkingColors.set(undefined)
      })
    }, 1e3)
    if (levelBackgroundAudio) levelBackgroundAudio.fade(0.2, 200)
    await play('levelComplete')?.onEnded()
    if (levelBackgroundAudio) levelBackgroundAudio.fade(bgVolume, 200)
  }

  $: if ($state === 'game-over') onGameOver()
  $: if ($state === 'level-complete') onLevelComplete()

  const onHit = (block: BlockData) => {
    if ($state === 'game-over' || $state === 'level-complete') return
    score.update((score) => score + 1)
    block.hit.set(true)
    block.blinkingColors.set(undefined)
    block.staticColors.set({
      inner: 'yellow',
      outer: 'red'
    })
    if (blocks.every((block) => get(block.hit))) {
      state.set('level-complete')
    }
  }
</script>

{#each blocks as block, index (index)}
  <Block
    {...block}
    on:hit={() => onHit(block)}
  />
{/each}
