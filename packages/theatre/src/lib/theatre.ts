import * as theatreCore from '@theatre/core'

export const { getProject, types, onChange, val } =
  typeof window !== 'undefined' ? theatreCore : ((theatreCore as any).default as typeof theatreCore)
