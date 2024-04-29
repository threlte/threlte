import type { Object3D } from 'three'
import { useStudio } from '../../internal/extensions'
import type { TransactionQueue, TransactionQueueCommitArgs } from './TransactionQueue.svelte'
import { transactionsScope, type TransactionsActions, type TransactionsState } from './types'

export const useTransactions = () => {
  const { useExtension } = useStudio()

  const ext = useExtension<TransactionsState, TransactionsActions>(transactionsScope)

  const commit = (transactions: TransactionQueueCommitArgs) => {
    ext.run('commit', transactions)
  }

  const undo = () => {
    ext.run('undo')
  }

  const redo = () => {
    ext.run('redo')
  }

  const onTransaction = (...args: Parameters<TransactionQueue['onTransaction']>) => {
    return ext.state.queue?.onTransaction(...args)
  }

  const onCommit = (...args: Parameters<TransactionQueue['onCommit']>) => {
    return ext.state.queue?.onCommit(...args)
  }

  const onUndo = (...args: Parameters<TransactionQueue['onUndo']>) => {
    return ext.state.queue?.onUndo(...args)
  }

  const onRedo = (...args: Parameters<TransactionQueue['onRedo']>) => {
    return ext.state.queue?.onRedo(...args)
  }

  const openInEditor = (object: Object3D) => {
    ext.run('openInEditor', object)
  }

  const openSelectedInEditor = () => {
    ext.run('openSelectedInEditor')
  }

  return {
    commit,
    undo,
    redo,
    onTransaction,
    onCommit,
    onUndo,
    onRedo,
    openInEditor,
    openSelectedInEditor,
  }
}
