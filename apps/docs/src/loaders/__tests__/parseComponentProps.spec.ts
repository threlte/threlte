import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import { parseDestructuring, parseJsDoc, parsePackageComponents } from '../parseComponentProps'

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

  it('keeps splitting after an arrow function default', () => {
    const parsed = parseDestructuring(
      'let { filter = (x) => true, size = 1, b = $bindable(2) }: P = $props()'
    )
    expect(parsed?.defaults.get('filter')).toBe('(x) => true')
    expect(parsed?.defaults.get('size')).toBe('1')
    expect(parsed?.bindable.has('b')).toBe(true)
  })

  it('drops comments but keeps // inside strings', () => {
    const parsed = parseDestructuring(
      'let {\n  a = 1 /* c */,\n  // note\n  url = "http://x.com",\n  b = 2\n}: P = $props()'
    )
    expect(parsed?.defaults.get('a')).toBe('1')
    expect(parsed?.defaults.get('url')).toBe('"http://x.com"')
    expect(parsed?.defaults.get('b')).toBe('2')
  })

  it('treats comparisons as operators, not brackets', () => {
    const parsed = parseDestructuring(
      'let { enabled = count >= 1, small = size < 2, size = 2, b = $bindable<number>(3) }: P = $props()'
    )
    expect(parsed?.defaults.get('enabled')).toBe('count >= 1')
    expect(parsed?.defaults.get('small')).toBe('size < 2')
    expect(parsed?.defaults.get('size')).toBe('2')
    expect(parsed?.bindable.has('b')).toBe(true)
  })

  it('treats an unspaced comparison as an operator', () => {
    const parsed = parseDestructuring(
      'let { small = size<2, b = 3, c = $bindable() }: P = $props()'
    )
    expect(parsed?.defaults.get('small')).toBe('size<2')
    expect(parsed?.defaults.get('b')).toBe('3')
    expect(parsed?.bindable.has('c')).toBe(true)
  })

  it('reads regex literals as values', () => {
    const parsed = parseDestructuring(
      "let { quote = /'/, url = /https?:\\/\\//g, b = 3 }: P = $props()"
    )
    expect(parsed?.defaults.get('quote')).toBe("/'/")
    expect(parsed?.defaults.get('url')).toBe('/https?:\\/\\//g')
    expect(parsed?.defaults.get('b')).toBe('3')
  })

  it('keeps spaces next to brackets in default values', () => {
    const parsed = parseDestructuring("let { label = ' ( ', x = 1 }: P = $props()")
    expect(parsed?.defaults.get('label')).toBe("' ( '")
  })

  it('recognizes $bindable with nested generic or function type arguments', () => {
    const parsed = parseDestructuring(
      'let { m = $bindable<Map<string, number>>(), f = $bindable<() => void>(), b = 1 }: P = $props()'
    )
    expect(parsed?.bindable.has('m')).toBe(true)
    expect(parsed?.bindable.has('f')).toBe(true)
    expect(parsed?.defaults.get('m')).toBeUndefined()
    expect(parsed?.defaults.get('b')).toBe('1')
  })

  it('does not mistake an arrow or a > in a string for a closing generic', () => {
    const arrow = parseDestructuring(
      'let { x = a<b ? (c) => d : e, y = 1, z = $bindable() }: P = $props()'
    )
    expect(arrow?.defaults.get('y')).toBe('1')
    expect(arrow?.bindable.has('z')).toBe(true)
    const quoted = parseDestructuring("let { x = a<b ? '>' : c, y = 1 }: P = $props()")
    expect(quoted?.defaults.get('y')).toBe('1')
  })

  it('reads a regex after an arrow, and division after a postfix operator', () => {
    const regex = parseDestructuring("let { f = (s) => /'/.test(s), y = 1 }: P = $props()")
    expect(regex?.defaults.get('f')).toBe("(s) => /'/.test(s)")
    expect(regex?.defaults.get('y')).toBe('1')
    const division = parseDestructuring('let { x = i++ / 2, y = 3 / 4 }: P = $props()')
    expect(division?.defaults.get('x')).toBe('i++ / 2')
    expect(division?.defaults.get('y')).toBe('3 / 4')
  })
})

describe('parseJsDoc', () => {
  it('only starts a tag at the beginning of a line', () => {
    const parsed = parseJsDoc(
      '/**\n * Works with @threlte/extras and user@example.com.\n * @default 1\n */'
    )
    expect(parsed.description).toBe('Works with @threlte/extras and user@example.com.')
    expect(parsed.tags.get('default')).toBe('1')
  })

  it('keeps a wrapped line that starts with a package name in the description', () => {
    const parsed = parseJsDoc('/**\n * Built-in\n * @threlte/extras controls.\n */')
    expect(parsed.description).toBe('Built-in @threlte/extras controls.')
    expect(parsed.tags.size).toBe(0)
  })

  it('reads multi-line tags and single-line comments', () => {
    expect(
      parseJsDoc('/**\n * Text.\n * @default the last\n * frame\n */').tags.get('default')
    ).toBe('the last frame')
    expect(parseJsDoc('/** @deprecated Use `size`. */').tags.get('deprecated')).toBe('Use `size`.')
  })

  it('renders inline links as their label or code', () => {
    expect(parseJsDoc('/** See {@link Foo} and {@link Bar the bar}. */').description).toBe(
      'See `Foo` and the bar.'
    )
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

  it('leaves out deprecated props and children', () => {
    expect(prop('scale')).toBeUndefined()
    expect(prop('children')).toBeUndefined()
  })

  it('parses defaults after an arrow function and a URL', () => {
    expect(prop('shape')?.default).toBe('(progress) => progress * 2')
    expect(prop('url')?.default).toBe("'https://example.com/thing.json'")
  })

  it('merges union variants into optional props without repeating sentences', () => {
    expect(prop('kind')).toMatchObject({
      type: "'box' | 'sphere'",
      required: false,
      description: 'The kind of thing. Spheres can set `radius`.'
    })
    expect(prop('radius')).toMatchObject({ required: false, description: 'Only used by spheres.' })
  })

  it('keeps an @ in the middle of a description', () => {
    expect(prop('controls')?.description).toBe(
      'Any object with an `enabled` property works. Built-in @threlte/extras controls are handled automatically.'
    )
    expect(prop('wrapped')?.description).toBe('Built-in @threlte/extras components are handled.')
  })

  it('prints object types without their comments', () => {
    expect(prop('options')?.type).toBe("{ gap: number; align: 'start' | 'end'; }")
  })

  it('fills in type parameters of inherited generic types', () => {
    expect(prop('item')?.type).toBe('number | null')
  })

  it('leaves out props typed never', () => {
    expect(prop('material')).toBeUndefined()
  })

  it('lists callback props as events with their payload', () => {
    expect(thing.events).toEqual([
      {
        name: 'onchange',
        payload: '{ size: number; }',
        description: 'Called when the thing changes.'
      },
      {
        name: 'onpick',
        payload: '(index: number, label: string)',
        description: 'Called when an item is picked.'
      },
      { name: 'onclear', payload: 'void', description: 'Called when the thing is cleared.' },
      {
        name: 'onselect',
        payload: 'string | null',
        description: 'Called with the selection, or `null` when nothing is selected.'
      },
      {
        name: 'onadd',
        payload: '(...items: string[])',
        description: 'Called with every added item.'
      },
      {
        name: 'onhover',
        payload: 'number',
        description: 'Called while hovering, when `distance > 0`.'
      },
      {
        name: 'onmove',
        payload: '{ x: number; } & { type: string; }',
        description: 'Called while moving.'
      }
    ])
  })

  it('keeps on* props that are not only callbacks as props', () => {
    expect(prop('onresize')).toMatchObject({ type: 'boolean | (() => void)' })
    expect(thing.events.find((event) => event.name === 'onresize')).toBeUndefined()
  })

  it('lists $bindable props, including ref, as bindings', () => {
    expect(thing.bindings).toEqual([
      { name: 'value', type: 'number', description: 'A bound output.' },
      { name: 'ref', type: 'HTMLButtonElement', description: 'The underlying element.' }
    ])
    expect(prop('value')).toBeUndefined()
    expect(prop('ref')).toBeUndefined()
  })
})
