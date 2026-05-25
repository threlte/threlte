<script lang="ts">
  import { T, useCamera } from '@threlte/core'

  interface Props {
    firstMakeDefault?: boolean
    firstManual?: boolean
    onmanual: (manual: boolean) => void
    secondManual?: boolean
    showSecond?: boolean
  }

  let {
    firstMakeDefault = true,
    firstManual = true,
    onmanual,
    secondManual = true,
    showSecond = false
  }: Props = $props()

  const camera = useCamera()

  $effect(() => {
    onmanual(camera.manual.current)
  })
</script>

<T.PerspectiveCamera
  makeDefault={firstMakeDefault}
  manual={firstManual}
/>

{#if showSecond}
  <T.OrthographicCamera
    makeDefault
    manual={secondManual}
  />
{/if}
