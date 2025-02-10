<script lang="ts">
  import { computePosition, flip, shift, offset, arrow } from '@floating-ui/dom'
  import type { Snippet } from 'svelte'

  let { children, tooltip }: { children?: Snippet; tooltip?: Snippet } = $props()

  let ref = $state<HTMLElement>()
  let tooltipEl = $state<HTMLElement>()
  let arrowEl = $state<HTMLElement>()

  function showTooltip() {
    if (!tooltipEl) return
    tooltipEl.style.display = 'block'
    update()
  }

  function hideTooltip() {
    if (!tooltipEl) return
    tooltipEl.style.display = ''
  }

  async function update() {
    if (!ref || !tooltipEl || !arrowEl) return
    const { x, y, placement, middlewareData } = await computePosition(ref, tooltipEl, {
      placement: 'top',
      middleware: [offset(2), flip(), shift({ padding: 5 }), arrow({ element: arrowEl })]
    })

    Object.assign(tooltipEl.style, {
      left: `${x}px`,
      top: `${y}px`
    })

    const { x: arrowX, y: arrowY } = middlewareData.arrow ?? {}

    const staticSide = {
      top: 'bottom',
      right: 'left',
      bottom: 'top',
      left: 'right'
    }[placement.split('-')[0]]

    if (!staticSide) return

    Object.assign(arrowEl.style, {
      left: arrowX == null ? '' : `${arrowX}px`,
      top: arrowY == null ? '' : `${arrowY}px`,
      right: '',
      bottom: '',
      [staticSide]: '-4px'
    })
  }
</script>

<div
  role="tooltip"
  bind:this={ref}
  onmouseenter={showTooltip}
  onmouseleave={hideTooltip}
  onfocus={showTooltip}
  onblur={hideTooltip}
>
  {@render children?.()}

  <div
    bind:this={tooltipEl}
    class="tooltip"
    role="tooltip"
  >
    {@render tooltip?.()}

    <div
      bind:this={arrowEl}
      class="arrow"
    ></div>
  </div>
</div>

<style>
  .tooltip {
    display: none;
    width: max-content;
    position: absolute;
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
  }
</style>
