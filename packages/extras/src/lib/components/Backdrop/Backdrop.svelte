<script lang="ts">
  import type { BackdropProps } from './types'
  import type { Group, PlaneGeometry } from 'three'
  import type { Props } from '@threlte/core'
  import { T, useThrelte } from '@threlte/core'
  import { easeInExpo } from './easeInExpo'

  let {
    floor = 0.25,
    receiveShadow = false,
    segments = 20,
    children,
    ...props
  }: Omit<Props<typeof Group>, 'receiveShadow'> & BackdropProps = $props()

  let geometry = $state<PlaneGeometry>()
  const position = $derived(geometry?.getAttribute('position'))
  const s = $derived(segments + 1)

  const offset = 0.5

  const { invalidate } = useThrelte()

  $effect(() => {
    if (position !== undefined) {
      let i = 0

      for (let x = 0; x < s; x += 1) {
        for (let y = 0; y < s; y += 1) {
          const xOverSegments = x / segments
          position.setXYZ(
            i,
            xOverSegments - offset + +(x === 0) * -1 * floor,
            y / segments - offset,
            easeInExpo(xOverSegments)
          )
          i += 1
        }
      }
      position.needsUpdate = true
      geometry?.computeVertexNormals()
      invalidate()
    }
  })
</script>

<T.Group {...props}>
  {#snippet children({ ref })}
    <T.Mesh
      {receiveShadow}
      rotation.x={-1 * 0.5 * Math.PI}
      rotation.z={0.5 * Math.PI}
    >
      <T.PlaneGeometry
        args={[1, 1, segments, segments]}
        bind:ref={geometry}
      />
      {@render children?.({ ref })}
    </T.Mesh>
  {/snippet}
</T.Group>
