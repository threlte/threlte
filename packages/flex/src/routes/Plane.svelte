<script lang="ts">
  import { T } from '@threlte/core'
  import { DoubleSide } from 'three'
  import { DEG2RAD } from 'three/src/math/MathUtils.js'

  export let color: string = 'white'
  export let height = 1
  export let width = 1
</script>

<T.Mesh>
  <T.PlaneGeometry args={[width, height]} />
  <T.MeshBasicMaterial
    {color}
    transparent
    opacity={0.5}
  />
</T.Mesh>
