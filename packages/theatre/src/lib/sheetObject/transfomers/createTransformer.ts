import type { UnknownShorthandCompoundProps } from '@theatre/core'
import type { Transformer } from './types'

export const createTransformer = <Target = any>() => {
  return {
    build: <
      Resolved extends UnknownShorthandCompoundProps[keyof UnknownShorthandCompoundProps] = any
    >(
      transformer: Transformer<Target, Resolved>
    ) => {
      return transformer
    }
  }
}
