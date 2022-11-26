<script lang="ts">
  import type { ISheet, UnknownShorthandCompoundProps } from '@theatre/core'
  import type { IScrub } from '@theatre/studio'
  import { TransformControls, useParent, useThrelte } from '@threlte/core'
  import { getContext } from 'svelte'
  import { DEG2RAD, RAD2DEG } from 'three/src/math/MathUtils'
  import { globalObjects, globalStudio } from '../consts'
  import { createRawEventDispatcher } from './createRawEventDispatcher'
  import { isObject3D, isPrimitive } from './typeGuards'
  import type { AutoProp, BooleanProp, Props, PropTransform, StringProp } from './types'
  import { parseAutoPropInitialValue, parseAutoPropKeyByPath, resolve } from './utils'

  type ManualProps = $$Generic<UnknownShorthandCompoundProps>
  type $$Props = Props<ManualProps>

  export let key: $$Props['key']
  export let projectName: $$Props['projectName'] = 'default'
  export let sheetName: $$Props['sheetName'] = 'default'
  export let transform: $$Props['transform'] = false
  export let props: $$Props['props'] = undefined
  export let controls: $$Props['controls'] = undefined
  export let snap: $$Props['snap'] = undefined

  const parent = useParent()
  const { invalidate } = useThrelte()

  /**
   * Automatic Props that are defined via boolean or string values can't use the
   * component prop name as the theatre prop name because component prop names
   * do not need to be alphanumeric whereas theatre prop names do. Thats why we
   * need to define a mapping of theatre prop names to component prop names in
   * order to resolve the target of the prop. Also, some props get a special
   * treatment in terms of UI presentation or data transformation. That is
   * represented by the `type` property.
   */
  const autoProps = new Map<
    string,
    {
      path: string
      transform: PropTransform
    }
  >()

  /**
   * Transform props are props that are added via the component prop
   * "transform".
   */
  const transformProps: UnknownShorthandCompoundProps | undefined = $parent &&
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

  /**
   * If transform props are defined, we need to add them to the list of auto
   * props.
   */
  if (transformProps) {
    autoProps.set('Position', {
      path: 'position',
      transform: 'none'
    })
    autoProps.set('Rotation', {
      path: 'rotation',
      transform: 'euler'
    })
    autoProps.set('Scale', {
      path: 'scale',
      transform: 'none'
    })
  }

  const parseAutoProp: {
    boolean: (propName: string, propValue: BooleanProp) => UnknownShorthandCompoundProps
    string: (propName: string, propValue: StringProp) => UnknownShorthandCompoundProps
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
      const { transform, value } = parseAutoPropInitialValue($parent, propName)
      const prop: UnknownShorthandCompoundProps = { [key]: value }
      autoProps.set(key, {
        path: propName,
        transform
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
      const { transform, value } = parseAutoPropInitialValue($parent, propName)
      const prop: UnknownShorthandCompoundProps = { [propName]: value }
      autoProps.set(key, {
        path: propName,
        transform
      })
      return prop
    }
  }

  const parsedProps = Object.entries($$restProps as Record<string, AutoProp>)
    .filter(Boolean)
    .map(([key, value]) => {
      if (typeof value === 'boolean') {
        return parseAutoProp.boolean(key, value)
      } else if (typeof value === 'string') {
        return parseAutoProp.string(key, value)
      }
      throw new Error(
        `Invalid prop type for auto prop ${key}: ` + typeof value + '. Expected boolean or string.'
      )
    })
    .reduce((acc, curr) => ({ ...acc, ...curr }), {})

  const sheet = getContext(`theatre-project-${projectName}-sheet-${sheetName}`) as ISheet
  const object =
    globalObjects.get(`${projectName}-${sheetName}-${key}`) ??
    sheet.object(key, {
      ...parsedProps,
      ...props,
      ...transformProps
    })

  let values = object.value

  const dispatchRaw = createRawEventDispatcher<{
    change: typeof values
  }>()

  let selected = false
  let isMouseDown = false

  object.onValuesChange((newValues) => {
    // assign new values to slot prop
    values = newValues

    // dispatch events to parent component callbacks
    dispatchRaw('change', newValues)

    // update auto props
    Object.entries(newValues).forEach((prop) => {
      if (!prop || isMouseDown) return
      const [key, value] = prop
      const autoProp = autoProps.get(key)
      if (!autoProp) return
      const { path, transform: type } = autoProp
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

  let scrub: IScrub | undefined = undefined
  const onMouseDown = () => {
    scrub = $globalStudio?.scrub()
    isMouseDown = true
  }
  const onMouseUp = async () => {
    isMouseDown = false
    scrub?.commit()
    scrub = undefined
  }
  const onChange = () => {
    scrub?.capture(({ set }) => {
      if (!transform) return
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

  type Mode = 'translate' | 'rotate' | 'scale'
  let mode: Mode = 'translate'
  let snapActive = false
  $: snapValues = {
    translate: snap?.translate ?? 1,
    rotate: (snap?.rotate ?? 45) * DEG2RAD,
    scale: snap?.scale ?? 0.1
  } as Record<Mode, number | null>

  const onKeyPress = (e: KeyboardEvent) => {
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

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Shift') {
      snapActive = true
    }
  }

  const onKeyUp = (e: KeyboardEvent) => {
    if (e.key === 'Shift') {
      snapActive = false
    }
  }
</script>

<slot {values} />

<svelte:window
  on:keypress={onKeyPress}
  on:keydown={onKeyDown}
  on:keyup={onKeyUp}
/>

{#if selected && isObject3D($parent) && transform && controls}
  <TransformControls
    {mode}
    translationSnap={snapActive ? snapValues.translate : null}
    rotationSnap={snapActive ? snapValues.rotate : null}
    scaleSnap={snapActive ? snapValues.scale : null}
    on:change={onChange}
    on:mouseDown={onMouseDown}
    on:mouseUp={onMouseUp}
  />
{/if}
