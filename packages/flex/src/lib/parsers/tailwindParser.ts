import { createClassParser } from './createClassParser'
import type { NodeProps } from '../lib/props'

export const tailwindParser = createClassParser((string) => {
  const styles: NodeProps = {}
  const classes = string.split(' ').map((className) => className.trim())

  const parseNumericOrAutoOrPercentageValue = (value: string): number | 'auto' | `${number}%` => {
    if (value === 'auto') {
      return value as 'auto'
    } else if (value.endsWith('%')) {
      return value as `${number}%`
    } else if (value === 'full') {
      return '100%'
    } else if (value.match(/^\d+\/\d+$/)) {
      const [width, height] = value.split('/')
      const percentage = Math.round((Number(width) / Number(height)) * 100)
      return `${percentage}%`
    }
    return Number(value)
  }

  const parseNumericOrPercentageValue = (value: string): number | `${number}%` => {
    if (value.endsWith('%')) {
      return value as `${number}%`
    } else if (value === 'full') {
      return '100%'
    } else if (value.match(/^\d+\/\d+$/)) {
      const [width, height] = value.split('/')
      const percentage = Math.round((Number(width) / Number(height)) * 100)
      return `${percentage}%`
    }
    return Number(value)
  }

  classes.forEach((className) => {
    // padding
    if (className.startsWith('p-')) {
      const [, value] = className.split('-')
      styles.padding = parseNumericOrPercentageValue(value)
    }
    if (className.startsWith('px-')) {
      const [, value] = className.split('-')
      styles.paddingLeft = parseNumericOrPercentageValue(value)
      styles.paddingRight = parseNumericOrPercentageValue(value)
    }
    if (className.startsWith('py-')) {
      const [, value] = className.split('-')
      styles.paddingTop = parseNumericOrPercentageValue(value)
      styles.paddingBottom = parseNumericOrPercentageValue(value)
    }
    if (className.startsWith('pt-')) {
      const [, value] = className.split('-')
      styles.paddingTop = parseNumericOrPercentageValue(value)
    }
    if (className.startsWith('pr-')) {
      const [, value] = className.split('-')
      styles.paddingRight = parseNumericOrPercentageValue(value)
    }
    if (className.startsWith('pb-')) {
      const [, value] = className.split('-')
      styles.paddingBottom = parseNumericOrPercentageValue(value)
    }
    if (className.startsWith('pl-')) {
      const [, value] = className.split('-')
      styles.paddingLeft = parseNumericOrPercentageValue(value)
    }

    // margin
    if (className.startsWith('m-')) {
      const [, value] = className.split('-')
      styles.margin = parseNumericOrAutoOrPercentageValue(value)
    }
    if (className.startsWith('mx-')) {
      const [, value] = className.split('-')
      styles.marginLeft = parseNumericOrAutoOrPercentageValue(value)
      styles.marginRight = parseNumericOrAutoOrPercentageValue(value)
    }
    if (className.startsWith('my-')) {
      const [, value] = className.split('-')
      styles.marginTop = parseNumericOrAutoOrPercentageValue(value)
      styles.marginBottom = parseNumericOrAutoOrPercentageValue(value)
    }
    if (className.startsWith('mt-')) {
      const [, value] = className.split('-')
      styles.marginTop = parseNumericOrAutoOrPercentageValue(value)
    }
    if (className.startsWith('mr-')) {
      const [, value] = className.split('-')
      styles.marginRight = parseNumericOrAutoOrPercentageValue(value)
    }
    if (className.startsWith('mb-')) {
      const [, value] = className.split('-')
      styles.marginBottom = parseNumericOrAutoOrPercentageValue(value)
    }
    if (className.startsWith('ml-')) {
      const [, value] = className.split('-')
      styles.marginLeft = parseNumericOrAutoOrPercentageValue(value)
    }

    // width
    if (className.startsWith('w-')) {
      const [, value] = className.split('-')
      styles.width = parseNumericOrAutoOrPercentageValue(value)
    }

    // height
    if (className.startsWith('h-')) {
      const [, value] = className.split('-')
      styles.height = parseNumericOrAutoOrPercentageValue(value)
    }

    // flex-basis
    if (className.startsWith('basis-')) {
      const [, value] = className.split('-')
      styles.flexBasis = parseNumericOrAutoOrPercentageValue(value)
    }

    // flex-grow
    if (className.startsWith('grow-')) {
      const [, value] = className.split('-')
      styles.flexGrow = Number(value)
    }

    // flex-shrink
    if (className.startsWith('shrink-')) {
      const [, value] = className.split('-')
      styles.flexShrink = Number(value)
    }

    // flex-direction
    if (className.startsWith('flex-')) {
      // first the flex direction
      switch (className) {
        case 'flex-row':
          styles.flexDirection = 'Row'
          break
        case 'flex-row-reverse':
          styles.flexDirection = 'RowReverse'
          break
        case 'flex-col':
          styles.flexDirection = 'Column'
          break
        case 'flex-col-reverse':
          styles.flexDirection = 'ColumnReverse'
          break
        case 'flex-wrap':
          styles.flexWrap = 'Wrap'
          break
        case 'flex-wrap-reverse':
          styles.flexWrap = 'WrapReverse'
          break
        case 'flex-nowrap':
          styles.flexWrap = 'NoWrap'
          break
        default:
          // flex shorthand
          const [, value] = className.split('-')
          styles.flex = Number(value)
      }
    }

    // justify-content
    if (className.startsWith('justify-')) {
      switch (className) {
        case 'justify-start':
          styles.justifyContent = 'FlexStart'
          break
        case 'justify-end':
          styles.justifyContent = 'FlexEnd'
          break
        case 'justify-center':
          styles.justifyContent = 'Center'
          break
        case 'justify-between':
          styles.justifyContent = 'SpaceBetween'
          break
        case 'justify-around':
          styles.justifyContent = 'SpaceAround'
          break
        case 'justify-evenly':
          styles.justifyContent = 'SpaceEvenly'
          break
      }
    }

    // align-items
    if (className.startsWith('items-')) {
      switch (className) {
        case 'items-start':
          styles.alignItems = 'FlexStart'
          break
        case 'items-end':
          styles.alignItems = 'FlexEnd'
          break
        case 'items-center':
          styles.alignItems = 'Center'
          break
        case 'items-baseline':
          styles.alignItems = 'Baseline'
          break
        case 'items-stretch':
          styles.alignItems = 'Stretch'
          break
      }
    }

    // align-content
    if (className.startsWith('content-')) {
      switch (className) {
        case 'content-normal':
          styles.alignContent = 'Auto'
          break
        case 'content-start':
          styles.alignContent = 'FlexStart'
          break
        case 'content-end':
          styles.alignContent = 'FlexEnd'
          break
        case 'content-center':
          styles.alignContent = 'Center'
          break
        case 'content-between':
          styles.alignContent = 'SpaceBetween'
          break
        case 'content-around':
          styles.alignContent = 'SpaceAround'
          break
        case 'content-stretch':
          styles.alignContent = 'Stretch'
          break
        case 'content-baseline':
          styles.alignContent = 'Baseline'
          break
      }
    }

    // align-self
    if (className.startsWith('self-')) {
      switch (className) {
        case 'self-auto':
          styles.alignSelf = 'Auto'
          break
        case 'self-start':
          styles.alignSelf = 'FlexStart'
          break
        case 'self-end':
          styles.alignSelf = 'FlexEnd'
          break
        case 'self-center':
          styles.alignSelf = 'Center'
          break
        case 'self-stretch':
          styles.alignSelf = 'Stretch'
          break
        case 'self-baseline':
          styles.alignSelf = 'Baseline'
          break
      }
    }

    // Gaps
    if (className.startsWith('gap-x-')) {
      const [, value] = className.split('-')
      styles.gapColumn = Number(value)
    } else if (className.startsWith('gap-y-')) {
      const [, value] = className.split('-')
      styles.gapRow = Number(value)
    } else if (className.startsWith('gap-')) {
      const [, value] = className.split('-')
      styles.gap = Number(value)
    }

    // Position
    if (className.startsWith('top-')) {
      const [, value] = className.split('-')
      styles.top = parseNumericOrPercentageValue(value)
    }
    if (className.startsWith('right-')) {
      const [, value] = className.split('-')
      styles.right = parseNumericOrPercentageValue(value)
    }
    if (className.startsWith('bottom-')) {
      const [, value] = className.split('-')
      styles.bottom = parseNumericOrPercentageValue(value)
    }
    if (className.startsWith('left-')) {
      const [, value] = className.split('-')
      styles.left = parseNumericOrPercentageValue(value)
    }

    // aspect ratio
    if (className.startsWith('aspect-')) {
      switch (className) {
        case 'aspect-square':
          styles.aspectRatio = 1
          break
        case 'aspect-landscape':
          styles.aspectRatio = 16 / 9
          break
        case 'aspect-portrait':
          styles.aspectRatio = 9 / 16
          break
        default:
          const [, value] = className.split('-')
          const [width, height] = value.split('/')
          styles.aspectRatio = Number(width) / Number(height)
      }
    }
  })

  return styles
})
