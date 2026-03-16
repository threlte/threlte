import { describe, expect, test } from 'vitest'
import {
  addStudioRuntimeProps,
  findNodeByIndex,
  readAttribute,
  removeAttribute,
  upsertAttribute
} from '../componentParser.js'
import { disassembleComponent } from '../componentUtils.js'
import { recreateMagicString } from '../magicStringUtils.js'
import {
  buildTestComponent,
  expectedInsertPropsMarkup,
  expectedUpdatePropsMarkup,
  insertPropsMarkup,
  markup,
  markupWithProps,
  markupWithRemovedProps,
  markupWithStudioProps,
  markupWithUpdatedProps,
  script,
  scriptModule,
  style,
  updatePropsMarkup
} from './testComponent.js'

describe('sync utilities', () => {
  test('disassemble and reassemble component', async () => {
    const input = buildTestComponent({
      scriptModule,
      script,
      markup,
      style
    })

    const { markup: m, reassemble } = await disassembleComponent(input)
    expect(m).toContain('<script lang="ts" context="module">/* DUMMY SCRIPT */</script>')
    expect(m).toContain('<script lang="ts">/* DUMMY SCRIPT */</script>')
    expect(m).toContain('<style>/* DUMMY STYLE */</style>')

    const assembledComponent = await reassemble(m)
    expect(assembledComponent).toEqual(input)
  })

  test('find node by index', () => {
    const input = buildTestComponent({
      markup,
      as: 'magic-string'
    })

    // mesh
    const meshNode = findNodeByIndex(input, 0)
    expect(meshNode).toBeDefined()
    expect(meshNode?.name).toEqual('T.Mesh')

    // geometry
    const geometryNode = findNodeByIndex(input, 1)
    expect(geometryNode).toBeDefined()
    expect(geometryNode?.name).toEqual('T.BoxGeometry')

    // material
    const materialNode = findNodeByIndex(input, 2)
    expect(materialNode).toBeDefined()
    expect(materialNode?.name).toEqual('T')

    // undefined
    const undefinedNode = findNodeByIndex(input, 4)
    expect(undefinedNode).toBeUndefined()
  })

  test('insert attributes', () => {
    const input = buildTestComponent({
      markup,
      as: 'magic-string'
    })

    const expectedMarkup = buildTestComponent({
      markup: markupWithProps
    })

    const meshNode = findNodeByIndex(input, 0)
    expect(meshNode).toBeDefined()
    expect(meshNode?.name).toEqual('T.Mesh')

    const materialNode = findNodeByIndex(input, 2)
    expect(materialNode).toBeDefined()
    expect(materialNode?.name).toEqual('T')

    const material2Node = findNodeByIndex(input, 3)
    expect(material2Node).toBeDefined()
    expect(material2Node?.name).toEqual('T.MeshBasicMaterial')

    upsertAttribute(input, meshNode!, 'visible', false, 'last')
    upsertAttribute(input, meshNode!, 'renderOrder', 1, 'last')
    upsertAttribute(input, materialNode!, 'metalness', 1, 'last')
    upsertAttribute(input, materialNode!, 'roughness', 0, 'last')
    upsertAttribute(input, material2Node!, 'color', 'black', 'last')

    expect(input.toString()).toEqual(expectedMarkup)
  })

  test('update attribute', () => {
    const input = buildTestComponent({
      markup,
      as: 'magic-string'
    })

    const expectedMarkup = buildTestComponent({
      markup: markupWithUpdatedProps
    })

    const meshNode = findNodeByIndex(input, 0)
    expect(meshNode).toBeDefined()
    expect(meshNode?.name).toEqual('T.Mesh')

    upsertAttribute(input, meshNode!, 'position', [1, 1, 1], 'last')

    expect(input.toString()).toEqual(expectedMarkup)
  })

  test('remove attribute', () => {
    const input = buildTestComponent({
      markup,
      as: 'magic-string'
    })

    const expectedMarkup = buildTestComponent({
      markup: markupWithRemovedProps
    })

    const meshNode = findNodeByIndex(input, 0)
    if (!meshNode) throw new Error('Mesh node not found')
    removeAttribute(input, meshNode, 'position')

    expect(input.toString()).toEqual(expectedMarkup)
  })

  test('read attribute value', () => {
    const input = buildTestComponent({
      markup,
      as: 'magic-string'
    })

    const meshNode = findNodeByIndex(input, 0)

    if (!meshNode) throw new Error('Mesh node not found')

    const value = readAttribute(input, meshNode, 'position')

    expect(value).toStrictEqual([0, 1, 0])
  })

  test('add studio runtime props', () => {
    const input = buildTestComponent({
      markup,
      as: 'magic-string'
    })

    const expectedMarkup = buildTestComponent({
      markup: markupWithStudioProps
    })

    addStudioRuntimeProps(input, 'Test.svelte')

    expect(input.toString()).toEqual(expectedMarkup)
  })

  test('update attributes', () => {
    const input = buildTestComponent({
      markup: updatePropsMarkup,
      as: 'magic-string'
    })

    const meshNode = findNodeByIndex(input, 0)

    const v1 = true
    upsertAttribute(input, meshNode!, 'mustache1', v1, 'last')
    expect(
      readAttribute(
        recreateMagicString(input),
        findNodeByIndex(recreateMagicString(input), 0)!,
        'mustache1'
      )
    ).toStrictEqual(v1)

    const v2 = 'string'
    upsertAttribute(input, meshNode!, 'mustache2', v2, 'last')
    expect(
      readAttribute(
        recreateMagicString(input),
        findNodeByIndex(recreateMagicString(input), 0)!,
        'mustache2'
      )
    ).toStrictEqual(v2)

    const v3 = ['mustache value']
    upsertAttribute(input, meshNode!, 'mustache3', v3, 'last')
    expect(
      readAttribute(
        recreateMagicString(input),
        findNodeByIndex(recreateMagicString(input), 0)!,
        'mustache3'
      )
    ).toStrictEqual(v3)

    const v4 = true
    upsertAttribute(input, meshNode!, 'bool1', v4, 'last')
    expect(
      readAttribute(
        recreateMagicString(input),
        findNodeByIndex(recreateMagicString(input), 0)!,
        'bool1'
      )
    ).toStrictEqual(v4)

    const v5 = false
    upsertAttribute(input, meshNode!, 'bool2', v5, 'last')
    expect(
      readAttribute(
        recreateMagicString(input),
        findNodeByIndex(recreateMagicString(input), 0)!,
        'bool2'
      )
    ).toStrictEqual(v5)

    const v6 = 'string in bool prop'
    upsertAttribute(input, meshNode!, 'bool3', v6, 'last')
    expect(
      readAttribute(
        recreateMagicString(input),
        findNodeByIndex(recreateMagicString(input), 0)!,
        'bool3'
      )
    ).toStrictEqual(v6)

    const v7 = ['mustache value in bool prop']
    upsertAttribute(input, meshNode!, 'bool4', v7, 'last')
    expect(
      readAttribute(
        recreateMagicString(input),
        findNodeByIndex(recreateMagicString(input), 0)!,
        'bool4'
      )
    ).toStrictEqual(v7)

    const v8 = true
    upsertAttribute(input, meshNode!, 'string1', v8, 'last')
    expect(
      readAttribute(
        recreateMagicString(input),
        findNodeByIndex(recreateMagicString(input), 0)!,
        'string1'
      )
    ).toStrictEqual(v8)

    const v9 = 'string2'
    upsertAttribute(input, meshNode!, 'string2', v9, 'last')
    expect(
      readAttribute(
        recreateMagicString(input),
        findNodeByIndex(recreateMagicString(input), 0)!,
        'string2'
      )
    ).toStrictEqual(v9)

    const v10 = ['mustache value in string prop']
    upsertAttribute(input, meshNode!, 'string3', v10, 'last')
    expect(
      readAttribute(
        recreateMagicString(input),
        findNodeByIndex(recreateMagicString(input), 0)!,
        'string3'
      )
    ).toStrictEqual(v10)

    const v11 = true
    upsertAttribute(input, meshNode!, 'shorthand1', v11, 'last')
    expect(
      readAttribute(
        recreateMagicString(input),
        findNodeByIndex(recreateMagicString(input), 0)!,
        'shorthand1'
      )
    ).toStrictEqual(v11)

    const v12 = 'string in shorthand prop'
    upsertAttribute(input, meshNode!, 'shorthand2', v12, 'last')
    expect(
      readAttribute(
        recreateMagicString(input),
        findNodeByIndex(recreateMagicString(input), 0)!,
        'shorthand2'
      )
    ).toStrictEqual(v12)

    const v13 = ['mustache value in shorthand prop']
    upsertAttribute(input, meshNode!, 'shorthand3', v13, 'last')
    expect(
      readAttribute(
        recreateMagicString(input),
        findNodeByIndex(recreateMagicString(input), 0)!,
        'shorthand3'
      )
    ).toStrictEqual(v13)

    expect(input.toString()).toEqual(expectedUpdatePropsMarkup)
  })

  test('insert props', () => {
    const input = buildTestComponent({
      markup: insertPropsMarkup,
      as: 'magic-string'
    })

    const meshNode = findNodeByIndex(input, 0)
    const geometryNode = findNodeByIndex(input, 1)
    const materialNode = findNodeByIndex(input, 2)

    // insert props
    upsertAttribute(input, meshNode!, 'insert1', 1, 'last')
    upsertAttribute(input, meshNode!, 'insert2', true, 'last')
    upsertAttribute(input, meshNode!, 'insert3', 'test', 'last')
    upsertAttribute(input, geometryNode!, 'insert4', 4, 'last')
    upsertAttribute(input, materialNode!, 'insert5', 5, 'last')

    expect(input.toString()).toEqual(expectedInsertPropsMarkup)
  })
})
