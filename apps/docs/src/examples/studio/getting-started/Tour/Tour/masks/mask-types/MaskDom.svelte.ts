import type { Mask } from '../Mask'

/**
 * Mask for a tour stop that highlights a DOM element. The mask tracks the
 * position and size of the element.
 */
export class MaskDom implements Mask {
  private element: Element | undefined
  private rect: DOMRect | undefined

  constructor(
    private readonly selector: string | (() => Element),
    public readonly shape: 'circle' | 'rectangle' = 'circle',
    public readonly padding = 0,
    public readonly blockPointer = true,
    public readonly darkenBackground = true
  ) {}

  public initialize() {
    const ref =
      typeof this.selector === 'string' ? document.querySelector(this.selector) : this.selector()
    if (!ref) throw new Error(`Element not found: ${this.selector}`)
    this.element = ref
    this.update()
  }

  update() {
    if (!this.element) return
    this.rect = this.element.getBoundingClientRect()
  }

  get spotlight() {
    return {
      left: this.rect!.left,
      top: this.rect!.top,
      width: this.rect!.width,
      height: this.rect!.height,
      padding: this.padding,
      shape: this.shape
    }
  }
}
