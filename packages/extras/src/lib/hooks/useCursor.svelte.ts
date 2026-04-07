import { useThrelteUserContext } from '@threlte/core'
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

interface CursorInstance {
  cursor: string
}

interface CursorContext {
  active: CursorInstance[]
  originalCursor: string
  el: HTMLElement
  add: (instance: CursorInstance) => void
  remove: (instance: CursorInstance) => void
  refresh: () => void
}

export const useCursor = (
  cursor: Cursor | (() => Cursor) = 'pointer',
  target: HTMLElement | undefined = undefined
): {
  onPointerEnter: () => void
  onPointerLeave: () => void
  hovering: { readonly current: boolean }
} => {
  let hovering = $state(false)

  const instance: CursorInstance = { cursor: '' }

  const onPointerEnter = () => {
    hovering = true
    ctx.add(instance)
  }

  const onPointerLeave = () => {
    hovering = false
    ctx.remove(instance)
  }

  // Account for SSR
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

  const el: HTMLElement = target ?? document.body

  const ctx = useThrelteUserContext<CursorContext>('threlte-extras-use-cursor', () => {
    const originalCursor = el.style.cursor
    const active: CursorInstance[] = []

    return {
      active,
      originalCursor,
      el,
      add(instance: CursorInstance) {
        active.push(instance)
        el.style.cursor = instance.cursor
      },
      remove(instance: CursorInstance) {
        const index = active.indexOf(instance)
        if (index === -1) return
        active.splice(index, 1)
        if (active.length > 0) {
          el.style.cursor = active[active.length - 1]?.cursor
        } else {
          el.style.cursor = originalCursor
        }
      },
      refresh() {
        if (active.length > 0) {
          el.style.cursor = active[active.length - 1]!.cursor
        }
      }
    }
  })

  const resolvedCursor = typeof cursor === 'string' ? () => cursor : cursor

  $effect.pre(() => {
    instance.cursor = resolvedCursor()
    if (hovering) {
      ctx.refresh()
    }
  })

  // Clean up on unmount
  $effect(() => {
    return () => {
      ctx.remove(instance)
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
