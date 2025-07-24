<script lang="ts">
  import type { Snippet } from 'svelte'
  import type { ISheet } from '@theatre/core'
  import { Sheet } from '@threlte/theatre'
  import { mapLinear } from 'three/src/math/MathUtils.js'
  import { scrollPos, springScrollPos } from './scrollPos'

  interface Props {
    useSpring?: boolean
    name: string
    startAtScrollPosition?: number
    endAtScrollPosition?: number
    children?: Snippet
  }

  let {
    useSpring = true,
    name,
    startAtScrollPosition = 0,
    endAtScrollPosition = 1,
    children
  }: Props = $props()

  let sheet = $state<ISheet>()

  let sheetProgress = $derived(
    Math.max(
      mapLinear(
        useSpring ? $springScrollPos : $scrollPos,
        startAtScrollPosition,
        endAtScrollPosition,
        0,
        10
      ),
      0
    )
  )

  $effect(() => {
    if (sheet) {
      sheet.sequence.position = sheetProgress
    }
  })
</script>

<Sheet
  bind:sheet
  {name}
>
  {@render children?.()}
</Sheet>
