<script lang="ts">
  import { types } from '@theatre/core'
  import { createSheetObjectAction } from '@threlte/theatre'
  import Reveal from '../Reveal.svelte'
  import FadeOut from '../FadeOut.svelte'

  const sheetObject = createSheetObjectAction()

  export let key: string
  let reveal = 0
  let fade = 0
</script>

<div
  {...$$restProps}
  use:sheetObject={{
    key,
    props: {
      opacity: types.number(1, {
        range: [0, 1]
      }),
      translateX: types.number(0, {
        range: [-100, 100]
      }),
      translateY: types.number(0, {
        range: [-100, 100]
      }),
      reveal: types.number(0, {
        range: [0, 1]
      }),
      fade: types.number(0, {
        range: [0, 1]
      })
    },
    callback(node, props) {
      node.style.opacity = props.opacity
      node.style.transform = `translate(${props.translateX}px, ${props.translateY}px)`
      reveal = props.reveal
      fade = props.fade
    }
  }}
>
  <Reveal progress={reveal}>
    <FadeOut progress={fade}>
      <slot />
    </FadeOut>
  </Reveal>
</div>
