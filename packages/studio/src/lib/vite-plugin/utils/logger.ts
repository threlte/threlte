import colors from 'kleur'

export enum Context {
  ErrorTransformingStaticState = 'Error transforming static state',
  ErrorCompilingComponent = 'Error compiling component',
  NoTComponentFound = 'No <T> component found'
}

const parseErrorMessage = (error: any): string | undefined => {
  try {
    return 'message' in error && typeof error.message === 'string'
      ? error.message
      : error.toString()
  } catch {
    return undefined
  }
}

export const logError = (options: {
  moduleId?: string
  context: Context | string
  error?: any
}) => {
  const { moduleId, context, error } = options
  let log = `Threlte Studio: ${context}`
  if (error) {
    log += `: ${parseErrorMessage(error)}`
  }
  if (moduleId) {
    log += `, module id: ${moduleId}`
  }
  console.warn(colors.red(log))
}
