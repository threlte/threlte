import { color } from './defaults/color.js'
import { degrees } from './defaults/degrees.js'
import { euler } from './defaults/euler.js'
import { generic } from './defaults/generic.js'
import { normalized } from './defaults/normalized.js'
import { side } from './defaults/side.js'

const isFullOrEndingPattern = (fullPropertyPath: string, pattern: string) => {
  return fullPropertyPath.endsWith(`.${pattern}`) || fullPropertyPath === pattern
}

export const getDefaultTransformer = (target: any, path: string, fullPropertyPath: string) => {
  const property = target[path]

  if (property.isEuler) return euler
  if (property.isColor) return color

  if (
    isFullOrEndingPattern(fullPropertyPath, 'rotation.x') ||
    isFullOrEndingPattern(fullPropertyPath, 'rotation.y') ||
    isFullOrEndingPattern(fullPropertyPath, 'rotation.z') ||
    (target.isEuler &&
      (fullPropertyPath === 'x' || fullPropertyPath === 'y' || fullPropertyPath === 'z'))
  ) {
    return degrees
  }

  if (isFullOrEndingPattern(fullPropertyPath, 'r')) return normalized
  if (isFullOrEndingPattern(fullPropertyPath, 'g')) return normalized
  if (isFullOrEndingPattern(fullPropertyPath, 'b')) return normalized

  if (isFullOrEndingPattern(fullPropertyPath, 'opacity')) return normalized
  if (isFullOrEndingPattern(fullPropertyPath, 'roughness')) return normalized
  if (isFullOrEndingPattern(fullPropertyPath, 'metalness')) return normalized
  if (isFullOrEndingPattern(fullPropertyPath, 'transmission')) return normalized

  if (isFullOrEndingPattern(fullPropertyPath, 'side')) return side

  return generic
}
