import { onDestroy } from 'svelte'
import { get, writable, type Writable } from 'svelte/store'
import { useThrelte } from 'threlte'
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
  onPointerOut: Cursor | Writable<Cursor> = 'auto'
): {
  onPointerEnter: () => void
  onPointerLeave: () => void
  hovering: Writable<boolean>
} => {
  const hovering = writable(false)
  const onPointerEnter = () => {
    hovering.set(true)
  }
  const onPointerLeave = () => {
    hovering.set(false)
  }

  // Account for SSR use
  if (typeof window === 'undefined') {
    return {
      hovering,
      onPointerEnter,
      onPointerLeave
    }
  }

  let el: HTMLElement = document.body
  const rootCtx = useThrelte()
  if (rootCtx && rootCtx.renderer) el = rootCtx.renderer.domElement

  const unsubscribeHovering = hovering.subscribe((isHovering) => {
    if (isHovering) {
      el.style.cursor = typeof onPointerOver === 'string' ? onPointerOver : get(onPointerOver)
    } else {
      el.style.cursor = typeof onPointerOut === 'string' ? onPointerOut : get(onPointerOut)
    }
  })
  onDestroy(unsubscribeHovering)

  if (typeof onPointerOver !== 'string') {
    const unsubscribeOnPointerOver = onPointerOver.subscribe((onPointerOver) => {
      if (get(hovering)) {
        el.style.cursor = onPointerOver
      }
    })
    onDestroy(unsubscribeOnPointerOver)
  }

  if (typeof onPointerOut !== 'string') {
    const unsubscribeOnPointerOut = onPointerOut.subscribe((onPointerOut) => {
      if (get(hovering)) {
        el.style.cursor = onPointerOut
      }
    })
    onDestroy(unsubscribeOnPointerOut)
  }

  // onDestroy: Reset the cursor style
  onDestroy(() => {
    el.style.cursor = typeof onPointerOut === 'string' ? onPointerOut : get(onPointerOut)
  })

  return {
    hovering,
    onPointerEnter,
    onPointerLeave
  }
}
