<script lang="ts">
  import { computePosition, flip, shift, offset, arrow } from '@floating-ui/dom'

  let ref: HTMLElement
  let tooltipEl: HTMLElement
  let arrowEl: HTMLElement

  function showTooltip() {
    tooltipEl.style.display = 'block'
    update()
  }

  function hideTooltip() {
    tooltipEl.style.display = ''
  }

  async function update() {
    const { x, y, placement, middlewareData } = await computePosition(ref, tooltipEl, {
      placement: 'top',
      middleware: [offset(2), flip(), shift({ padding: 5 }), arrow({ element: arrowEl })],
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
    }[placement.split('-')[0]]

    if (!staticSide) return

    Object.assign(arrowEl.style, {
      left: arrowX == null ? '' : `${arrowX}px`,
      top: arrowY == null ? '' : `${arrowY}px`,
      right: '',
      bottom: '',
      [staticSide]: '-4px',
    })
  }
</script>

<div
  role="tooltip"
  bind:this={ref}
  on:mouseenter={showTooltip}
  on:mouseleave={hideTooltip}
  on:focus={showTooltip}
  on:blur={hideTooltip}
>
  <slot />

  <div
    bind:this={tooltipEl}
    class="tooltip"
    role="tooltip"
  >
    <slot name="tooltip" />
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
