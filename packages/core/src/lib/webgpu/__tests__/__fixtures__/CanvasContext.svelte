<script lang="ts">
  import type { WebGPURenderer } from 'three/webgpu'
  import Canvas from '../../Canvas.svelte'
  import type { CreateThrelteContextOptions } from '../../../context/createThrelteContext.svelte.js'
  import { useThrelte, type ThrelteContext } from '../../../context/compounds/useThrelte.js'

  type Props = Omit<CreateThrelteContextOptions<WebGPURenderer>, 'canvas' | 'dom'> & {
    oncontext?: (ctx: ThrelteContext<WebGPURenderer>) => void
  }

  let { oncontext, ...rest }: Props = $props()
</script>

<Canvas {...rest}>
  {@const ctx = useThrelte<WebGPURenderer>()}
  {oncontext?.(ctx)}
</Canvas>
