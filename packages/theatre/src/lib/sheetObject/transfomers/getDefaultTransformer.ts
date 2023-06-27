import { Color, Euler } from 'three'
import { color } from './defaults/color'
import { degrees } from './defaults/degrees'
import { euler } from './defaults/euler'
import { generic } from './defaults/generic'
import { normalized } from './defaults/normalized'
import { side } from './defaults/side'

const isFullOrEndingPattern = (fullPropertyPath: string, pattern: string) => {
  return fullPropertyPath.endsWith(`.${pattern}`) || fullPropertyPath === pattern
}

export const getDefaultTransformer = (target: any, path: string, fullPropertyPath: string) => {
  const property = target[path]

  if (property instanceof Euler) return euler
  if (property instanceof Color) return color

  if (
    isFullOrEndingPattern(fullPropertyPath, 'rotation.x') ||
    isFullOrEndingPattern(fullPropertyPath, 'rotation.y') ||
    isFullOrEndingPattern(fullPropertyPath, 'rotation.z') ||
    (target instanceof Euler &&
      (fullPropertyPath === 'x' || fullPropertyPath === 'y' || fullPropertyPath === 'z'))
  ) {
    return degrees
  }

  if (isFullOrEndingPattern(fullPropertyPath, 'intensity')) return normalized

  if (isFullOrEndingPattern(fullPropertyPath, 'r')) return normalized
  if (isFullOrEndingPattern(fullPropertyPath, 'g')) return normalized
  if (isFullOrEndingPattern(fullPropertyPath, 'b')) return normalized

  if (isFullOrEndingPattern(fullPropertyPath, 'opacity')) return normalized
  if (isFullOrEndingPattern(fullPropertyPath, 'roughness')) return normalized
  if (isFullOrEndingPattern(fullPropertyPath, 'metalness')) return normalized

  if (isFullOrEndingPattern(fullPropertyPath, 'side')) return side

  return generic
}
