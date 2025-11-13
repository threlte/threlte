/* eslint-disable max-classes-per-file */

import type { Color, Euler, Vector3 } from 'three'
import { clientRpc } from '../../../rpc/clientRpc.js'

export type SyncRequest = {
  /** The name of the component attribute, e.g. `"position"` or `"position.x"` */
  attributeName: string
  /** The value of the component attribute derived by the value of the transaction */
  attributeValue: any
  /** The index of the component */
  componentIndex: number
  /** The module id of the component */
  moduleId: string
  /** The decimal precision of floats, defaults to 4 */
  precision?: number
}

const parser: Record<string, (value: any) => any> = {
  isVector3: (value: Vector3) => [value.x, value.y, value.z],
  isEuler: (value: Euler) => [value.x, value.y, value.z],
  isColor: (value: Color) => `#${value.getHexString()}`
}

export type Transaction<T, U> = {
  /** The object to modify */
  object: T
  /** The value of the transaction */
  value: U
  /** Read from the object into a serializable format */

  /** Write a value on the object from the format resolved by the read property */
  write: (root: T, data: U) => void
  /** Whether a historic entry should be recorded, `true` by default */
  createHistoryRecord?: boolean
  /** The sync configuration. If undefined, the change will not be persisted to disk */
  sync?: Omit<SyncRequest, 'attributeValue'>
} & (
  | {
      read: (root: T) => U
    }
  | {
      historicValue: U
    }
)

export type TransactionQueueCommitArgs = Transaction<any, any>[]

type TransactionQueueItem = Transaction<any, any> & {
  historicValue: any
}

/**
 * The TransactionQueue class is a queue of transactions that can be undone and
 * redone. A transaction is a change to a value that can be undone and redone.
 * The root of a transaction as well as the data is completely arbitrary.
 *
 * ### Committing a transaction
 *
 * To commit a transaction, you must provide the root object, the data to write,
 * a function to read the data from the root object, and a function to write the
 * data to the root object.
 *
 * @example
 * Single object in single commit
 * ```ts
 * const obj = {
 *   foo: {
 * 		 bar: 'baz',
 * 	 },
 * }
 *
 * const transactionQueue = new TransactionQueue()
 * transactionQueue.commit(
 *   obj,
 *   'quo',
 *   (obj) => obj.foo.bar,
 *   (obj, value) => (obj.foo.bar = value),
 * )
 *
 * expect(obj.foo.bar).toBe('quo')
 * ```
 *
 * @example
 * Multiple objects in single commit
 * ```ts
 * const arr = [{ foo: 'bar' }, { foo: 'baz' }]
 *
 * const transactionQueue = new TransactionQueue()
 * transactionQueue.commit(
 *   arr,
 *   arr.map(() => 'qux'),
 *   (arr) => arr.map((obj) => obj.foo),
 *   (arr, data) => arr.forEach((obj, i) => (obj.foo = data[i])),
 * )
 *
 * expect(arr[0].foo).toBe('qux')
 * expect(arr[1].foo).toBe('qux')
 * ```
 */
export class TransactionQueue {
  /** Queue of transactions that have been commited and can be undone */
  private commitedQueue: TransactionQueueItem[][] = $state([])
  /** Queue of transactions that have been undone and can be redone */
  private undoneQueue: TransactionQueueItem[][] = $state([])

  public syncQueue: SyncRequest[] = $state([])

  private syncTimeout: ReturnType<typeof setTimeout> | undefined

  // Callbacks
  private onCommitCallbacks = new Set<(transactions: Transaction<any, any>[]) => void>()
  public onCommit(callback: (transactions: Transaction<any, any>[]) => void) {
    this.onCommitCallbacks.add(callback)
    return () => {
      this.onCommitCallbacks.delete(callback)
    }
  }

  private onUndoCallbacks = new Set<(transactions: Transaction<any, any>[]) => void>()
  public onUndo(callback: (transactions: Transaction<any, any>[]) => void) {
    this.onUndoCallbacks.add(callback)
    return () => {
      this.onUndoCallbacks.delete(callback)
    }
  }

  private onRedoCallbacks = new Set<(transactions: Transaction<any, any>[]) => void>()
  public onRedo(callback: (transactions: Transaction<any, any>[]) => void) {
    this.onRedoCallbacks.add(callback)
    return () => {
      this.onRedoCallbacks.delete(callback)
    }
  }

  // Fires for every transaction
  private onTransactionCallbacks = new Set<(transactions: Transaction<any, any>[]) => void>()
  public onTransaction(callback: (transactions: Transaction<any, any>[]) => void) {
    this.onTransactionCallbacks.add(callback)
    return () => {
      this.onTransactionCallbacks.delete(callback)
    }
  }

  commit(transactions: TransactionQueueCommitArgs) {
    const queueItems: TransactionQueueItem[] = []

    transactions.forEach((transaction) => {
      if (transaction.createHistoryRecord ?? true) {
        const historicValue =
          'historicValue' in transaction
            ? transaction.historicValue
            : transaction.read(transaction.object)
        queueItems.push({
          ...transaction,
          historicValue
        })
      }
      transaction.write(transaction.object, transaction.value)
    })

    if (queueItems.length > 0) this.commitedQueue.push(queueItems)
    this.undoneQueue = []
    this.onCommitCallbacks.forEach((callback) => {
      callback(transactions)
    })
    this.onTransactionCallbacks.forEach((callback) => {
      callback(transactions)
    })

    transactions
      .filter((t) => (t.createHistoryRecord ?? true) && t.sync)
      .forEach((transaction) => {
        if (transaction.sync) {
          this.addSyncRequest({
            ...transaction.sync,
            attributeValue: transaction.value
          })
        }
      })
  }

  public get canUndo() {
    return this.commitedQueue.length > 0
  }

  undo() {
    const transactions = this.commitedQueue.pop()
    if (!transactions) return

    transactions.forEach((transaction) => {
      transaction.write(transaction.object, transaction.historicValue)
    })

    this.undoneQueue.push(transactions)

    this.onUndoCallbacks.forEach((callback) => {
      callback(transactions)
    })
    this.onTransactionCallbacks.forEach((callback) => {
      callback(transactions)
    })

    transactions.forEach((transaction) => {
      if (transaction.sync) {
        this.addSyncRequest({
          ...transaction.sync,
          attributeValue: transaction.historicValue
        })
      }
    })
  }

  public get canRedo() {
    return this.undoneQueue.length > 0
  }

  redo() {
    const transactions = this.undoneQueue.pop()

    if (!transactions) return

    transactions.forEach((transaction) => {
      transaction.write(transaction.object, transaction.value)
    })

    this.commitedQueue.push(transactions)

    this.onRedoCallbacks.forEach((callback) => {
      callback(transactions)
    })
    this.onTransactionCallbacks.forEach((callback) => {
      callback(transactions)
    })

    transactions.forEach((transaction) => {
      if (transaction.sync) {
        this.addSyncRequest({
          ...transaction.sync,
          attributeValue: transaction.value
        })
      }
    })
  }

  addSyncRequest(request: SyncRequest) {
    // transform the value based on the parser type
    let value = request.attributeValue
    Object.entries(parser).forEach(([key, parse]) => {
      if (typeof value === 'object' && value !== null && key in value) {
        value = parse(value)
      }
    })
    this.syncQueue.push({
      ...request,
      attributeValue: value
    })
  }

  sync() {
    if (this.syncTimeout) clearTimeout(this.syncTimeout)
    this.syncTimeout = setTimeout(() => this.doSync(), 300)
  }

  private async doSync() {
    while (this.syncQueue.length > 0) {
      await clientRpc?.syncTransactions(this.syncQueue)
      this.syncQueue = []
    }
  }
}
