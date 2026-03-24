import type { StudioProps } from '../types.js'

export const getThrelteStudioUserData = (object: any): StudioProps | undefined => {
  return object?.userData?.threlteStudio as StudioProps | undefined
}
