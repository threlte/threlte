import { watch } from '@threlte/core'
import { onDestroy } from 'svelte'
import { get, writable, type Writable } from 'svelte/store'
import type { LiteralUnion } from 'type-fest'

type Cursor = LiteralUnion<
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

export const useCursor = (
  onPointerOver: Cursor | Writable<Cursor> = 'pointer',
  onPointerOut: Cursor | Writable<Cursor> = 'auto',
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
