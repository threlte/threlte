<script lang="ts" context="module">
  export type FogExp2Props = {
    color: ColorRepresentation
    density: number | undefined
  }
</script>

<script lang="ts">
  import { onDestroy } from 'svelte'
  import type { ColorRepresentation } from 'three'
  import { FogExp2 } from 'three'
  import { useThrelte } from '../hooks/useThrelte'
  import { useThrelteRoot } from '../hooks/useThrelteRoot'
  import { convertColorRepresentationToColor } from '../lib/colors'

  export let color: FogExp2Props['color'] = 0xffffff
  export let density: FogExp2Props['density'] = undefined

  const { linear } = useThrelteRoot()
  const { scene, render } = useThrelte()

  // @ts-ignore Bad types
  export const fog = new FogExp2(convertColorRepresentationToColor(color, linear), density)

  $: {
    fog.color = convertColorRepresentationToColor(color, linear)
    if (density !== undefined) fog.density = density
    render('FogExp2: props changed')
  }

  scene.fog = fog
  render('FogExp2: added')

  onDestroy(() => {
    scene.fog = null
    render('FogExp2: removed')
  })
</script>
