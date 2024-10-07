<script lang="ts">
  import type { ISheet } from '@theatre/core'
  import { Sheet } from '@threlte/theatre'
  import { scrollPos, springScrollPos } from './scrollPos'
  import { clamp, mapLinear } from 'three/src/math/MathUtils.js'

  export let useSpring = true
  export let name: string

  export let startAtScrollPosition = 0
  export let endAtScrollPosition = 1

  let sheet: ISheet | undefined

  $: sheetProgress = Math.max(
    mapLinear(
      useSpring ? $springScrollPos : $scrollPos,
      startAtScrollPosition,
      endAtScrollPosition,
      0,
      10
    ),
    0
  )
  $: if (sheet) {
    sheet.sequence.position = sheetProgress
  }
</script>

<Sheet
  bind:sheet
  {name}
>
  <slot />
</Sheet>
