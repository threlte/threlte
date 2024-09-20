<script lang="ts">
  import { T } from '@threlte/core'
  import { Edges, Text } from '@threlte/extras'
  import { cubicIn, cubicOut } from 'svelte/easing'
  import { tweened } from 'svelte/motion'
  import { derived } from 'svelte/store'
  import { Group, Mesh, MeshBasicMaterial, PlaneGeometry } from 'three'
  import { DEG2RAD } from 'three/src/math/MathUtils.js'
  import { gameState } from './state'

  const { state, score, levelIndex, baseColor } = gameState
  const mainUiTexts = derived(
    [state, score],
    ([state, score]):
      | {
          text: string
          size: {
            width: number
            height: number
          }
        }
      | undefined => {
      if (state === 'game-over')
        return {
          text: `Game Over\nScore: ${score}`,
          size: {
            width: 7,
            height: 2.5
          }
        }
      if (state === 'menu')
        return {
          text: 'Press Space\nto Start',
          size: {
            width: 7.5,
            height: 2.5
          }
        }
      if (state === 'level-complete')
        return {
          text: `Level ${$levelIndex + 1} Complete\nScore: ${score}`,
          size: {
            width: 10,
            height: 2.5
          }
        }
      return undefined
    }
  )

  const scoreNewLines = derived(score, (score) => {
    return score.toString().split('').join('\n')
  })

  const levelIndexNewLines = derived(levelIndex, (levelIndex) => {
    return (levelIndex + 1).toString().split('').join('\n')
  })

  const scale = tweened(0)
  $: {
    const inAnim = !!$mainUiTexts
    scale.set(inAnim ? 0.8 : 0, {
      easing: inAnim ? cubicIn : cubicOut
    })
  }
</script>

<T
  is={Group}
  scale={$scale}
  position.y={2}
>
  <!-- Centered UI background -->
  {#key `${[($mainUiTexts?.size.width ?? 6.5).toString(), ($mainUiTexts?.size.height ?? 2.5).toString()].join('')}`}
    <T
      is={Mesh}
      rotation.x={-90 * DEG2RAD}
      position.y={0.8}
    >
      <T
        is={PlaneGeometry}
        args={[$mainUiTexts?.size.width ?? 6.5, $mainUiTexts?.size.height ?? 2.5]}
      />
      <T
        is={MeshBasicMaterial}
        color="#08060a"
      />

      <Edges
        color={$baseColor}
        scale={1.01}
      />
    </T>
  {/key}

  <!-- Centered UI Text -->
  {#if $mainUiTexts?.text}
    <Text
      font="/fonts/beefd.ttf"
      rotation.x={DEG2RAD * -90}
      anchorX="50%"
      anchorY="50%"
      textAlign="center"
      fontSize={0.4}
      lineHeight={2}
      color={$baseColor}
      position.y={1}
      text={$mainUiTexts?.text}
    />
  {/if}
</T>

<!-- LEVEL (left column) -->
<Text
  font="/fonts/beefd.ttf"
  rotation.x={-90 * DEG2RAD}
  anchorX="50%"
  anchorY="50%"
  textAlign="center"
  fontSize={0.3}
  color={$baseColor}
  position={[-4.56, 1, -3.4]}
  text="LVL"
/>
<Text
  rotation.x={-90 * DEG2RAD}
  anchorX="50%"
  anchorY="0%"
  textAlign="center"
  font="/fonts/beefd.ttf"
  lineHeight={1.4}
  fontSize={0.7}
  color={$baseColor}
  position={[-4.56, 1, -3]}
  text={$levelIndexNewLines}
/>

<!-- SCORE (right column) -->
<Text
  rotation.x={-90 * DEG2RAD}
  anchorX="50%"
  anchorY="50%"
  textAlign="center"
  fontSize={0.3}
  font="/fonts/beefd.ttf"
  color={$baseColor}
  position={[4.56, 1, -3.4]}
  text="SCR"
/>
<Text
  rotation.x={-90 * DEG2RAD}
  anchorX="50%"
  anchorY="0%"
  lineHeight={1.4}
  font="/fonts/beefd.ttf"
  textAlign="center"
  fontSize={0.7}
  color={$baseColor}
  position={[4.56, 1, -3]}
  text={$scoreNewLines}
/>
