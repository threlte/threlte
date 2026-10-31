import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import { parseDestructuring, parsePackageComponents } from '../parseComponentProps'

const fixtures = fileURLToPath(new URL('./fixtures/', import.meta.url))
const [thing] = parsePackageComponents(fixtures, `${fixtures}lib`)

const prop = (name: string) => thing.props.find((p) => p.name === name)

describe('parseDestructuring', () => {
  it('reads defaults, bindables and the annotation', () => {
    const parsed = parseDestructuring(
      `<script lang="ts">\n  let { a = 1, b = $bindable('x'), 'c-d': cd, ...rest }: Props = $props()\n</script>`
    )
    expect(parsed?.annotation).toBe('Props')
    expect(parsed?.defaults.get('a')).toBe('1')
    expect(parsed?.defaults.get('b')).toBe("'x'")
    expect(parsed?.bindable.has('b')).toBe(true)
    expect(parsed?.defaults.has('c-d')).toBe(true)
  })

  it('ignores commas nested in brackets', () => {
    const parsed = parseDestructuring(
      'let { range = [-0.1, 0.1], stage = useStage("<A>", { before: x }) }: P = $props()'
    )
    expect(parsed?.defaults.get('range')).toBe('[-0.1, 0.1]')
    expect(parsed?.defaults.get('stage')).toBe('useStage("<A>", { before: x })')
  })
})

describe('parsePackageComponents', () => {
  it('finds the component by its $props() annotation', () => {
    expect(thing.sourcePath).toBe('lib/Thing/Thing.svelte')
  })

  it('reads JSDoc descriptions and @default tags', () => {
    expect(prop('size')).toMatchObject({
      type: 'number',
      required: false,
      default: '1',
      description: 'How big the thing is.'
    })
  })

  it('falls back to the destructured default', () => {
    expect(prop('speed')?.default).toBe('0.5')
  })

  it('marks props without a question mark as required', () => {
    expect(prop('name')?.required).toBe(true)
  })

  it('includes props inherited from a base in the package', () => {
    expect(prop('shared')).toMatchObject({
      default: '2',
      description: 'Inherited from a base in the package.'
    })
  })

  it('leaves out props inherited from outside the package', () => {
    expect(prop('position')).toBeUndefined()
  })

  it('leaves out deprecated props, children and ref', () => {
    expect(prop('scale')).toBeUndefined()
    expect(prop('children')).toBeUndefined()
    expect(prop('ref')).toBeUndefined()
  })

  it('merges union variants into optional props', () => {
    expect(prop('kind')).toMatchObject({ type: "'box' | 'sphere'", required: false })
    expect(prop('radius')).toMatchObject({ required: false, description: 'Only used by spheres.' })
  })

  it('lists callback props as events with their payload', () => {
    expect(thing.events).toEqual([
      {
        name: 'onchange',
        payload: '{ size: number }',
        description: 'Called when the thing changes.'
      }
    ])
  })

  it('lists $bindable props as bindings', () => {
    expect(thing.bindings).toEqual([
      { name: 'value', type: 'number', description: 'A bound output.' }
    ])
    expect(prop('value')).toBeUndefined()
  })
})
