<script lang="ts">
  import { T } from '@threlte/core'
  import { SVG, OrbitControls } from '@threlte/extras'
</script>

<T.PerspectiveCamera
  makeDefault
  position.z={5}
  position.y={1}
>
  <OrbitControls
    autoRotate
    enablePan={false}
    enableZoom={false}
  />
</T.PerspectiveCamera>

<SVG
  src="/icons/svelte.svg"
  scale={0.005}
  position.x={-1.2}
  position.y={1.5}
/>
