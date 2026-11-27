<script lang="ts">
  import { useTask, useThrelte } from '@threlte/core'
  import { untrack } from 'svelte'

  interface Props {
    autoStart: boolean
    autoInvalidate: boolean
    prop1?: number
  }

  let { autoStart, autoInvalidate, prop1 }: Props = $props()

  const { invalidate } = useThrelte()

  useTask(() => {}, {
    running: () => autoStart,
    autoInvalidate: untrack(() => autoInvalidate),
  })

  $effect.pre(() => {
    if (prop1) {
      invalidate()
    }
  })
</script>
