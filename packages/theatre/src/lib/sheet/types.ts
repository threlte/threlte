import type { ISheet } from '@theatre/core'

import type { SequenceContext } from '../Sequence/types'

export interface SheetContext {
	sheet: ISheet
	sequences: { [key: string]: SequenceContext }
}
