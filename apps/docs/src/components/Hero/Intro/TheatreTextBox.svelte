<script lang="ts">
  import { types } from '@theatre/core'
  import { createSheetObjectAction } from '@threlte/theatre'
  import Reveal from '../Reveal.svelte'
  import FadeOut from '../FadeOut.svelte'

  const sheetObject = createSheetObjectAction()

  interface Props {
    key: string
    children?: import('svelte').Snippet
    [key: string]: any
  }

  let { key, children, ...rest }: Props = $props()
  let reveal = $state(0)
  let fade = $state(0)
</script>

<div
  {...rest}
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
      {@render children?.()}
    </FadeOut>
  </Reveal>
</div>
