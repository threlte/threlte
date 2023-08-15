<script lang='ts'>

import { T } from '@threlte/core'

export let color: string
export let length = 1

</script>

<T.Mesh position.z={-0.8} rotation.x={-Math.PI / 2} {...$$props}>
  <T.CylinderGeometry args={[0.001, 0.03, length]} />
  <T.MeshStandardMaterial {color} />
</T.Mesh>
