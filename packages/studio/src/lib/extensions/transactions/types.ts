import type { Object3D } from 'three'
import type {
  TransactionQueue,
  TransactionQueueCommitArgs
} from './TransactionQueue/TransactionQueue.svelte.js'

export const transactionsScope = 'transactions'

export type TransactionsState = {
  enabled: boolean
  mode: 'auto' | 'manual'
  precision: number
  queue: TransactionQueue
}

export type TransactionsActions = {
  toggleEnabled: () => void
  setEnabled: (enabled: boolean) => void
  setPrecision: (precision: number) => void
  setMode: (mode: TransactionsState['mode']) => void
  commit: (transactions: TransactionQueueCommitArgs) => void
  undo: () => void
  redo: () => void
  sync: () => void
  openInEditor: (object: Object3D) => void
  openSelectedInEditor: () => void
}
