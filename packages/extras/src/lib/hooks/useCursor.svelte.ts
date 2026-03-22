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
  onPointerOver: Cursor | (() => Cursor) = 'pointer',
  onPointerOut: Cursor | (() => Cursor) = 'auto',
  target: HTMLElement | undefined = undefined
): {
  onPointerEnter: () => void
  onPointerLeave: () => void
  hovering: { readonly current: boolean }
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
      hovering: {
        get current() {
          return hovering
        }
      },
      onPointerEnter,
      onPointerLeave
    }
  }

  const pointerOver = $derived(
    typeof onPointerOver === 'function' ? onPointerOver() : onPointerOver
  )
  const pointerOut = $derived(typeof onPointerOut === 'function' ? onPointerOut() : onPointerOut)

  const el: HTMLElement = target ?? document.body
  const originalCursor = el.style.cursor

  $effect(() => {
    el.style.cursor = hovering ? pointerOver : pointerOut
  })

  // Reset the cursor style
  $effect(() => {
    return () => {
      el.style.cursor = originalCursor
    }
  })

  return {
    hovering: {
      get current() {
        return hovering
      }
    },
    onPointerEnter,
    onPointerLeave
  }
}
