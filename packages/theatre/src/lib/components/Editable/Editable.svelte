<script
  lang="ts"
  context="module"
>
  const isObject3D = (value: any): value is Object3D => {
    return value && value.isObject3D
  }

  const isPrimitive = (value: any): value is Primitive => {
    return (
      value === null ||
      typeof value === 'string' ||
      typeof value === 'number' ||
      typeof value === 'boolean'
    )
  }

  const isScrubbing = writable(false)
</script>

<script lang="ts">
  import type { ISheet } from '@theatre/core'
  import type { IScrub } from '@theatre/studio'
  import { InteractiveObject, TransformControls, useParent, useThrelte } from '@threlte/core'
  import { getContext } from 'svelte'
  import { writable } from 'svelte/store'
  import type { Object3D } from 'three'
  import { Color, Euler } from 'three'
  import { DEG2RAD, RAD2DEG } from 'three/src/math/MathUtils'
  import type { Primitive } from 'type-fest'
  import { globalStudio } from '../consts'
  import { types } from '../theatre'
  import type { AllProps, AnyProp } from './props'
  import { resolve } from './resolve'

  export let key: AllProps['key']
  export let projectName: AllProps['projectName'] = 'default'
  export let sheetName: AllProps['sheetName'] = 'default'
  export let transforms: AllProps['transforms'] = false

  const parent = useParent()
  const { invalidate } = useThrelte()

  let selected = false
  let isMouseDown = false

  const memoizer = new Map<
    string,
    {
      path: string
      type: 'generic' | 'euler'
    }
  >()

  const transformsProps = $parent &&
    $parent.position &&
    $parent.rotation &&
    $parent.scale && {
      Position: { ...$parent.position },
      Rotation: {
        x: $parent.rotation.x * RAD2DEG,
        y: $parent.rotation.y * RAD2DEG,
        z: $parent.rotation.z * RAD2DEG
      },
      Scale: { ...$parent.scale }
    }

  if (transformsProps) {
    memoizer.set('Position', {
      path: 'position',
      type: 'generic'
    })
    memoizer.set('Rotation', {
      path: 'rotation',
      type: 'euler'
    })
    memoizer.set('Scale', {
      path: 'scale',
      type: 'generic'
    })
  }

  type Prop<T extends any> = {
    key: string
    prop: T
  }

  const inferPropByPath = (path: string, key?: string): Prop<any> => {
    const { key: targetKey, target } = resolve($parent, path)
    let initialValue = target[targetKey]
    let prop = initialValue
    let type: 'generic' | 'euler' = 'generic'

    // special cases treatment
    if (initialValue instanceof Color) {
      // Colors get an RGBA interface
      prop = types.rgba({
        r: initialValue.r,
        g: initialValue.g,
        b: initialValue.b,
        a: 1
      })
    } else if (initialValue instanceof Euler) {
      // Euler angles will be displayed in degrees
      prop = {
        x: initialValue.x * RAD2DEG,
        y: initialValue.y * RAD2DEG,
        z: initialValue.z * RAD2DEG
      }
      type = 'euler'
    } else if (!isPrimitive(initialValue)) {
      prop = { ...initialValue }
    }

    const propKey =
      key ??
      path
        .split('.')
        .map((k) => k.charAt(0).toUpperCase() + k.slice(1))
        .join('')

    memoizer.set(propKey, {
      path,
      type
    })

    return {
      key: propKey,
      prop
    }
  }

  const props = Object.entries($$restProps as Record<string, AnyProp>)
    .filter(Boolean)
    .map(([path, propDesc]): Prop<any> => {
      if (typeof propDesc === 'boolean') {
        return inferPropByPath(path)
      } else if (typeof propDesc === 'string') {
        return inferPropByPath(path, propDesc)
      } else {
        return {
          key: path,
          prop: propDesc
        }
      }
    })
    .reduce((acc, { prop, propKey }) => {
      ;(acc as any)[propKey] = prop
      return acc
    }, {})

  const sheet = getContext(`theatre-project-${projectName}-sheet-${sheetName}`) as ISheet
  const object = sheet.object(key, {
    ...props,
    ...transformsProps
  })
  object.onValuesChange((values) => {
    Object.entries(values).forEach((prop) => {
      if (!prop || isMouseDown) return
      const [key, value] = prop
      const { path, type } = memoizer.get(key)!
      const { key: targetKey, target } = resolve($parent, path)
      if (isPrimitive(value)) {
        target[targetKey] = value
      } else if (type === 'euler') {
        Object.entries(value as any).forEach(([k, v]) => {
          target[targetKey][k] = v * DEG2RAD
        })
      } else {
        Object.entries(value as any).forEach(([k, v]) => {
          target[targetKey][k] = v
        })
      }
      invalidate()
    })
  })

  const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

  let scrub: IScrub | undefined = undefined
  const onMouseDown = () => {
    scrub = $globalStudio?.scrub()
    isMouseDown = true
    isScrubbing.set(true)
  }
  const onMouseUp = async () => {
    await wait(100)
    isScrubbing.set(false)
    isMouseDown = false
    scrub?.commit()
    scrub = undefined
  }
  const onChange = () => {
    scrub?.capture(({ set }) => {
      if (!transforms) return
      if (!$parent) return
      if (!selected) return
      if (!object) return
      const { position, rotation, scale } = $parent

      set(object.props, {
        Position: {
          x: position.x,
          y: position.y,
          z: position.z
        },
        Rotation: {
          x: rotation.x * RAD2DEG,
          y: rotation.y * RAD2DEG,
          z: rotation.z * RAD2DEG
        },
        Scale: {
          x: scale.x,
          y: scale.y,
          z: scale.z
        }
      })
    })
  }

  $globalStudio?.onSelectionChange((newSelection) => {
    if (newSelection.includes(object)) {
      selected = true
    } else {
      selected = false
    }
  })

  $globalStudio?.ui.isHidden

  let mode: 'translate' | 'rotate' | 'scale' = 'translate'
  const onKeyPress = (e: KeyboardEvent) => {
    if (!selected) return
    if (e.key === 't') {
      mode = 'translate'
    }
    if (e.key === 'r') {
      mode = 'rotate'
    }
    if (e.key === 's') {
      mode = 'scale'
    }
  }
</script>

<svelte:window on:keypress={onKeyPress} />

{#if $parent && isObject3D($parent) && 'raycast' in $parent}
  <InteractiveObject
    object={$parent}
    interactive
    on:click={() => {
      // wait for the TransformControls to commit changes on mouseup
      if (isMouseDown || $isScrubbing) return
      selected = !selected
      if (selected) {
        $globalStudio?.setSelection([object])
      } else {
        $globalStudio?.setSelection([])
      }
    }}
  />
{/if}

{#if selected && isObject3D($parent) && transforms}
  <TransformControls
    {mode}
    on:change={onChange}
    on:mouseDown={onMouseDown}
    on:mouseUp={onMouseUp}
  />
{/if}
