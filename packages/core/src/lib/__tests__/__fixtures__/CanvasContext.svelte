<script lang="ts">
  import Canvas from '../../Canvas.svelte'
  import type { CreateThrelteContextOptions } from '../../context/createThrelteContext.svelte.js'
  import type { Renderer } from '../../context/fragments/renderer.svelte.js'
  import { useThrelte, type ThrelteContext } from '../../context/compounds/useThrelte.js'

  type Props = Omit<CreateThrelteContextOptions<Renderer>, 'canvas' | 'dom'> & {
    oncontext?: (ctx: ThrelteContext<Renderer>) => void
  }

  let { oncontext, ...rest }: Props = $props()
</script>

<Canvas {...rest}>
  {@const ctx = useThrelte()}
  {oncontext?.(ctx)}
</Canvas>
