<script lang="ts">
  import { T, isInstanceOf } from '@threlte/core'
  import {
    global,
    RoundedBoxGeometry,
    useTexture,
    createTransition,
    useCursor
  } from '@threlte/extras'
  import { cubicIn, cubicOut } from 'svelte/easing'
  import { Spring } from 'svelte/motion'
  import { Texture } from 'three'

  let { url, gridIndex, width = 5, height = 5 } = $props()

  const { onPointerEnter, onPointerLeave, hovering } = useCursor()

  const texture = useTexture(url)

  const animDelay = $derived(gridIndex * 10)

  const scale = new Spring(0.9)

  $effect(() => {
    scale.set(hovering.current ? 1 : 0.9)
  })

  const scaleTransition = (useDelay: boolean) => {
    return createTransition((ref, { direction }) => {
      if (!isInstanceOf(ref, 'Object3D')) return
      return {
        tick(t) {
          ref.scale.setScalar(t)
        },
        delay: useDelay ? animDelay + (direction === 'in' ? 200 : 0) : 0,
        duration: 200,
        easing: direction === 'in' ? cubicOut : cubicIn
      }
    })
  }
</script>

{#if texture.current}
  <T.Group
    in={global(scaleTransition(true))}
    out={global(scaleTransition(true))}
  >
    <T.Mesh
      scale.x={(width / 100) * scale.current}
      scale.y={(height / 100) * scale.current}
      scale.z={scale.current}
      position.z={20}
      onpointerenter={onPointerEnter}
      onpointerleave={onPointerLeave}
    >
      <RoundedBoxGeometry
        args={[100, 100, 20]}
        radius={2}
      />
      <T.MeshMatcapMaterial matcap={texture.current as Texture} />
    </T.Mesh>
  </T.Group>
{/if}
