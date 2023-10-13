<script lang="ts">
  import { T, useFrame, useParent } from '@threlte/core'
  import { PerspectiveCamera } from 'three'
  import { DEG2RAD } from 'three/src/math/MathUtils.js'

  const parent = useParent()

  if (!($parent instanceof PerspectiveCamera)) {
    throw new Error('Parent must be a PerspectiveCamera')
  }

  const camera = $parent

  export let opacity = 0
  export let color: string
  export let offset = 0.1

  let near = 0.1

  useFrame(() => {
    near = camera.near
  })
</script>

<T.Mesh
  position.z={-(near + offset)}
  rotation.z={90 * DEG2RAD}
>
  <T.PlaneGeometry args={[1, 1]} />
  <T.MeshBasicMaterial
    {color}
    transparent
    {opacity}
    toneMapped={false}
  />
</T.Mesh>
