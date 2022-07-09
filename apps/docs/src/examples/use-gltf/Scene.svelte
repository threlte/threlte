<script lang="ts">
  import { onDestroy } from 'svelte'
  import { derived } from 'svelte/store'
  import { EquirectangularReflectionMapping } from 'three'
  import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
  import {
    DirectionalLight,
    Group,
    Object3DInstance,
    PerspectiveCamera,
    useFrame,
    useLoader,
    useThrelte,
    useGltf
  } from '@threlte/core'

  let rotation = 0
  useFrame(() => {
    rotation += 0.01
  })

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

  const { gltf } = useGltf<'node_damagedHelmet_-6514', 'Material_MR'>(
    '/models/helmet/DamagedHelmet.gltf'
  )

  const helmet = derived(gltf, (gltf) => {
    if (!gltf || !gltf.nodes['node_damagedHelmet_-6514']) return
    return gltf.nodes['node_damagedHelmet_-6514']
  })
</script>

<PerspectiveCamera position={{ z: 10 }} fov={20} />

<DirectionalLight position={{ y: 10, z: 10 }} />

<Group rotation={{ y: rotation }}>
  {#if $helmet}
    <Object3DInstance object={$helmet} />
  {/if}
</Group>
