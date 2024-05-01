<script lang="ts">
  import { useTask, useThrelte } from '@threlte/core'
  import { HUD } from '@threlte/extras'
  import { Quaternion } from 'three'
  import HudScene from './HudScene.svelte'

  interface Props {
    onSelect: (arg: string) => void
  }

  let { onSelect }: Props = $props()

  const { camera } = useThrelte()

  const quaternion = new Quaternion()

  useTask(
    () => {
      // Spin mesh to the inverse of the default cameras matrix
      quaternion.copy(camera.current.quaternion).invert()
    },
    { autoInvalidate: false }
  )
</script>

<HUD>
  <HudScene
    {quaternion}
    {onSelect}
  />
</HUD>
