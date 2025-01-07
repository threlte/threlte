import { preprocess } from 'svelte/compiler'

export const isModule = (attributes: Record<string, string | boolean>) => {
  if (attributes.module && typeof attributes.module === 'boolean') {
    return attributes.module
  } else if (attributes.context && attributes.context === 'module') {
    return true
  }
  return false
}

/**
 * Disassembles a Svelte component into its parts: markup, script, script module,
 * and style. The script and style blocks are replaced with dummy values.
 */
export const disassembleComponent = async (code: string) => {
  let script: string | undefined
  let scriptModule: string | undefined
  let style: string | undefined

  const disassembled = await preprocess(code, {
    script: ({ content, attributes }) => {
      if (isModule(attributes)) {
        scriptModule = content
      } else {
        script = content
      }
      return {
        code: '/* DUMMY SCRIPT */'
      }
    },
    style: ({ content }) => {
      style = content
      return {
        code: '/* DUMMY STYLE */'
      }
    }
  })

  const reassemble = async (newCode: string) => {
    const assembled = await preprocess(newCode, {
      script: ({ attributes }) => {
        if (isModule(attributes)) {
          return {
            code: scriptModule!
          }
        } else {
          return {
            code: script!
          }
        }
      },
      style: () => {
        return {
          code: style!
        }
      }
    })
    return assembled.code
  }

  return {
    markup: disassembled.code,
    reassemble
  }
}
