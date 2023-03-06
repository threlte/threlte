<script lang="ts">
  import { T, useFrame } from '@threlte/core'
  import { onDestroy } from 'svelte'
  import { BufferAttribute, BufferGeometry } from 'three'
  import { useRapier } from '../../hooks/useRapier'
  import type { DebugProps } from './Debug.svelte'

  type $$Props = DebugProps

  const { world, debug } = useRapier()

  const buffers = world.debugRender()
  const vertices = new BufferAttribute(buffers.vertices, 3)
  const colors = new BufferAttribute(buffers.colors, 4)

  const geometry = new BufferGeometry()
  geometry.setAttribute('position', vertices)
  geometry.setAttribute('color', colors)

  debug.set(true)

  useFrame(() => {
    const buffers = world.debugRender()

    const vertices = new BufferAttribute(buffers.vertices, 3)
    const colors = new BufferAttribute(buffers.colors, 4)

    geometry.setAttribute('position', vertices)
    geometry.setAttribute('color', colors)
  })

  onDestroy(() => {
    geometry.dispose()
    debug.set(false)
  })
</script>

<T.LineSegments renderOrder={Infinity}>
  <T
    is={geometry}
    attach="geometry"
  />
  <T.LineBasicMaterial
    vertexColors
    {...$$restProps}
  />
</T.LineSegments>
