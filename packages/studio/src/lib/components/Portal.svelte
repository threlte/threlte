<script
  module
  lang="ts"
>
  import { tick, type Snippet } from 'svelte'

  /**
   * Usage: <div use:portal={'css selector'}> or <div use:portal={document.body}>
   *
   * @param {HTMLElement} el
   * @param {HTMLElement|string} target DOM Element or CSS Selector
   */
  function portal(el: HTMLElement, target: HTMLElement | string = 'body') {
    let targetEl: HTMLElement | null

    async function update(newTarget: HTMLElement | string) {
      target = newTarget
      if (typeof target === 'string') {
        targetEl = document.querySelector(target)
        if (targetEl === null) {
          await tick()
          targetEl = document.querySelector(target)
        }
        if (targetEl === null) {
          throw new Error(`No element found matching css selector: '${target}'`)
        }
      } else {
        targetEl = target
      }

      targetEl.append(el)
    }

    update(target)

    return {
      update,
      destroy() {
        el.remove()
      }
    }
  }
</script>

<script lang="ts">
  let {
    target = 'body',
    children,
    ...rest
  }: {
    /**
     * DOM Element or CSS Selector
     */
    target?: HTMLElement | string
    children?: Snippet
    [key: string]: any
  } = $props()
</script>

<div
  use:portal={target}
  style="display: contents;"
  {...rest}
>
  {@render children?.()}
</div>
