<script lang="ts">
  import { Color } from 'three'
  import { T, useThrelte } from '../lib'

  const { scene, invalidate } = useThrelte()
  scene.background = new Color('black')

  setTimeout(() => {
    console.log(scene)
    invalidate()
  }, 2e3)

  let show = $state(false)

  let args = $state([])

  window.addEventListener('keydown', (e) => {
    if (e.key === ' ') {
      show = !show
    }
    if (e.key === 'Enter') {
      args = []
    }
  })
</script>

<T.PerspectiveCamera
  makeDefault
  position={[10, 10, 10]}
  oncreate={(ref) => {
    ref.lookAt(0, 0, 0)
  }}
/>

<T.Mesh {args}>
  <T.MeshBasicMaterial />
  <T.Color
    args={['blue']}
    attach="material.color"
  />
  <T.BoxGeometry>
    {#if show}
      <T.Mesh position={[3, 0, 0]}>
        <T.MeshBasicMaterial color="blue" />
        <T.SphereGeometry />
      </T.Mesh>
    {/if}
  </T.BoxGeometry>
</T.Mesh>
