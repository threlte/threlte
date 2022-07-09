<script lang="ts">
  import { onDestroy } from 'svelte'
  import { EquirectangularReflectionMapping } from 'three'
  import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
  import {
    AmbientLight,
    GLTF,
    OrbitControls,
    PerspectiveCamera,
    useLoader,
    useThrelte
  } from '@threlte/core'

  const rgbeLoader = useLoader(RGBELoader, () => new RGBELoader())
  const { scene, invalidate } = useThrelte()

  const texture = rgbeLoader.load('/hdr/shanghai_riverside_1k.hdr', () => {
    invalidate('texture loaded')
  })
  texture.mapping = EquirectangularReflectionMapping
  scene.environment = texture

  onDestroy(() => {
    texture.dispose()
  })
</script>

<PerspectiveCamera position={{ x: 5, y: 2, z: 5 }} fov={25}>
  <OrbitControls autoRotate enableDamping />
</PerspectiveCamera>

<AmbientLight />

<GLTF url="/models/helmet/DamagedHelmet.gltf" />
