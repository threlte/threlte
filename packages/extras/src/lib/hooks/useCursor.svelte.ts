import { watch } from '@threlte/core'
import { onDestroy } from 'svelte'
import { get, writable, type Writable } from 'svelte/store'
import type { LiteralUnion } from 'type-fest'

type Style = LiteralUnion<
  | 'alias'
  | 'all-scroll'
  | 'auto'
  | 'cell'
  | 'context-menu'
  | 'col-resize'
  | 'copy'
  | 'crosshair'
  | 'default'
  | 'e-resize'
  | 'ew-resize'
  | 'grab'
  | 'grabbing'
  | 'help'
  | 'move'
  | 'n-resize'
  | 'ne-resize'
  | 'nesw-resize'
  | 'ns-resize'
  | 'nw-resize'
  | 'nwse-resize'
  | 'no-drop'
  | 'none'
  | 'not-allowed'
  | 'pointer'
  | 'progress'
  | 'row-resize'
  | 's-resize'
  | 'se-resize'
  | 'sw-resize'
  | 'text'
  | 'w-resize'
  | 'wait'
  | 'zoom-in'
  | 'zoom-out',
  string
>

export class Hovering {
  #current = $state(false)
  #element = $state(document.body)
  #hoverStyle: Style = $state('pointer')
  #unhoverStyle: Style = $state('auto')
  constructor(
    hoverStyle: Style = 'pointer',
    unhoverStyle: Style = 'auto',
    element = document.body
  ) {
    this.#element = element
    this.#hoverStyle = hoverStyle
    this.#unhoverStyle = unhoverStyle

    $effect(() => {
      if (this.#current) {
        this.#element.style.cursor = this.#hoverStyle
        return () => {
          this.#element.style.cursor = this.#unhoverStyle
        }
      }
    })
  }

  get current() {
    return this.#current
  }

  static of(
    hoverStyle: () => Style = () => 'pointer',
    unhoverStyle: () => Style = () => 'auto',
    element: () => HTMLElement = () => document.body
  ) {
    const hovering = new Hovering()

    $effect(() => {
      hovering.#hoverStyle = hoverStyle()
    })

    $effect(() => {
      hovering.#unhoverStyle = unhoverStyle()
    })

    $effect(() => {
      hovering.#element = element()
    })

    return hovering
  }

  hover() {
    this.#current = true
  }

  unhover() {
    this.#current = false
  }
}

export const useCursor = (
  onPointerOver: Style | Writable<Style> = 'pointer',
  onPointerOut: Style | Writable<Style> = 'auto',
  target: HTMLElement | undefined = undefined
): {
  onPointerEnter: () => void
  onPointerLeave: () => void
  hovering: Writable<boolean>
} => {
  let hovering = false
  const hoveringStore = writable(false)

  const onPointerEnter = () => {
    hoveringStore.set(true)
  }
  const onPointerLeave = () => {
    hoveringStore.set(false)
  }

  // Account for SSR use
  if (typeof window === 'undefined') {
    return {
      hovering: hoveringStore,
      onPointerEnter,
      onPointerLeave
    }
  }

  const el: HTMLElement = target ?? document.body

  let onPointerOverValue = typeof onPointerOver === 'string' ? onPointerOver : get(onPointerOver)
  if (typeof onPointerOver !== 'string') {
    watch(onPointerOver, (cursorStyle) => {
      onPointerOverValue = cursorStyle
      if (hovering) {
        el.style.cursor = cursorStyle
      }
    })
  }

  let onPointerOutValue = typeof onPointerOut === 'string' ? onPointerOut : get(onPointerOut)
  if (typeof onPointerOut !== 'string') {
    watch(onPointerOut, (cursorStyle) => {
      onPointerOutValue = cursorStyle
      if (!hovering) {
        el.style.cursor = cursorStyle
      }
    })
  }

  watch(hoveringStore, (isHovering) => {
    hovering = isHovering
    if (hovering) {
      el.style.cursor = onPointerOverValue
    } else {
      el.style.cursor = onPointerOutValue
    }
  })

  // onDestroy: Reset the cursor style
  onDestroy(() => {
    el.style.cursor = onPointerOutValue
  })

  return {
    hovering: hoveringStore,
    onPointerEnter,
    onPointerLeave
  }
}
