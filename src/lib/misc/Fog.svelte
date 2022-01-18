<script lang="ts" context="module">
  export type FogProps = {
    color: ColorRepresentation
    near: number | undefined
    far: number | undefined
  }
</script>

<script lang="ts">
  import { onDestroy } from 'svelte'
  import type { ColorRepresentation } from 'three'
  import { Fog } from 'three'
  import { useThrelte } from '../hooks/useThrelte'
  import { useThrelteRoot } from '../hooks/useThrelteRoot'
  import { convertColorRepresentationToColor } from '../lib/colors'

  export let color: FogProps['color'] = 0xffffff
  export let near: FogProps['near'] = undefined
  export let far: FogProps['far'] = undefined

  const { linear } = useThrelteRoot()
  const { scene, render } = useThrelte()

  export const fog = new Fog(convertColorRepresentationToColor(color, linear), near, far)

  $: {
    if (color !== undefined) fog.color = convertColorRepresentationToColor(color, linear)
    if (near !== undefined) fog.near = near
    if (far !== undefined) fog.far = far
    render('Fog: props changed')
  }

  scene.fog = fog
  render('Fog: added')

  onDestroy(() => {
    scene.fog = null
    render('Fog: removed')
  })
</script>
