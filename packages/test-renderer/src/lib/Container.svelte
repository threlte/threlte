<script>
  import { createThrelteContext, useScheduler } from '@threlte/core'
  import { interactivity } from '@threlte/extras'

  import { mockAdvanceFn } from './advance'
  import { mockCanvas } from './canvas'

  /**
   * @type {{
   *   canvas: HTMLCanvasElement
   *   container: HTMLElement
   *   component: typeof import('svelte').SvelteComponent
   *   contextOptions?: Record<string, any>
   *   ref: import('svelte').SvelteComponent | import('svelte').Component | undefined
   *   [key: string]: any
   * }}
   */
  let {
    canvas = document.createElement('canvas'),
    container,
    component: Component,
    contextOptions = {},
    ref,
    ...rest
  } = $props()

  $effect.pre(() => {
    canvas.style =
      'display: block; position: relative; width: 100%; height: 100%;'
    mockCanvas(canvas)
  })

  /** @type {import('@threlte/core').ThrelteContext<import('three').WebGLRenderer>} */
  export const context = createThrelteContext(() => ({
    renderMode: 'on-demand',
    autoRender: true,
    ...contextOptions,
    canvas,
    dom: container,
  }))
  export const scheduler = useScheduler()
  scheduler.frameInvalidated.current = false

  export const advance = mockAdvanceFn()
  export const interactivityContext = interactivity()
</script>

<Component bind:this={ref} {...rest} />
