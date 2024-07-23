<script lang="ts">
  import { T, asyncWritable, useCache } from '@threlte/core'
  import { RoundedBoxGeometry, useCursor, useTexture } from '@threlte/extras'
  import { spring } from 'svelte/motion'

  const cache = useCache()

  const matcapsList = asyncWritable(
    cache.remember(async () => {
      const matcapListResponse = await fetch(
        'https://cdn.jsdelivr.net/gh/pmndrs/drei-assets@master/matcaps.json'
      )
      return (await matcapListResponse.json()) as Record<string, string>
    }, ['matcaps'])
  )

  export let gridIndex: number
  export let matcapIndex: number
  export let format: 64 | 128 | 256 | 512 | 1024 = 256
  export let width = 5
  export let height = 5

  const { onPointerEnter, onPointerLeave, hovering } = useCursor()
  const scale = spring(0.9)
  $: scale.set($hovering ? 1 : 0.9)

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
</script>

{#if $matcapsList}
  {@const fileName = `${$matcapsList[String(matcapIndex)]}${getFormatString(format)}.png`}
  {@const url = `${matcapRoot}/${format}/${fileName}`}

  {#await useTexture(url) then matcap}
    <T.Group>
      <T.Mesh
        scale.x={(width / 100) * $scale}
        scale.y={(height / 100) * $scale}
        scale.z={$scale}
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
{/if}
