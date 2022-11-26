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
  import type { AllProps, AnyProp, BooleanProp, ManualProp, StringProp } from './types'
  import { resolve } from './resolve'

  export let key: AllProps['key']
  export let projectName: AllProps['projectName'] = 'default'
  export let sheetName: AllProps['sheetName'] = 'default'
  export let transforms: AllProps['transforms'] = false

  const parent = useParent()
  const { invalidate } = useThrelte()

  let selected = false
  let isMouseDown = false

  /**
   * Automatic Props that are defined via boolean or string values can't use the
   * component prop name as the theatre prop name because component prop names
   * do not need to be alphanumeric whereas theatre prop names do. Thats why we
   * need to define a mapping of theatre prop names to component prop names in
   * order to resolve the target of the prop.
   */
  const autoProps = new Map<
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
    autoProps.set('Position', {
      path: 'position',
      type: 'generic'
    })
    autoProps.set('Rotation', {
      path: 'rotation',
      type: 'euler'
    })
    autoProps.set('Scale', {
      path: 'scale',
      type: 'generic'
    })
  }

  const parseAutoPropKeyByPath = (path: string) => {
    return path
      .split('.')
      .map((k) => k.charAt(0).toUpperCase() + k.slice(1))
      .join('')
  }

  const parseAutoPropInitialValue = (
    target: any,
    key: any
  ): {
    type: 'generic' | 'euler'
    value: any
  } => {
    // Throw error when key is not found in target
    if (!(key in target)) {
      throw new Error(`Key ${key} not found in target`)
    }
    let type: 'generic' | 'euler' = 'generic'
    let value = target[key]
    if (value instanceof Color) {
      // Colors get an RGBA interface
      value = types.rgba({
        r: value.r,
        g: value.g,
        b: value.b,
        a: 1
      })
    } else if (value instanceof Euler) {
      // Euler angles will be displayed in degrees
      type = 'euler'
      value = {
        x: value.x * RAD2DEG,
        y: value.y * RAD2DEG,
        z: value.z * RAD2DEG
      }
    } else if (!isPrimitive(value)) {
      value = { ...value }
    }
    return {
      type,
      value
    }
  }

  const parseProp: {
    boolean: (propName: string, propValue: BooleanProp) => Parameters<ISheet['object']>
    string: (propName: string, propValue: StringProp) => Parameters<ISheet['object']>
    manual: (propName: string, propValue: ManualProp) => Parameters<ISheet['object']>
  } = {
    boolean: (propName, _) => {
      /**
       * If the prop value is a boolean, we need to infer some things based on the name of the prop:
       * - initial value
       * - target object
       * - target key
       * - prop key (because these need to be alphanumeric)
       * This also means handling special cases like euler angles and colors
       */
      const key = parseAutoPropKeyByPath(propName)
      const { key: targetKey, target } = resolve($parent, propName)
      const { type, value } = parseAutoPropInitialValue(target, targetKey)
      const prop: Parameters<ISheet['object']> = [key, value]
      autoProps.set(key, {
        path: propName,
        type
      })
      return prop
    },
    string: (propName, propValue) => {
      /**
       * If the prop value is a string, we need to infer some things based on the name of the prop:
       * - initial value
       * - target object
       * - target key
       * This also means handling special cases like euler angles and colors
       * The prop value is used as the prop key
       */
      const { key: targetKey, target } = resolve($parent, propName)
      const { type, value } = parseAutoPropInitialValue(target, targetKey)
      const prop: Parameters<ISheet['object']> = [propValue, value]
      autoProps.set(key, {
        path: propName,
        type
      })
      return prop
    },
    manual: (_, propValue) => {
      /**
       * If the prop value is a full prop definition, we don't need to infer anything
       */
      const prop: Parameters<ISheet['object']> = propValue
      return prop
    }
  }

  const parsedProps = Object.entries($$restProps as Record<string, AnyProp>)
    .filter(Boolean)
    .map(([key, value]) => {
      if (typeof value === 'boolean') {
        return parseProp.boolean(key, value)
      } else if (typeof value === 'string') {
        return parseProp.string(key, value)
      } else {
        return parseProp.manual(key, value)
      }
    })
    .reduce((acc, [key, value]) => {
      ;(acc as any)[key] = value
      return acc
    }, {})

  const sheet = getContext(`theatre-project-${projectName}-sheet-${sheetName}`) as ISheet
  const object = sheet.object(key, {
    ...parsedProps
  })

  let values = object.value

  object.onValuesChange((newValues) => {
    values = newValues
    Object.entries(newValues).forEach((prop) => {
      if (!prop || isMouseDown) return
      const [key, value] = prop
      const autoProp = autoProps.get(key)
      if (!autoProp) return
      const { path, type } = autoProp
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

  // const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

  // let scrub: IScrub | undefined = undefined
  // const onMouseDown = () => {
  //   scrub = $globalStudio?.scrub()
  //   isMouseDown = true
  //   isScrubbing.set(true)
  // }
  // const onMouseUp = async () => {
  //   await wait(100)
  //   isScrubbing.set(false)
  //   isMouseDown = false
  //   scrub?.commit()
  //   scrub = undefined
  // }
  // const onChange = () => {
  //   scrub?.capture(({ set }) => {
  //     if (!transforms) return
  //     if (!$parent) return
  //     if (!selected) return
  //     if (!object) return
  //     const { position, rotation, scale } = $parent

  //     set(object.props, {
  //       Position: {
  //         x: position.x,
  //         y: position.y,
  //         z: position.z
  //       },
  //       Rotation: {
  //         x: rotation.x * RAD2DEG,
  //         y: rotation.y * RAD2DEG,
  //         z: rotation.z * RAD2DEG
  //       },
  //       Scale: {
  //         x: scale.x,
  //         y: scale.y,
  //         z: scale.z
  //       }
  //     })
  //   })
  // }

  // $globalStudio?.onSelectionChange((newSelection) => {
  //   if (newSelection.includes(object)) {
  //     selected = true
  //   } else {
  //     selected = false
  //   }
  // })

  // $globalStudio?.ui.isHidden

  // let mode: 'translate' | 'rotate' | 'scale' = 'translate'
  // const onKeyPress = (e: KeyboardEvent) => {
  //   if (!selected) return
  //   if (e.key === 't') {
  //     mode = 'translate'
  //   }
  //   if (e.key === 'r') {
  //     mode = 'rotate'
  //   }
  //   if (e.key === 's') {
  //     mode = 'scale'
  //   }
  // }
</script>

<slot {values} />

<!-- <svelte:window on:keypress={onKeyPress} />

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
{/if} -->
