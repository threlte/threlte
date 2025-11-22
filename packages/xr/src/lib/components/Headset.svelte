<script lang="ts">
  import type { Snippet } from 'svelte'
  import type { Group } from 'three'
  import { T, useThrelte } from '@threlte/core'
  import { useHeadset } from '../hooks/useHeadset.js'

  interface Props {
    children?: Snippet<[{ ref: Group }]>
  }

  const { children }: Props = $props()

  const { scene } = useThrelte()
  const headset = useHeadset()
</script>

<T
  is={headset}
  attach={scene}
>
  {@render children?.({ ref: headset })}
</T>
