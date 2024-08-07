<script lang="ts">
  import { NoToneMapping } from 'three'
  import { useThrelte } from '@threlte/core'
  import HUD from '../HUD/HUD.svelte'
  import Scene from './Scene.svelte'
  import type { GizmoProps } from './Gizmo.svelte'

  const { camera, renderer } = useThrelte()

  let { toneMapped, ...rest }: GizmoProps = $props()
</script>

<HUD toneMapping={toneMapped ? renderer.toneMapping : NoToneMapping}>
  <Scene
    {...rest}
    mainCamera={$camera}
  />
</HUD>
