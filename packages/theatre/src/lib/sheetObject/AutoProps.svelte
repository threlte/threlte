<script lang="ts">
  import type { ISheetObject, UnknownShorthandCompoundProps } from '@theatre/core'
  import { resolvePropertyPath, useParent, watch, type CurrentWritable } from '@threlte/core'
  import type { Transformer } from './transfomers/types'
  import { getInitialValue } from './utils/getInitialValue'
  import { parsePropLabel } from './utils/parsePropLabel'

  // used for type hinting auto props
  export let ref: any

  export let sheetObject: CurrentWritable<ISheetObject | undefined>
  export let addProps: (props: UnknownShorthandCompoundProps) => void
  export let removeProps: (propNames: string[]) => void

  const parent = useParent()

  if (!$parent) {
    throw new Error(
      '<AutoProps> must be used as a child to a component instantiating a THREE.Object3D'
    )
  }

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
    Object.keys($$restProps).forEach((propertyPath) => {
      // The prop might have a custom name, for example "intensity" might be mapped to "light-intensity"
      const propValue = $$restProps[propertyPath]

      const label = parsePropLabel(propertyPath, propValue)
      const { value, transformer } = getInitialValue(propertyPath, propValue, $parent)

      propMappings[label] = {
        propertyPath,
        transformer
      }

      props[label] = value
    })

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
    })
  })

  initAutoProps()
</script>
