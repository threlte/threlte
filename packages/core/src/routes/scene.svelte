<script lang="ts">
  import { Color } from 'three'
  import { injectPlugin, isInstanceOf, T, useThrelte } from '../lib/index.js'

  const { scene } = useThrelte()
  scene.background = new Color('black')

  let posY = $state(0)
  let makeDefault = $state(false)
  let show = $state(false)
  let height = $state(1)

  window.addEventListener('keydown', (e) => {
    if (e.key === ' ') {
      posY += 1
    }
    if (e.key === 'Enter') {
      makeDefault = !makeDefault
    }
    if (e.key === 's') {
      show = !show
    }
    if (e.key === 'h') {
      height += 1
    }
  })

  injectPlugin('test-plugin', (args) => {
    $effect(() => {
      if (isInstanceOf(args.ref, 'PerspectiveCamera')) {
        console.log(args.makeDefault)
      }
    })
  })
</script>

<T.PerspectiveCamera
  {makeDefault}
  position={[10, 10, 10]}
  oncreate={(ref) => {
    ref.lookAt(0, 0, 0)
  }}
/>

<T.Mesh>
  <T.MeshBasicMaterial />
  <T.Color
    args={['blue']}
    attach="material.color"
  />
  <T.BoxGeometry>
    <T.Mesh position.y={posY}>
      <T.MeshBasicMaterial color="blue" />
      <T.SphereGeometry />
    </T.Mesh>
  </T.BoxGeometry>
</T.Mesh>

{#if show}
  <T.Mesh>
    <T.MeshBasicMaterial />
    <T.BoxGeometry args={[1, height, 1]} />
  </T.Mesh>
{/if}
