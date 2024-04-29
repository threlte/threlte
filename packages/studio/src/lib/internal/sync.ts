import { get } from 'svelte/store'
import { getInternalContext } from './context'

export const useSync = () => {
  const { sync } = getInternalContext()

  const writeToDisk = () => {
    const currentTransactions = get(sync.transactions)
    if (currentTransactions.length === 0) return

    const transactionIds = new Set(currentTransactions.map((t) => t.id))
    // move the transactions to staleTransactions
    sync.staleTransactions.update((s) => {
      currentTransactions.forEach((tr) => {
        s.push(tr)
      })
      return s
    })

    const id = Math.random().toString(36).slice(2, 9)

    const onServerMessage = (d: unknown) => {
      const data = d as {
        success: boolean
      }
      if (data.success) {
        // remove stale transactions
        sync.staleTransactions.update((s) => {
          return s.filter((t) => !transactionIds.has(t.id))
        })
      }
      import.meta.hot?.off(`threlte-inspector:from-server-${id}`, onServerMessage)
      // remove transactions
      sync.transactions.update((ts) => {
        return ts.filter((t) => !transactionIds.has(t.id))
      })
    }

    import.meta.hot?.on(`threlte-inspector:from-server-${id}`, onServerMessage)

    import.meta.hot?.send('threlte-inspector:from-client', {
      id,
      transactions: currentTransactions,
    })
  }

  return {
    writeToDisk,
  }
}
