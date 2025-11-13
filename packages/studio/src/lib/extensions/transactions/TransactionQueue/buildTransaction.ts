import { resolvePropertyPath } from '@threlte/core'
import type { Transaction } from './TransactionQueue.svelte.js'
import { getThrelteStudioUserData } from '../../../internal/getThrelteStudioUserData.js'

type BuildTransactionOptions<T> = {
  object: any
  /** The path to a property, e.g. 'position' or 'position.x' */
  propertyPath: string
  /** Must be immutable */
  value: T
  /** If no historicValue is provided and a history record is requested, the historic value is read automatically at call time */
  historicValue?: T
  /** Whether a historic entry should be recorded, `true` by default */
  createHistoryRecord?: boolean
  /** Whether the value should be synced, `true` by default */
  sync?: boolean
}

export const buildTransaction = <T>({
  object,
  propertyPath,
  value,
  historicValue,
  createHistoryRecord,
  sync
}: BuildTransactionOptions<T>) => {
  const { target, key } = resolvePropertyPath(object, propertyPath)

  const userData = getThrelteStudioUserData(object)

  const transaction: Transaction<any, any> = {
    object,
    value,
    write(_, data) {
      if (
        typeof data === 'object' &&
        data !== null &&
        'copy' in data &&
        typeof data.copy === 'function' &&
        typeof target[key] === 'object' &&
        target[key] !== null &&
        'copy' in target[key] &&
        typeof target[key].copy === 'function'
      ) {
        target[key].copy(data)
        return
      }
      target[key] = data
    },
    ...(historicValue !== undefined
      ? {
          historicValue
        }
      : {
          read() {
            if (
              typeof target[key] === 'object' &&
              target[key] !== null &&
              'clone' in target[key] &&
              typeof target[key].clone === 'function'
            ) {
              return target[key].clone()
            }
            return target[key]
          }
        }),
    createHistoryRecord: createHistoryRecord ?? true,
    sync:
      (sync ?? true) && userData
        ? {
            attributeName: [...(userData.pathItems ?? []), propertyPath].join('.'),
            componentIndex: userData.index,
            moduleId: userData.moduleId
          }
        : undefined
  }

  return transaction
}
