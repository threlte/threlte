import { describe, expect, test } from 'vitest'
import { TransactionQueue } from '../../../TransactionQueue.svelte'

describe('Transaction System', () => {
  test('commit', () => {
    const obj = {
      foo: {
        bar: 'baz',
      },
    }

    const transactionQueue = new TransactionQueue()
    transactionQueue.commit(
      obj,
      'quo',
      (obj) => obj.foo.bar,
      (obj, value) => (obj.foo.bar = value),
    )

    expect(obj.foo.bar).toBe('quo')
  })

  test('undo', () => {
    const obj = {
      foo: 'bar',
    }

    const transactionQueue = new TransactionQueue()
    transactionQueue.commit(
      obj,
      'baz',
      (obj) => obj.foo,
      (obj, value) => (obj.foo = value),
    )
    transactionQueue.undo()

    expect(obj.foo).toBe('bar')
  })

  test('undo multiple items', () => {
    const obj = {
      foo: 'bar',
    }

    const transactionQueue = new TransactionQueue()
    transactionQueue.commit(
      obj,
      'baz',
      (obj) => obj.foo,
      (obj, value) => (obj.foo = value),
    )
    transactionQueue.commit(
      obj,
      'quo',
      (obj) => obj.foo,
      (obj, value) => (obj.foo = value),
    )
    transactionQueue.commit(
      obj,
      'qux',
      (obj) => obj.foo,
      (obj, value) => (obj.foo = value),
    )
    transactionQueue.undo()
    transactionQueue.undo()

    expect(obj.foo).toBe('baz')
  })

  test('undo and redo multiple items', () => {
    const obj = {
      foo: 'bar',
    }

    const transactionQueue = new TransactionQueue()
    transactionQueue.commit(
      obj,
      'baz',
      (obj) => obj.foo,
      (obj, value) => (obj.foo = value),
    )
    transactionQueue.commit(
      obj,
      'quo',
      (obj) => obj.foo,
      (obj, value) => (obj.foo = value),
    )
    transactionQueue.commit(
      obj,
      'qux',
      (obj) => obj.foo,
      (obj, value) => (obj.foo = value),
    )
    transactionQueue.undo()
    transactionQueue.undo()
    transactionQueue.undo()
    transactionQueue.redo()
    transactionQueue.redo()

    expect(obj.foo).toBe('quo')
  })

  test('redo', () => {
    const obj = {
      foo: 'bar',
    }

    const transactionQueue = new TransactionQueue()
    transactionQueue.commit(
      obj,
      'baz',
      (obj) => obj.foo,
      (obj, value) => (obj.foo = value),
    )
    transactionQueue.undo()
    transactionQueue.redo()

    expect(obj.foo).toBe('baz')
  })

  test('no redo after commit', () => {
    const obj = {
      foo: 'bar',
    }
    const transactionQueue = new TransactionQueue()
    transactionQueue.commit(
      obj,
      'baz',
      (obj) => obj.foo,
      (obj, value) => (obj.foo = value),
    )
    expect(obj.foo).toBe('baz')

    transactionQueue.undo()
    expect(obj.foo).toBe('bar')

    transactionQueue.commit(
      obj,
      'quo',
      (obj) => obj.foo,
      (obj, value) => (obj.foo = value),
    )
    expect(obj.foo).toBe('quo')

    transactionQueue.redo()
    expect(obj.foo).toBe('quo')
  })
})
