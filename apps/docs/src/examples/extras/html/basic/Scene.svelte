<script lang="ts">
  import { onDestroy } from 'svelte'
  import { spring } from 'svelte/motion'

  import { Color, GridHelper, MeshStandardMaterial, SphereBufferGeometry } from 'three'
  import { DEG2RAD } from 'three/src/math/MathUtils'
  import {
    AmbientLight,
    DirectionalLight,
    Mesh,
    OrbitControls,
    PerspectiveCamera,
    useThrelte
  } from '@threlte/core'
  import { HTML } from '@threlte/extras'

  const getRandomColor = () => `#${Math.floor(Math.random() * 16777215).toString(16)}`

  let material = new MeshStandardMaterial({
    color: new Color(getRandomColor()).convertSRGBToLinear()
  })

  const onClick = () => {
    material.color.set(getRandomColor())
    material = material
  }
  let isHovering = false
  let isPointerDown = false

  const { scene } = useThrelte()
  const gridHelper = new GridHelper()
  scene.add(gridHelper)
  onDestroy(() => {
    scene.remove(gridHelper)
  })

  let htmlPosZ = spring(0)
  $: htmlPosZ.set(isPointerDown ? -0.15 : isHovering ? -0.075 : 0, {
    hard: isPointerDown
  })
</script>

<PerspectiveCamera position={{ z: 10, y: 5, x: 10 }} fov={30}>
  <OrbitControls
    target={{ y: 0.75 }}
    maxPolarAngle={85 * DEG2RAD}
    minPolarAngle={20 * DEG2RAD}
    maxAzimuthAngle={45 * DEG2RAD}
    minAzimuthAngle={-45 * DEG2RAD}
    enableZoom={false}
  />
</PerspectiveCamera>

<DirectionalLight position={{ y: 10, z: 10 }} />

<AmbientLight intensity={0.3} />

<Mesh position={{ y: 0.5 }} geometry={new SphereBufferGeometry(0.5)} {material}>
  <HTML position={{ y: 1.25, z: $htmlPosZ }} transform>
    <button
      on:pointerenter={() => (isHovering = true)}
      on:pointerleave={() => {
        isPointerDown = false
        isHovering = false
      }}
      on:pointerdown={() => (isPointerDown = true)}
      on:pointerup={() => (isPointerDown = false)}
      on:pointercancel={() => {
        isPointerDown = false
        isHovering = false
      }}
      on:click={onClick}
      class="bg-brand rounded-full px-3 text-white hover:opacity-90 active:opacity-70"
    >
      I'm a regular HTML button
    </button>
  </HTML>

  <HTML position={{ x: 0.75 }} transform pointerEvents="none">
    <p
      class="text-xs w-auto translate-x-1/2 drop-shadow-lg"
      style="color: #{material.color.getHexString()}"
    >
      color: #{material.color.getHexString()}
    </p>
  </HTML>
</Mesh>
