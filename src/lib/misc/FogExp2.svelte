<script lang="ts">
  import { onDestroy } from 'svelte'
  import { FogExp2 as ThreeFogExp2 } from 'three'
  import { useThrelte } from '../hooks/useThrelte'
  import { useThrelteRoot } from '../hooks/useThrelteRoot'
  import { convertColorRepresentationToColor } from '../lib/colors'
  import type { FogExp2Properties } from '../types/components'

  export let color: FogExp2Properties['color'] = 0xffffff
  export let density: FogExp2Properties['density'] = undefined

  const { linear } = useThrelteRoot()
  const { scene, render } = useThrelte()

  // @ts-ignore Bad types
  export const fog = new ThreeFogExp2(convertColorRepresentationToColor(color, linear), density)

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
