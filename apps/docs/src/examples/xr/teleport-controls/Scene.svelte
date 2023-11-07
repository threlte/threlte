<script lang='ts'>
  import * as THREE from 'three'
  import { T, useThrelte } from '@threlte/core'
  import { XR, Controller, Hand, useTeleport } from '@threlte/xr'
  import Surfaces from './Surfaces.svelte'

  const { camera, renderer } = useThrelte()
  const teleport = useTeleport()

  renderer.setClearColor(0x000000)

  camera.current.position.z = 1.75
  camera.current.lookAt(0, 1.75, 1)

  teleport(new THREE.Vector3(0.5, 0, 0.5))
</script>

<XR>
  <Controller left />
  <Controller right />
  <Hand left />
  <Hand right />
</XR>

<Surfaces />

<T.AmbientLight />

<T.DirectionalLight
  position={[5, 5, 1]}
  castShadow
  shadow.camera.top={50}
  shadow.camera.right={50}
  shadow.camera.left={-50}
  shadow.camera.bottom={-50}
  shadow.mapSize.width={1024}
  shadow.mapSize.height={1024}
/>

<T.PerspectiveCamera
  makeDefault
  position.y={1.8}
  position.z={15}
/>