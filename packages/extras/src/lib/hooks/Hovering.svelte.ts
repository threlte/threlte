import type { LiteralUnion } from 'type-fest'

type Styles = LiteralUnion<
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
  current: boolean = $state(false)
  constructor(
    hoverStyle: Styles | (() => Styles) = 'pointer',
    unhoverStyle: Styles | (() => Styles) = 'auto',
    element: HTMLElement | (() => HTMLElement) = document.body
  ) {
    $effect(() => {
      const _element = typeof element === 'function' ? element() : element
      if (this.current) {
        _element.style.cursor = typeof hoverStyle === 'string' ? hoverStyle : hoverStyle()
      }
      return () => {
        _element.style.cursor = typeof unhoverStyle === 'string' ? unhoverStyle : unhoverStyle()
      }
    })
  }
}
