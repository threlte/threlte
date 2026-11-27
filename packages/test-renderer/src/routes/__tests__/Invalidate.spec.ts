import { describe, expect, it } from 'vitest'

import { render } from '../../lib'
import Subject from '../Invalidate.svelte'

describe('<Invalidate>', () => {
  it('does not invalidate on a frozen useTask', () => {
    const { advance } = render(Subject, {
      props: {
        autoStart: false,
        autoInvalidate: false,
      },
    })

    const { frameInvalidated } = advance()
    expect(frameInvalidated).toBe(false)
  })

  it('invalidates on a running useTask', async () => {
    const { advance } = render(Subject, {
      props: {
        autoStart: true,
        autoInvalidate: true,
      },
    })

    const { frameInvalidated } = advance()
    expect(frameInvalidated).toBe(true)
  })

  it('does not invalidate when autoInvalidate is false on a running useTask', () => {
    const { advance } = render(Subject, {
      props: {
        autoInvalidate: false,
        autoStart: true,
      },
    })

    const { frameInvalidated } = advance()
    expect(frameInvalidated).toBe(false)
  })

  it('invalidates on an invalidate() call', async () => {
    const { advance, rerender } = render(Subject, {
      props: {
        autoInvalidate: false,
        autoStart: false,
      },
    })

    const first = advance()
    expect(first.frameInvalidated).toBe(false)

    await rerender({ prop1: 10 })

    const second = advance()
    expect(second.frameInvalidated).toBe(true)
  })
})
