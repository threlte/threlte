<script lang="ts">
  import { onDestroy } from 'svelte'
  import { EquirectangularReflectionMapping } from 'three'
  import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
  import {
    DirectionalLight,
    Group,
    Object3DInstance,
    useFrame,
    useLoader,
    useThrelte
  } from 'threlte'
  import { useGltf } from 'threlte/extras'

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
</script>

<DirectionalLight position={{ y: 10, z: 10 }} />

<Group rotation={{ y: rotation }}>
  {#if $gltf}
    <Object3DInstance object={$gltf.nodes['node_damagedHelmet_-6514']} />
  {/if}
</Group>
