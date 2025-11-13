import { describe, expect, test } from 'vitest'
import { TransactionQueue } from '../../../extensions/transactions/TransactionQueue/TransactionQueue.svelte.js'
import { buildTransaction } from '../../../extensions/transactions/TransactionQueue/buildTransaction.js'

describe('Transaction System', () => {
  test('commit', () => {
    const obj = {
      foo: {
        bar: 'baz'
      }
    }

    const transactionQueue = new TransactionQueue()

    const transaction = buildTransaction({
      object: obj,
      propertyPath: 'foo.bar',
      value: 'quo'
    })

    transactionQueue.commit([transaction])

    expect(obj.foo.bar).toBe('quo')
  })

  test('undo', () => {
    const obj = {
      foo: 'bar'
    }
    const transactionQueue = new TransactionQueue()
    transactionQueue.commit([
      {
        object: obj,
        read(root) {
          return root.foo
        },
        write(root, data) {
          root.foo = data
        },
        value: 'baz',
        createHistoryRecord: true
      }
    ])
    transactionQueue.undo()
    expect(obj.foo).toBe('bar')
  })

  test('undo multiple items', () => {
    const obj = {
      foo: 'bar'
    }

    const transactionQueue = new TransactionQueue()
    transactionQueue.commit([
      buildTransaction({
        object: obj,
        propertyPath: 'foo',
        value: 'baz'
      })
    ])
    transactionQueue.commit([
      buildTransaction({
        object: obj,
        propertyPath: 'foo',
        value: 'quo'
      })
    ])
    expect(obj.foo).toBe('quo')
    transactionQueue.commit([
      buildTransaction({
        object: obj,
        propertyPath: 'foo',
        value: 'qux'
      })
    ])
    expect(obj.foo).toBe('qux')
    transactionQueue.undo()
    transactionQueue.undo()
    expect(obj.foo).toBe('baz')
  })

  test('undo and redo multiple items', () => {
    const obj = {
      foo: 'bar'
    }

    const transactionQueue = new TransactionQueue()
    transactionQueue.commit([
      buildTransaction({
        object: obj,
        propertyPath: 'foo',
        value: 'baz'
      })
    ])

    transactionQueue.commit([
      buildTransaction({
        object: obj,
        propertyPath: 'foo',
        value: 'quo'
      })
    ])
    transactionQueue.commit([
      buildTransaction({
        object: obj,
        propertyPath: 'foo',
        value: 'qux'
      })
    ])
    transactionQueue.undo()
    transactionQueue.undo()
    transactionQueue.undo()
    transactionQueue.redo()
    transactionQueue.redo()

    expect(obj.foo).toBe('quo')
  })

  test('redo', () => {
    const obj = {
      foo: 'bar'
    }

    const transactionQueue = new TransactionQueue()
    transactionQueue.commit([
      buildTransaction({
        object: obj,
        propertyPath: 'foo',
        value: 'baz'
      })
    ])
    transactionQueue.undo()
    transactionQueue.redo()

    expect(obj.foo).toBe('baz')
  })

  test('no redo after commit', () => {
    const obj = {
      foo: 'bar'
    }
    const transactionQueue = new TransactionQueue()
    transactionQueue.commit([
      buildTransaction({
        object: obj,
        propertyPath: 'foo',
        value: 'baz'
      })
    ])
    expect(obj.foo).toBe('baz')

    transactionQueue.undo()
    expect(obj.foo).toBe('bar')

    transactionQueue.commit([
      buildTransaction({
        object: obj,
        propertyPath: 'foo',
        value: 'quo'
      })
    ])
    expect(obj.foo).toBe('quo')

    transactionQueue.redo()
    expect(obj.foo).toBe('quo')
  })

  test('grouped undo', () => {
    const obj = {
      foo: 'bar',
      quo: 'qux'
    }

    const transactionQueue = new TransactionQueue()
    transactionQueue.commit([
      buildTransaction({
        object: obj,
        propertyPath: 'foo',
        value: 'baz'
      }),
      buildTransaction({
        object: obj,
        propertyPath: 'quo',
        value: 'quux'
      })
    ])
    transactionQueue.undo()
    expect(obj.foo).toBe('bar')
    expect(obj.quo).toBe('qux')
  })
})
