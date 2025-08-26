<script lang="ts">
  import type { Mesh } from 'three'
  import { BakeShadows } from '@threlte/extras'
  import { T, useTask } from '@threlte/core'

  type Props = {
    bake: boolean
  }

  let { bake }: Props = $props()

  let mesh = $state.raw<Mesh>()

  useTask((delta) => {
    if (mesh) {
      mesh.rotation.y += delta
    }
  })
</script>

<T.PerspectiveCamera
  makeDefault
  position={[10, 10, 10]}
  oncreate={(ref) => {
    ref.lookAt(0, 1, 0)
  }}
/>

<T.DirectionalLight
  position={[0, 10, 10]}
  castShadow
/>

<T.Mesh
  bind:ref={mesh}
  castShadow
  position.y={1}
>
  <T.BoxGeometry args={[1, 2, 1]} />
  <T.MeshStandardMaterial color="orangered" />
</T.Mesh>

<T.Mesh
  receiveShadow
  rotation.x={-1 * 0.5 * Math.PI}
>
  <T.CircleGeometry args={[4, 40]} />
  <T.MeshStandardMaterial color="white" />
</T.Mesh>

{#if bake}
  <BakeShadows />
{/if}
