<script lang="ts">
  import { LineSegments, useFrame } from '@threlte/core'
  import { onDestroy } from 'svelte'
  import { BufferAttribute, BufferGeometry, LineBasicMaterial } from 'three'
  import { useRapier } from '../../hooks/useRapier'
  import type { DebugProps } from './Debug.svelte'

  export let vertexColors: DebugProps['vertexColors'] = true

  const material = new LineBasicMaterial({
    vertexColors,
    ...($$props as DebugProps)
  })

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
    material.dispose()
    debug.set(false)
  })
</script>

<LineSegments
  renderOrder={Infinity}
  {geometry}
  {material}
/>
