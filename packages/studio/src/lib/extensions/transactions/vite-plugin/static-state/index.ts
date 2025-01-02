const allowedExtensions = ['.svelte', '.ts', '.js', '.svelte.ts', '.svelte.js']
const isAllowedExtension = (id: string) => {
  return allowedExtensions.some((ext) => id.endsWith(ext))
}

const hasStaticState = (code: string) => {
  return code.includes('class') && code.includes('extends StudioState')
}

const regex = /extends StudioState[^\{]*{/gm

const appendMeta = (code: string, id: string) => {
  // add meta info to the code: id
  return code.replace(regex, `$& meta = '${id}'`)
}

export const transformStaticState = (code: string, id: string) => {
  if (!isAllowedExtension(id)) return code
  if (!hasStaticState(code)) return code

  return appendMeta(code, id)
}
