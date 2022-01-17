<script lang="ts">
  import { onDestroy } from 'svelte'
  import type { ColorRepresentation } from 'three'
  import { Fog } from 'three'
  import { convertColorRepresentationToColor } from '../lib/colors'
  import { defaults } from '../lib/defaults'
  import { useThrelte } from '../hooks/useThrelte'
  import { useThrelteRoot } from '../hooks/useThrelteRoot'

  export let color: ColorRepresentation = defaults.fog.color
  export let near = defaults.fog.near
  export let far = defaults.fog.far

  const { linear } = useThrelteRoot()
  const { scene, render } = useThrelte()

  export const fog = new Fog(convertColorRepresentationToColor(color, linear), near, far)

  $: {
    const convertedColor = convertColorRepresentationToColor(color, linear)
    fog.color = convertedColor
    fog.near = near
    fog.far = far
    render('Fog: props changed')
  }

  scene.fog = fog
  render('Fog: added')

  onDestroy(() => {
    scene.fog = null
    render('Fog: removed')
  })
</script>
