import { fromStore, toStore, writable, type Readable, type Writable } from 'svelte/store'
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
  hovering: Readable<boolean>
} => {
  let hovering = $state(false)

  const onPointerEnter = () => {
    hovering = true
  }
  const onPointerLeave = () => {
    hovering = false
  }

  // Account for SSR use
  if (typeof window === 'undefined') {
    return {
      hovering: toStore(() => hovering),
      onPointerEnter,
      onPointerLeave
    }
  }

  const pointerOver = fromStore(
    typeof onPointerOver === 'string' ? writable(onPointerOver) : onPointerOver
  )
  const pointerOut = fromStore(
    typeof onPointerOut === 'string' ? writable(onPointerOut) : onPointerOut
  )

  const el: HTMLElement = target ?? document.body
  const originalCursor = el.style.cursor

  $effect.pre(() => {
    if (hovering) {
      el.style.cursor = pointerOver.current
    } else {
      el.style.cursor = pointerOut.current
    }
  })

  // Reset the cursor style
  $effect(() => {
    return () => {
      el.style.cursor = originalCursor
    }
  })

  return {
    hovering: toStore(() => hovering),
    onPointerEnter,
    onPointerLeave
  }
}
