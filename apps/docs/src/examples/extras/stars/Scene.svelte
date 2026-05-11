<script lang="ts">
  import { T } from '@threlte/core'
  import { OrbitControls, Grid, Stars } from '@threlte/extras'

  interface Props {
    count: number
    radius: number
    depth: number
    factor: number
    saturation: number
    lightness: number
    opacity: number
    fade: boolean
    rounded: boolean
    speed: number
  }

  let { ...rest }: Props = $props()
</script>

<Stars {...rest} />

<T.PerspectiveCamera
  makeDefault
  position.y={1}
  position.x={2}
  position.z={5}
  fov={90}
>
  <OrbitControls
    enableDamping
    enablePan={false}
    enableZoom={false}
    autoRotate
    autoRotateSpeed={0.3}
  />
</T.PerspectiveCamera>

<Grid
  infiniteGrid
  fadeOrigin={[0, 0, 0]}
  fadeDistance={10}
  cellColor="#dddddd"
  sectionColor="#ddd"
/>
