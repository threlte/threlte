import type { StudioProps } from './types'

export const getThrelteStudioUserData = (object: any): StudioProps | undefined => {
  return object.userData.threlteStudio as StudioProps
}
