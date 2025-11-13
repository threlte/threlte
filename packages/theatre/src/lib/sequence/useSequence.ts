import { getContext } from 'svelte'
import type { SheetContext } from '../sheet/types.js'
import type { SequenceController } from './SequenceController.js'

/**
 * ### `useSequence`
 *
 * A hook to get the current sequence controller. If a key is provided, it will
 * get the sequence controller with that key. Otherwise, it will get the
 * "nearest" default sequence controller.
 */
export const useSequence = (key = undefined): SequenceController => {
  let sequence
  if (key) {
    sequence = getContext<SheetContext>('theatre-sheet').sequences[key]
  } else {
    sequence =
      getContext<SequenceController>('theatre-sequence') ??
      getContext<SheetContext>('theatre-sheet').sequences['default']
  }
  return sequence
}
