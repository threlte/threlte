import { getContext } from 'svelte'

import type { SheetContext } from '../sheet/types'
import type { Sequence } from './sequence'

export function useSequence(key = 'default') {
	const sequence = getContext<Sequence>(`theatre-sequence-[${key}]`)
		?? getContext<SheetContext>('theatre-sheet').sequences[key]
	return sequence.api()
}