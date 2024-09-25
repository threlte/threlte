<script lang="ts">
  import { BakeShadows } from '@threlte/extras'
  import { T, useTask } from '@threlte/core'

  type Props = {
    bake: boolean
  }

  let { bake }: Props = $props()

  let rotation = $state(0)
  useTask((delta) => {
    rotation += delta
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
  castShadow
  position.y={1}
  rotation.y={rotation}
>
  <T.BoxGeometry args={[1, 2, 1]} />
  <T.MeshStandardMaterial color="hotpink" />
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
