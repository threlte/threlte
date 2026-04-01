import { useThrelteUserContext } from '@threlte/core'
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

interface CursorInstance {
  cursor: string
  fallback: string | undefined
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
  cursor: Cursor | Writable<Cursor> = 'pointer',

  /**
   * @deprecated Set the default cursor in CSS instead. This parameter will be removed in a future version.
   */
  onPointerOut?: Cursor | Writable<Cursor>,
  target?: HTMLElement | undefined
): {
  onPointerEnter: () => void
  onPointerLeave: () => void
  hovering: Readable<boolean>
} => {
  let hovering = $state(false)

  const instance: CursorInstance = { cursor: '', fallback: undefined }

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
      hovering: toStore(() => hovering),
      onPointerEnter,
      onPointerLeave
    }
  }

  const el: HTMLElement = target ?? document.body

  if (onPointerOut !== undefined) {
    console.warn(
      'useCursor: onPointerOut is deprecated. Set the default cursor in CSS instead. ' +
        'This parameter will be removed in a future version.'
    )
  }

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
          el.style.cursor = instance.fallback ?? originalCursor
        }
      },
      refresh() {
        if (active.length > 0) {
          el.style.cursor = active[active.length - 1]!.cursor
        }
      }
    }
  })

  // Reactively track cursor values. If cursor or onPointerOut is a
  // store, this effect re-runs when the store changes, keeping the instance
  // in sync and refreshing the cursor if this instance is currently active.
  const cursorStore = fromStore(typeof cursor === 'string' ? writable(cursor) : cursor)
  const fallbackStore =
    onPointerOut !== undefined
      ? fromStore(typeof onPointerOut === 'string' ? writable(onPointerOut) : onPointerOut)
      : undefined

  $effect.pre(() => {
    instance.cursor = cursorStore.current
    if (fallbackStore) {
      instance.fallback = fallbackStore.current
    }
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
    hovering: toStore(() => hovering),
    onPointerEnter,
    onPointerLeave
  }
}
