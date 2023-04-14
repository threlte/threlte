<script lang="ts">
  import type { ISheet, UnknownShorthandCompoundProps } from '@theatre/core'
  import type { IScrub } from '@theatre/studio'
  import { createRawEventDispatcher, useParent, useThrelte } from '@threlte/core'
  import { TransformControls } from '@threlte/extras'
  import { getContext, onDestroy, onMount } from 'svelte'
  import { DEG2RAD, RAD2DEG } from 'three/src/math/MathUtils'
  import { globalObjects, globalStudio } from '../consts'
  import { isObject3D, isOrthographicOrPerspectiveCamera, isPrimitive } from './typeGuards'
  import type { AutoProp, BooleanProp, Props, PropTransform, StringProp } from './types'
  import { getAutoPropValue, parseAutoPropKeyByPath, resolve } from './utils'

  type ManualProps = $$Generic<UnknownShorthandCompoundProps>
  type $$Props = Props<ManualProps>

  export let name: $$Props['name']
  export let transform: $$Props['transform'] = false
  export let props: $$Props['props'] = undefined
  export let controls: $$Props['controls'] = undefined
  export let snap: $$Props['snap'] = undefined
  /**
   * @default false
   */
  export let detach: $$Props['detach'] = false

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
  const transformProps: UnknownShorthandCompoundProps | undefined =
    (transform &&
      $parent &&
      $parent.isObject3D &&
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
      }) ||
    undefined

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
      const { transform, value } = getAutoPropValue($parent, propName)
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
      const { transform, value } = getAutoPropValue($parent, propName)
      const prop: UnknownShorthandCompoundProps = { [propName]: value }
      autoProps.set(name, {
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

  const dispatch = createRawEventDispatcher<{
    change: typeof values
    create: typeof values
  }>()

  const sheet = getContext('theatre-sheet') as ISheet

  const projectId = sheet.address.projectId
  const sheetId = sheet.address.sheetId
  const instanceId = sheet.address.sheetInstanceId

  export const object =
    globalObjects.get(`${projectId}-${sheetId}-${instanceId}-${name}`) ??
    sheet.object(
      name,
      {
        ...parsedProps,
        ...props,
        ...transformProps
      },
      {
        reconfigure: true
      }
    )
  globalObjects.set(`${projectId}-${sheetId}-${instanceId}-${name}`, object)

  onDestroy(() => {
    if (detach) {
      sheet.detachObject(name)
    }
  })

  let values = object.value

  onMount(() => {
    dispatch('create', object.value)
  })

  let selected = false
  let isMouseDown = false

  /**
   * The values behind properties with these keys make updating the projection
   * matrix necessary.
   */
  const updateProjectionMatrixKeys = [
    'fov',
    'near',
    'far',
    'zoom',
    'left',
    'right',
    'top',
    'bottom',
    'aspect'
  ]

  const unsubscribe = object.onValuesChange((newValues) => {
    // assign new values to slot prop
    values = newValues

    // dispatch events to parent component callbacks
    dispatch('change', newValues)

    // update auto props
    Object.entries(newValues).forEach((prop) => {
      // do not apply values while the transformControls are on
      if (isMouseDown && selected && transform && controls) return

      if (!prop) return
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
      if (
        updateProjectionMatrixKeys.includes(targetKey) &&
        isOrthographicOrPerspectiveCamera($parent)
      ) {
        $parent.updateProjectionMatrix()
      }

      invalidate()
    })
  })
  onDestroy(unsubscribe)

  export const read = () => {
    if (!$globalStudio) return
    let props = {}
    for (const [key, value] of autoProps.entries()) {
      const prop = {
        [key]: getAutoPropValue($parent, value.path).value
      }
      props = {
        ...props,
        ...prop
      }
    }
    $globalStudio.transaction(({ set }) => {
      set(object.props, props)
    })
  }

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
    if (!isMouseDown) return
    if (!transform) return
    if (!selected) return

    scrub?.capture(({ set }) => {
      if (!$parent) return
      const { position, rotation, scale } = $parent

      if (mode === 'translate') {
        set(object.props.Position, {
          x: position.x,
          y: position.y,
          z: position.z
        })
      } else if (mode === 'rotate') {
        set(object.props.Rotation, {
          x: rotation.x * RAD2DEG,
          y: rotation.y * RAD2DEG,
          z: rotation.z * RAD2DEG
        })
      } else if (mode === 'scale') {
        set(object.props.Scale, {
          x: scale.x,
          y: scale.y,
          z: scale.z
        })
      }
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
  let space: 'local' | 'world' = 'local'

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
    if (e.key === 'g') {
      if (space === 'local') {
        space = 'world'
      } else {
        space = 'local'
      }
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

<svelte:window on:keypress={onKeyPress} on:keydown={onKeyDown} on:keyup={onKeyUp} />

{#if selected && isObject3D($parent) && transform && controls}
  <TransformControls
    {mode}
    object={$parent}
    translationSnap={snapActive ? snapValues.translate : null}
    rotationSnap={snapActive ? snapValues.rotate : null}
    scaleSnap={snapActive ? snapValues.scale : null}
    {space}
    on:change={onChange}
    on:mouseDown={onMouseDown}
    on:mouseUp={onMouseUp}
  />
{/if}

<slot {values} {read} {sheet} {object} />
