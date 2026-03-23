<script lang="ts">
  import { MathUtils } from 'three'
  import { T } from '@threlte/core'
  import Character from './Character.svelte'

  let { action } = $props()
</script>

<T.PerspectiveCamera
  makeDefault
  position={[-0.85, 1.75, 2.46]}
  oncreate={(ref) => {
    ref.lookAt(0, 1, 0)
  }}
/>

<T.AmbientLight />
<T.DirectionalLight
  position={[10, 5, 5]}
  castShadow
/>

<Character actionKey={action} />

<T.Mesh
  rotation.x={MathUtils.degToRad(-90)}
  receiveShadow
>
  <T.CircleGeometry args={[3, 72]} />
  <T.MeshStandardMaterial color={'white'} />
</T.Mesh>
