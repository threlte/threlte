import type { ISheet } from '@theatre/core'
import type { SequenceController } from '../sequence/SequenceController.js'

export interface SheetContext {
  sheet: ISheet
  sequences: { [key: string]: SequenceController }
}
