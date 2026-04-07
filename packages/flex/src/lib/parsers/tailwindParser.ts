import { createClassParser } from './createClassParser.js'

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

export const tailwindParser = createClassParser((string, props) => {
  const classes = string.split(' ').map((className) => className.trim())

  classes.forEach((className) => {
    // padding
    if (className.startsWith('p-')) {
      const [, value] = className.split('-')
      props.padding = parseNumericOrPercentageValue(value)
      return
    }
    if (className.startsWith('px-')) {
      const [, value] = className.split('-')
      props.paddingLeft = parseNumericOrPercentageValue(value)
      props.paddingRight = parseNumericOrPercentageValue(value)
      return
    }
    if (className.startsWith('py-')) {
      const [, value] = className.split('-')
      props.paddingTop = parseNumericOrPercentageValue(value)
      props.paddingBottom = parseNumericOrPercentageValue(value)
      return
    }
    if (className.startsWith('pt-')) {
      const [, value] = className.split('-')
      props.paddingTop = parseNumericOrPercentageValue(value)
      return
    }
    if (className.startsWith('pr-')) {
      const [, value] = className.split('-')
      props.paddingRight = parseNumericOrPercentageValue(value)
      return
    }
    if (className.startsWith('pb-')) {
      const [, value] = className.split('-')
      props.paddingBottom = parseNumericOrPercentageValue(value)
      return
    }
    if (className.startsWith('pl-')) {
      const [, value] = className.split('-')
      props.paddingLeft = parseNumericOrPercentageValue(value)
      return
    }

    // margin
    if (className.startsWith('m-')) {
      const [, value] = className.split('-')
      props.margin = parseNumericOrAutoOrPercentageValue(value)
      return
    }
    if (className.startsWith('mx-')) {
      const [, value] = className.split('-')
      props.marginLeft = parseNumericOrAutoOrPercentageValue(value)
      props.marginRight = parseNumericOrAutoOrPercentageValue(value)
      return
    }
    if (className.startsWith('my-')) {
      const [, value] = className.split('-')
      props.marginTop = parseNumericOrAutoOrPercentageValue(value)
      props.marginBottom = parseNumericOrAutoOrPercentageValue(value)
      return
    }
    if (className.startsWith('mt-')) {
      const [, value] = className.split('-')
      props.marginTop = parseNumericOrAutoOrPercentageValue(value)
      return
    }
    if (className.startsWith('mr-')) {
      const [, value] = className.split('-')
      props.marginRight = parseNumericOrAutoOrPercentageValue(value)
      return
    }
    if (className.startsWith('mb-')) {
      const [, value] = className.split('-')
      props.marginBottom = parseNumericOrAutoOrPercentageValue(value)
      return
    }
    if (className.startsWith('ml-')) {
      const [, value] = className.split('-')
      props.marginLeft = parseNumericOrAutoOrPercentageValue(value)
      return
    }

    // width
    if (className.startsWith('w-')) {
      const [, value] = className.split('-')
      props.width = parseNumericOrAutoOrPercentageValue(value)
      return
    }

    // height
    if (className.startsWith('h-')) {
      const [, value] = className.split('-')
      props.height = parseNumericOrAutoOrPercentageValue(value)
      return
    }

    // flex-basis
    if (className.startsWith('basis-')) {
      const [, value] = className.split('-')
      props.flexBasis = parseNumericOrAutoOrPercentageValue(value)
      return
    }

    // flex-grow
    if (className.startsWith('grow-')) {
      const [, value] = className.split('-')
      props.flexGrow = Number(value)
      return
    }

    // flex-shrink
    if (className.startsWith('shrink-')) {
      const [, value] = className.split('-')
      props.flexShrink = Number(value)
      return
    }

    // flex-direction
    if (className.startsWith('flex-')) {
      // first the flex direction
      switch (className) {
        case 'flex-row':
          props.flexDirection = 'Row'
          break
        case 'flex-row-reverse':
          props.flexDirection = 'RowReverse'
          break
        case 'flex-col':
          props.flexDirection = 'Column'
          break
        case 'flex-col-reverse':
          props.flexDirection = 'ColumnReverse'
          break
        case 'flex-wrap':
          props.flexWrap = 'Wrap'
          break
        case 'flex-wrap-reverse':
          props.flexWrap = 'WrapReverse'
          break
        case 'flex-nowrap':
          props.flexWrap = 'NoWrap'
          break
        default: {
          // flex shorthand
          const [, value] = className.split('-')
          props.flex = Number(value)
        }
      }
      return
    }

    // justify-content
    if (className.startsWith('justify-')) {
      switch (className) {
        case 'justify-start':
          props.justifyContent = 'FlexStart'
          break
        case 'justify-end':
          props.justifyContent = 'FlexEnd'
          break
        case 'justify-center':
          props.justifyContent = 'Center'
          break
        case 'justify-between':
          props.justifyContent = 'SpaceBetween'
          break
        case 'justify-around':
          props.justifyContent = 'SpaceAround'
          break
        case 'justify-evenly':
          props.justifyContent = 'SpaceEvenly'
          break
      }
      return
    }

    // align-items
    if (className.startsWith('items-')) {
      switch (className) {
        case 'items-start':
          props.alignItems = 'FlexStart'
          break
        case 'items-end':
          props.alignItems = 'FlexEnd'
          break
        case 'items-center':
          props.alignItems = 'Center'
          break
        case 'items-baseline':
          props.alignItems = 'Baseline'
          break
        case 'items-stretch':
          props.alignItems = 'Stretch'
          break
      }
      return
    }

    // align-content
    if (className.startsWith('content-')) {
      switch (className) {
        case 'content-normal':
          props.alignContent = 'Auto'
          break
        case 'content-start':
          props.alignContent = 'FlexStart'
          break
        case 'content-end':
          props.alignContent = 'FlexEnd'
          break
        case 'content-center':
          props.alignContent = 'Center'
          break
        case 'content-between':
          props.alignContent = 'SpaceBetween'
          break
        case 'content-around':
          props.alignContent = 'SpaceAround'
          break
        case 'content-stretch':
          props.alignContent = 'Stretch'
          break
        case 'content-baseline':
          props.alignContent = 'Baseline'
          break
      }
      return
    }

    // align-self
    if (className.startsWith('self-')) {
      switch (className) {
        case 'self-auto':
          props.alignSelf = 'Auto'
          break
        case 'self-start':
          props.alignSelf = 'FlexStart'
          break
        case 'self-end':
          props.alignSelf = 'FlexEnd'
          break
        case 'self-center':
          props.alignSelf = 'Center'
          break
        case 'self-stretch':
          props.alignSelf = 'Stretch'
          break
        case 'self-baseline':
          props.alignSelf = 'Baseline'
          break
      }
      return
    }

    // Gaps
    if (className.startsWith('gap-x-')) {
      const [, value] = className.split('-')
      props.gapColumn = Number(value)
      return
    } else if (className.startsWith('gap-y-')) {
      const [, value] = className.split('-')
      props.gapRow = Number(value)
      return
    } else if (className.startsWith('gap-')) {
      const [, value] = className.split('-')
      props.gap = Number(value)
      return
    }

    // Position
    if (className.startsWith('top-')) {
      const [, value] = className.split('-')
      props.top = parseNumericOrPercentageValue(value)
      return
    }
    if (className.startsWith('right-')) {
      const [, value] = className.split('-')
      props.right = parseNumericOrPercentageValue(value)
      return
    }
    if (className.startsWith('bottom-')) {
      const [, value] = className.split('-')
      props.bottom = parseNumericOrPercentageValue(value)
      return
    }
    if (className.startsWith('left-')) {
      const [, value] = className.split('-')
      props.left = parseNumericOrPercentageValue(value)
      return
    }

    // aspect ratio
    if (className.startsWith('aspect-')) {
      switch (className) {
        case 'aspect-square':
          props.aspectRatio = 1
          break
        case 'aspect-landscape':
          props.aspectRatio = 16 / 9
          break
        case 'aspect-portrait':
          props.aspectRatio = 9 / 16
          break
        default: {
          const [, value] = className.split('-')
          const [width, height] = value.split('/')
          props.aspectRatio = Number(width) / Number(height)
        }
      }
    }
  })

  return props
})
