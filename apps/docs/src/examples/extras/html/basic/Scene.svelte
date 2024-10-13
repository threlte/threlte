<script lang="ts">
  import { T } from '@threlte/core'
  import { HTML, OrbitControls } from '@threlte/extras'
  import { spring } from 'svelte/motion'
  import { Color, MeshStandardMaterial } from 'three'
  import { DEG2RAD } from 'three/src/math/MathUtils.js'

  const getRandomColor = () =>
    `#${Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, '0')}`

  let material = new MeshStandardMaterial({
    color: new Color(getRandomColor())
  })

  const onClick = () => {
    console.log('CLICK')
    material.color.set(getRandomColor())
  }

  let isHovering = false
  let isPointerDown = false

  let htmlPosZ = spring(0)
  $: htmlPosZ.set(isPointerDown ? -0.15 : isHovering ? -0.075 : 0, {
    hard: isPointerDown
  })
</script>

<T.PerspectiveCamera
  position={[10, 5, 10]}
  makeDefault
  fov={30}
  oncreate={(ref) => ref.lookAt(0, 0.75, 0)}
>
  <OrbitControls
    target.y={0.75}
    maxPolarAngle={85 * DEG2RAD}
    minPolarAngle={20 * DEG2RAD}
    maxAzimuthAngle={45 * DEG2RAD}
    minAzimuthAngle={-45 * DEG2RAD}
    enableZoom={false}
  />
</T.PerspectiveCamera>

<T.DirectionalLight position={[0, 10, 10]} />

<T.AmbientLight intensity={0.3} />

<T.GridHelper />

<T.Mesh
  position.y={0.5}
  {material}
>
  <T.SphereGeometry args={[0.5]} />
  <HTML
    position.y={1.25}
    position.z={$htmlPosZ}
    transform
  >
    <button
      onclick={onClick}
      onpointerenter={() => (isHovering = true)}
      onpointerleave={() => {
        isPointerDown = false
        isHovering = false
      }}
      onpointerdown={() => (isPointerDown = true)}
      onpointerup={() => (isPointerDown = false)}
      onpointercancel={() => {
        isPointerDown = false
        isHovering = false
      }}
      class="rounded-full bg-orange-500 px-3 text-white hover:opacity-90 active:opacity-70"
    >
      I'm a regular HTML button
    </button>
  </HTML>

  <HTML
    position.x={0.75}
    transform
    pointerEvents="none"
  >
    <p
      class="w-auto translate-x-1/2 text-xs drop-shadow-lg"
      style="color: #{material.color.getHexString()}"
    >
      color: #{material.color.getHexString()}
    </p>
  </HTML>
</T.Mesh>
