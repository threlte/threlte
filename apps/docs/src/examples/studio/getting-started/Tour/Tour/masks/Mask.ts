/**
 * A tour stop may have a mask that highlights a specific area of the screen.
 * The mask can be used to block pointer events and darken the background.
 */
export interface Mask {
  initialize?(): void

  update?(): void

  /**
   * If no spotlight is provided, the mask will block pointer events and darken
   * the background but will not draw a spotlight.
   */
  spotlight?: {
    visible?: boolean
    shape: 'circle' | 'rectangle'
    padding: number
    left: number
    top: number
    width: number
    height: number
  }

  darkenBackground: boolean

  /**
   * If true, pointer events will be blocked completely.
   * If 'mask', pointer events will be blocked only outside the mask.
   * If false, pointer events will not be blocked.
   */
  blockPointer: 'mask' | boolean
}
