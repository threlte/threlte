import type { Mask } from '../Mask'

/**
 * Mask for a tour stop that does not highlight anything. It can however block
 * pointer events or darken the background.
 */
export class MaskNone implements Mask {
  constructor(
    public readonly blockPointer = true,
    public readonly darkenBackground = false
  ) {}
}
