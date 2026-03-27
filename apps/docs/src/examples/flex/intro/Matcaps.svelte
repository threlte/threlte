<script lang="ts">
  import { useCache } from '@threlte/core'
  import Matcap from './Matcap.svelte'

  const { remember } = useCache()

  const matcapsList = await remember(
    () =>
      fetch('https://cdn.jsdelivr.net/gh/pmndrs/drei-assets@master/matcaps.json').then((response) =>
        response.json()
      ),
    ['matcaps']
  )

  interface Props {
    gridIndex: number
    matcapIndex: number
    format?: 64 | 128 | 256 | 512 | 1024
    width?: number
    height?: number
  }

  let { gridIndex, matcapIndex, format = 256, width = 5, height = 5 }: Props = $props()

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

{#if matcapsList}
  {@const fileName = `${matcapsList[String(matcapIndex)]}${getFormatString(format)}.png`}
  {@const url = `${matcapRoot}/${format}/${fileName}`}

  {#key url}
    <Matcap
      {url}
      {width}
      {height}
      {gridIndex}
    />
  {/key}
{/if}
