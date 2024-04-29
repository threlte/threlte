<script lang="ts">
  import { arrow, computePosition, offset, shift, type Placement } from '@floating-ui/dom'
  import { Pane } from 'svelte-tweakpane-ui'
  import IconButton from '../Internal/IconButton.svelte'
  import type { Icons } from '../Internal/Icon.svelte'

  let ref: HTMLElement
  let tooltipEl: HTMLElement
  let arrowEl: HTMLElement

  export let placement: Placement = 'bottom'
  export let title: string = ''
  export let icon: Icons = 'mdiChevronDown'

  export let visible = false

  export const show = () => {
    tooltipEl.style.display = 'block'
    update()
    visible = true
  }

  export const hide = () => {
    tooltipEl.style.display = 'none'
    visible = false
  }

  export let toggle = () => {
    if (!visible) show()
    else hide()
  }

  async function update() {
    const {
      x,
      y,
      placement: finalPlacement,
      middlewareData,
    } = await computePosition(ref, tooltipEl, {
      placement,
      middleware: [offset(2), shift({ padding: 6 }), arrow({ element: arrowEl })],
    })

    Object.assign(tooltipEl.style, {
      left: `${x}px`,
      top: `${y}px`,
    })

    const { x: arrowX, y: arrowY } = middlewareData.arrow ?? {}

    const staticSide = {
      top: 'bottom',
      right: 'left',
      bottom: 'top',
      left: 'right',
    }[finalPlacement.split('-')[0]]

    if (!staticSide) return

    Object.assign(arrowEl.style, {
      left: arrowX == null ? '' : `${arrowX}px`,
      top: arrowY == null ? '' : `${arrowY}px`,
      right: '',
      bottom: '',
      [staticSide]: '-4px',
    })
  }

  function clickOutside(element: HTMLElement, callbackFunction: () => void) {
    function onClick(event: MouseEvent) {
      if (event.target && !element.contains(event.target as any)) {
        callbackFunction()
      }
    }

    document.body.addEventListener('click', onClick)

    return {
      update(newCallbackFunction: () => void) {
        callbackFunction = newCallbackFunction
      },
      destroy() {
        document.body.removeEventListener('click', onClick)
      },
    }
  }
</script>

<div
  style="display: contents;"
  use:clickOutside={() => {
    hide()
  }}
>
  <div bind:this={ref}>
    <IconButton
      {icon}
      label="Toggle Pane"
      on:click={() => {
        toggle()
      }}
    />
  </div>

  <div
    bind:this={tooltipEl}
    class="tooltip"
    role="menu"
  >
    <Pane
      position="inline"
      {title}
      expanded
      userExpandable={false}
    >
      <slot />
    </Pane>
    <div
      bind:this={arrowEl}
      class="arrow"
    />
  </div>
</div>

<style>
  .tooltip {
    display: none;
    width: max-content;
    position: fixed;
    top: 0;
    left: 0;
    background: #222;
    color: white;
    padding: 4px;
    border-radius: 3px;
    font-size: 11px;
    font-family: monospace;
    z-index: 1000;
  }
  .arrow {
    position: absolute;
    background: #222;
    width: 8px;
    height: 8px;
    transform: rotate(45deg);
    border-bottom-right-radius: 999px;
  }
</style>
