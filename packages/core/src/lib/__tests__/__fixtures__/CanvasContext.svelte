<script lang="ts">
  import Context from '../../components/Context/Context.svelte'
  import type { CreateThrelteContextOptions } from '../../context/createThrelteContext.svelte.js'
  import type { Renderer } from '../../context/fragments/renderer.svelte.js'
  import { useThrelte, type ThrelteContext } from '../../context/compounds/useThrelte.js'

  type Props = Omit<CreateThrelteContextOptions<Renderer>, 'canvas' | 'dom'> & {
    oncontext?: (ctx: ThrelteContext<Renderer>) => void
  }

  let { oncontext, ...rest }: Props = $props()

  const canvas = document.createElement('canvas')
  const dom = document.createElement('div')
  dom.style.cssText = 'position: relative; width: 200px; height: 200px;'
  dom.append(canvas)
  document.body.append(dom)
</script>

<Context {canvas} {dom} {...rest}>
  {@const ctx = useThrelte()}
  {oncontext?.(ctx)}
</Context>
