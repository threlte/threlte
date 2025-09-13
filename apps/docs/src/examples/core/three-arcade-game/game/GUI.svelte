<script lang="ts">
  import { MathUtils } from 'three'
  import { T } from '@threlte/core'
  import { Edges, Text } from '@threlte/extras'
  import { cubicIn, cubicOut } from 'svelte/easing'
  import { Tween } from 'svelte/motion'
  import { game } from './Game.svelte'

  let mainUiTexts = $derived.by(() => {
    if (game.state === 'game-over')
      return {
        text: `Game Over\nScore: ${game.score}`,
        size: {
          width: 7,
          height: 2.5
        }
      }
    if (game.state === 'menu')
      return {
        text: 'Press Space\nto Start',
        size: {
          width: 7.5,
          height: 2.5
        }
      }
    if (game.state === 'level-complete')
      return {
        text: `Level ${game.levelIndex + 1} Complete\nScore: ${game.score}`,
        size: {
          width: 10,
          height: 2.5
        }
      }
    return undefined
  })

  const scale = new Tween(0)

  $effect(() => {
    const inAnim = !!mainUiTexts
    scale.set(inAnim ? 0.8 : 0, {
      easing: inAnim ? cubicIn : cubicOut
    })
  })
</script>

<T.Group
  scale={scale.current}
  position.y={2}
>
  <!-- Centered UI background -->
  {#key `${[(mainUiTexts?.size.width ?? 6.5).toString(), (mainUiTexts?.size.height ?? 2.5).toString()].join('')}`}
    <T.Mesh
      rotation.x={-90 * MathUtils.DEG2RAD}
      position.y={0.8}
    >
      <T.PlaneGeometry args={[mainUiTexts?.size.width ?? 6.5, mainUiTexts?.size.height ?? 2.5]} />
      <T.MeshBasicMaterial color="#08060a" />

      <Edges
        color={game.baseColor}
        scale={1.01}
      />
    </T.Mesh>
  {/key}

  <!-- Centered UI Text -->
  {#if mainUiTexts?.text}
    <Text
      font="/fonts/beefd.ttf"
      rotation.x={MathUtils.DEG2RAD * -90}
      anchorX="50%"
      anchorY="50%"
      textAlign="center"
      fontSize={0.4}
      lineHeight={2}
      color={game.baseColor}
      position.y={1}
      text={mainUiTexts?.text}
    />
  {/if}
</T.Group>

<!-- LEVEL (left column) -->
<Text
  font="/fonts/beefd.ttf"
  rotation.x={-90 * MathUtils.DEG2RAD}
  anchorX="50%"
  anchorY="50%"
  textAlign="center"
  fontSize={0.3}
  color={game.baseColor}
  position={[-4.56, 1, -3.4]}
  text="LVL"
/>
<Text
  rotation.x={-90 * MathUtils.DEG2RAD}
  anchorX="50%"
  anchorY="0%"
  textAlign="center"
  font="/fonts/beefd.ttf"
  lineHeight={1.4}
  fontSize={0.7}
  color={game.baseColor}
  position={[-4.56, 1, -3]}
  text={(game.levelIndex + 1).toString()}
/>

<!-- SCORE (right column) -->
<Text
  rotation.x={-90 * MathUtils.DEG2RAD}
  anchorX="50%"
  anchorY="50%"
  textAlign="center"
  fontSize={0.3}
  font="/fonts/beefd.ttf"
  color={game.baseColor}
  position={[4.56, 1, -3.4]}
  text="SCR"
/>
<Text
  rotation.x={-90 * MathUtils.DEG2RAD}
  anchorX="50%"
  anchorY="0%"
  lineHeight={1.4}
  font="/fonts/beefd.ttf"
  textAlign="center"
  fontSize={0.7}
  color={game.baseColor}
  position={[4.56, 1, -3]}
  text={game.score.toString()}
/>
