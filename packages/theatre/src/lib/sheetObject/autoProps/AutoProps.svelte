<script lang="ts">
  import type { ISheetObject, UnknownShorthandCompoundProps } from '@theatre/core'
  import {
    resolvePropertyPath,
    useParent,
    watch,
    type CurrentWritable,
    useThrelte
  } from '@threlte/core'
  import type { AnyProp } from './AutoProps.svelte'
  import type { Transformer } from '../transfomers/types'
  import { getInitialValue } from './utils/getInitialValue'
  import { makeAlphanumeric } from './utils/makeAlphanumeric'
  import { parsePropLabel } from './utils/parsePropLabel'
  import { isComplexProp } from './utils/isComplexProp'
  import { onDestroy } from 'svelte'

  // used for type hinting auto props
  export let ref: any

  export let sheetObject: CurrentWritable<ISheetObject | undefined>
  export let addProps: (props: UnknownShorthandCompoundProps) => void
  export let removeProps: (propNames: string[]) => void

  const parent = useParent()

  // serves as a map to map (custom) prop names to object target properties
  let propMappings = {} as Record<
    string,
    {
      propertyPath: string
      transformer: Transformer
    }
  >

  const initAutoProps = () => {
    const props = {} as Record<string, any>

    // propertyPath is for example "position.x" or "intensity", so a property path on the parent object
    Object.entries(<Record<string, AnyProp>>$$restProps).forEach(
      ([propertyPath, propertyValue]) => {
        // The prop might have a custom name, for example "intensity" might be mapped to "light-intensity"
        const customKey = isComplexProp(propertyValue) ? propertyValue.key : undefined
        const key = customKey ?? makeAlphanumeric(propertyPath)

        // get the initial value as well as the correct transformer for the property
        const { value, transformer } = getInitialValue(propertyPath, propertyValue, $parent)
        const label = parsePropLabel(key, propertyValue)

        // apply the label to the value
        value.label = label

        // add the prop to the propMappings map
        propMappings[key] = {
          propertyPath,
          transformer
        }

        // add the prop to the props object
        props[key] = value
      }
    )

    // add the props to the parent IsheetObject
    addProps(props)
  }

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

  const { invalidate } = useThrelte()

  watch([parent, sheetObject], ([parent, sheetObject]) => {
    if (!parent) return

    return sheetObject?.onValuesChange((values) => {
      // Ensure that the parent is still mounted

      Object.keys(values).forEach((key) => {
        // first, check if the prop is mapped in this component
        const propMapping = propMappings[key]

        if (!propMapping) return

        // we're using the addedProps map to infer the target property name from the property name on values
        const { target, key: targetKey } = resolvePropertyPath(
          parent as any,
          propMapping.propertyPath
        )

        // use a transformer to apply value
        const transformer = propMapping.transformer
        transformer.apply(target, targetKey, values[key])

        if (updateProjectionMatrixKeys.includes(targetKey)) {
          target.updateProjectionMatrix?.()
        }
      })

      invalidate('AutoProps: props changed')
    })
  })

  initAutoProps()

  onDestroy(() => {
    removeProps(Object.keys(propMappings))
  })
</script>
