<script lang="ts">
  import { T, useTask } from '@threlte/core'
  import { onDestroy } from 'svelte'
  import { BufferAttribute, BufferGeometry } from 'three'
  import { useRapier } from '../../hooks/useRapier'
  import type { DebugProps } from './Debug.svelte'

  type $$Props = DebugProps

  const { world, debug } = useRapier()

  const geometry = new BufferGeometry()

  debug.set(true)

  useTask(() => {
    const buffers = world.debugRender()

    const vertices = new BufferAttribute(buffers.vertices, 3)
    const colors = new BufferAttribute(buffers.colors, 4)

    geometry.setAttribute('position', vertices)
    geometry.setAttribute('color', colors)
  })

  onDestroy(() => {
    debug.set(false)
  })
</script>

<T.LineSegments
  frustumCulled={false}
  renderOrder={Infinity}
>
  <T is={geometry} />
  <T.LineBasicMaterial
    vertexColors
    {...$$restProps}
  />
</T.LineSegments>
