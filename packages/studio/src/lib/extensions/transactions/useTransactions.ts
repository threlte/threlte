import { useStudio } from '../../internal/extensions'
import type { TransactionQueue } from './TransactionQueue/TransactionQueue.svelte'
import { buildTransaction } from './TransactionQueue/buildTransaction'
import { transactionsScope, type TransactionsActions, type TransactionsState } from './types'
import { vitePluginEnabled } from './vite-plugin/vitePluginEnabled'

export const useTransactions = () => {
  const { useExtension } = useStudio()

  const ext = useExtension<TransactionsState, TransactionsActions>(transactionsScope)

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

  return {
    commit: ext.commit,
    undo: ext.undo,
    redo: ext.redo,
    onTransaction,
    onCommit,
    onUndo,
    onRedo,
    openInEditor: ext.openInEditor,
    openSelectedInEditor: ext.openSelectedInEditor,
    buildTransaction,
    vitePluginEnabled
  }
}
