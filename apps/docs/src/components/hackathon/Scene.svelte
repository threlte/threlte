<script lang="ts">
  import { T, useFrame } from '@threlte/core'
  import { Align, OrbitControls, useTexture } from '@threlte/extras'
  import { createEventDispatcher, onMount, tick } from 'svelte'
  import { MeshBasicMaterial, MirroredRepeatWrapping, PlaneGeometry, Texture } from 'three'
  import { DEG2RAD } from 'three/src/math/MathUtils.js'
  import PostProcessing from './PostProcessing.svelte'
  import { tweened } from 'svelte/motion'
  import { cubicIn } from 'svelte/easing'

  export let debug: boolean

  let opacity = tweened(0, {
    duration: 2000,
    easing: cubicIn
  })

  const dispatch = createEventDispatcher<{
    loaded: void
  }>()

  const warpTexture = useTexture('/textures/hackathon/warp6.jpg')
  $: if ($warpTexture) {
    $warpTexture.colorSpace = 'srgb'
    $warpTexture.wrapS = MirroredRepeatWrapping
    $warpTexture.wrapT = MirroredRepeatWrapping
  }

  let clonedTexture: Texture | undefined
  onMount(async () => {
    clonedTexture = (await warpTexture).clone()
    clonedTexture.wrapS = MirroredRepeatWrapping
    clonedTexture.wrapT = MirroredRepeatWrapping
    clonedTexture.colorSpace = 'srgb'

    await tick()

    opacity.set(1)
    dispatch('loaded')
  })
  const getWarpTexture = () => $warpTexture
  const getClonedTexture = () => clonedTexture

  useFrame((_, delta) => {
    const speed = 0.1
    const wt = getWarpTexture()
    if (wt) wt.offset.x += speed * delta
    const ct = getClonedTexture()
    if (ct) ct.offset.x += speed * delta
  })

  const heightIterations = 5

  const height = 40
  const offset = 0.2
  const gap = 4.55
  const rotationInDegrees = 85

  const geometry = new PlaneGeometry(100, height)
  if (geometry.attributes.uv) {
    geometry.attributes.uv.array[2] = 0.125
    geometry.attributes.uv.array[6] = 0.125
    geometry.attributes.uv.needsUpdate = true
  }
</script>

{#if !debug}
  <PostProcessing />
{/if}

<T.PerspectiveCamera
  makeDefault={!debug}
  position={[0, 0, 50]}
  fov={90}
  on:create={({ ref }) => {
    ref.lookAt(0, 0, 0)
  }}
/>

<T.PerspectiveCamera
  makeDefault={debug}
  position={[100, 100, 100]}
>
  <OrbitControls />
</T.PerspectiveCamera>

{#if $warpTexture && clonedTexture}
  <Align
    x={false}
    z={false}
  >
    {@const leftMaterial = new MeshBasicMaterial({ map: clonedTexture, transparent: true })}
    {@const rightMaterial = new MeshBasicMaterial({ map: $warpTexture, transparent: true })}
    <!-- LEFT -->
    {#each Array(heightIterations) as _, i}
      {@const isOdd = i % 2 === 0}
      <T.Mesh
        position={[-gap + offset, height * i, 0]}
        rotation.y={rotationInDegrees * DEG2RAD}
        scale.y={isOdd ? -1 : 1}
      >
        <T is={geometry} />
        <T
          is={leftMaterial}
          opacity={$opacity}
        />
      </T.Mesh>
    {/each}

    {#each Array(heightIterations) as _, i}
      {@const isOdd = i % 2 === 0}
      <T.Mesh
        position={[gap - offset, height * i, 0]}
        rotation.y={-rotationInDegrees * DEG2RAD}
        scale.y={isOdd ? -1 : 1}
        scale.x={-1}
      >
        <T is={geometry} />
        <T
          is={rightMaterial}
          opacity={$opacity}
        />
      </T.Mesh>
    {/each}
  </Align>
{/if}
