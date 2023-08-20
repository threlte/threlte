import { resolvePropertyPath } from './resolvePropertyPath'
import { describe, it, expect } from 'vitest'

describe('resolvePropertyPath', () => {
  it('resolves a simple property path', () => {
    const target = {
      foo: 'bar'
    }
    const { target: resolvedTarget, key } = resolvePropertyPath(target, 'foo')
    expect(resolvedTarget).toBe(target)
    expect(key).toBe('foo')
  })

  it('resolves a pierced property path', () => {
    const target = {
      foo: {
        bar: 'baz'
      }
    }
    const { target: resolvedTarget, key } = resolvePropertyPath(target, 'foo.bar')
    expect(resolvedTarget).toBe(target.foo)
    expect(key).toBe('bar')
  })

  it('resolves a pierced property path with a nested object', () => {
    const target = {
      foo: {
        bar: {
          baz: 'qux'
        }
      }
    }
    const { target: resolvedTarget, key } = resolvePropertyPath(target, 'foo.bar.baz')
    expect(resolvedTarget).toBe(target.foo.bar)
    expect(key).toBe('baz')
  })
})
