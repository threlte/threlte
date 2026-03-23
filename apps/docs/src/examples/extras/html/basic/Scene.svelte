<script lang="ts">
  import { MathUtils } from 'three'
  import { T } from '@threlte/core'
  import { HTML, OrbitControls } from '@threlte/extras'
  import { Spring } from 'svelte/motion'

  type Props = {
    autoRender?: boolean
  }

  let { autoRender = true }: Props = $props()

  const getRandomColor = () =>
    `#${Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, '0')}`

  let color = $state(getRandomColor())
  let isHovering = $state(false)
  let isPointerDown = $state(false)

  let htmlPosZ = new Spring(0)
  $effect(() => {
    htmlPosZ.set(isPointerDown ? -0.15 : isHovering ? -0.075 : 0, {
      hard: isPointerDown
    })
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
    maxPolarAngle={85 * MathUtils.DEG2RAD}
    minPolarAngle={20 * MathUtils.DEG2RAD}
    maxAzimuthAngle={45 * MathUtils.DEG2RAD}
    minAzimuthAngle={-45 * MathUtils.DEG2RAD}
    enableZoom={false}
  />
</T.PerspectiveCamera>

<T.DirectionalLight position={[0, 10, 10]} />

<T.AmbientLight intensity={0.3} />

<T.GridHelper />

<T.Mesh position.y={0.5}>
  <T.MeshStandardMaterial {color} />
  <T.SphereGeometry args={[0.5]} />
  <HTML
    position.y={1.25}
    position.z={htmlPosZ.current}
    transform
    {autoRender}
  >
    <button
      onpointerenter={() => (isHovering = true)}
      onpointerleave={() => {
        isPointerDown = false
        isHovering = false
      }}
      onpointerdown={() => {
        isPointerDown = true
        color = getRandomColor()
      }}
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
    {autoRender}
  >
    <p
      class="w-auto translate-x-1/2 text-xs drop-shadow-lg"
      style="color: {color}"
    >
      color: {color}
    </p>
  </HTML>
</T.Mesh>
