<script lang="ts">
  import { asyncWritable, isInstanceOf, T, useCache } from '@threlte/core'
  import {
    createTransition,
    global,
    RoundedBoxGeometry,
    useCursor,
    useTexture
  } from '@threlte/extras'
  import { cubicIn, cubicOut } from 'svelte/easing'
  import { Spring } from 'svelte/motion'

  const cache = useCache()

  const matcapsList = asyncWritable(
    cache.remember(async () => {
      const matcapListResponse = await fetch(
        'https://cdn.jsdelivr.net/gh/pmndrs/drei-assets@master/matcaps.json'
      )
      return (await matcapListResponse.json()) as Record<string, string>
    }, ['matcaps'])
  )

  interface Props {
    gridIndex: number
    matcapIndex: number
    format?: 64 | 128 | 256 | 512 | 1024
    width?: number
    height?: number
  }

  let { gridIndex, matcapIndex, format = 256, width = 5, height = 5 }: Props = $props()

  const { onPointerEnter, onPointerLeave, hovering } = useCursor()
  const scale = new Spring(0.9)

  $effect(() => {
    scale.set($hovering ? 1 : 0.9)
  })

  const matcapRoot =
    'https://rawcdn.githack.com/emmelleppi/matcaps/9b36ccaaf0a24881a39062d05566c9e92be4aa0d'

  function getFormatString(fmt: typeof format) {
    switch (fmt) {
      case 64:
        return '-64px'
      case 128:
        return '-128px'
      case 256:
        return '-256px'
      case 512:
        return '-512px'
      default:
        return ''
    }
  }

  const animDelay = gridIndex * 10
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

{#if $matcapsList}
  {@const fileName = `${$matcapsList[String(matcapIndex)]}${getFormatString(format)}.png`}
  {@const url = `${matcapRoot}/${format}/${fileName}`}

  {#key url}
    {#await useTexture(url) then matcap}
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
          <T.MeshMatcapMaterial {matcap} />
        </T.Mesh>
      </T.Group>
    {/await}
  {/key}
{/if}
