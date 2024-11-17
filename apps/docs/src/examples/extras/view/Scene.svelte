<script lang="ts">
  import { T, useTask, useThrelte } from '@threlte/core'
  import { OrbitControls } from '@threlte/extras'
  import { Color } from 'three'

  let { geometry, material } = $props()

  const { scene } = useThrelte()
  let rotation = $state(0)

  scene.background = new Color(0xe0e0e0)

  useTask((delta) => {
    rotation += delta
  })
</script>

<T.PerspectiveCamera
  makeDefault
  position={[0, 0, 2]}
  fov={50}
  near={1}
  far={10}
>
  <OrbitControls
    minDistance={2}
    maxDistance={5}
    enablePan={false}
  />
</T.PerspectiveCamera>

<T.HemisphereLight args={[0xaaaaaa, 0x444444, 3]} />
<T.DirectionalLight
  args={[0xffffff, 1.5]}
  position={[1, 1, 1]}
/>

<T.Mesh rotation.y={rotation}>
  <T is={geometry} />
  <T is={material} />
</T.Mesh>
