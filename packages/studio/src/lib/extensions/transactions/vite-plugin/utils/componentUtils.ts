import MagicString from 'magic-string'
import { isMagicString } from './magicStringUtils'

/**
 * The process of modifying a Svelte component markup is as follows:
 * - dissassemble the component:
 *   - find the script, script module, and style and replace them with dummy
 *     values as the script and style blocks may contain code that must be
 *     preprocessed
 *   - do work on the markup
 *   - assemble the component back together
 */

const dummyScript = '<script>"ABC"</script>'
const dummyScriptModule = '<script context="module">"ABC"</script>'
const dummyStyle = '<style></style>'

/**
 * Disassembles a Svelte component into its parts: markup, script, script module,
 * and style. The script and style blocks are replaced with dummy values.
 */
export const disassembleComponent = (code: string) => {
  // to parse the markup, we first need to remove the script and the style blocks
  const scriptRegex = /<script(?![^>]*context="module")[^>]*>[\s\S]*?<\/script>/gu
  const scriptModuleRegex = /<script[^>]*context="module"[^>]*>[\S\s]*?<\/script>/gu
  const styleRegex = /<style[^>]*>[\S\s]*?<\/style>/gu
  const scriptMatch = code.match(scriptRegex)
  const scriptModuleMatch = code.match(scriptModuleRegex)
  const styleMatch = code.match(styleRegex)
  const hasScript = Boolean(scriptMatch)
  const hasScriptModule = Boolean(scriptModuleMatch)
  const hasStyle = Boolean(styleMatch)

  let markup = code

  if (hasScriptModule) {
    markup = markup.replaceAll(scriptModuleRegex, dummyScriptModule)
  }
  if (hasScript) {
    markup = markup.replaceAll(scriptRegex, dummyScript)
  }
  if (hasStyle) {
    markup = markup.replaceAll(styleRegex, dummyStyle)
  }

  return {
    markup,
    scriptModule: hasScriptModule ? scriptModuleMatch![0] : undefined,
    script: hasScript ? scriptMatch![0] : undefined,
    style: hasStyle ? styleMatch![0] : undefined,
  }
}

/**
 * Assembles a Svelte component from its parts: markup, script, script module,
 * and style. The script and style blocks are replaced with the original values.
 * This is the reverse of `disassembleComponent`.
 */
export const assembleComponent = (
  markup: MagicString,
  script: string | undefined,
  scriptModule: string | undefined,
  style: string | undefined,
) => {
  let component = isMagicString(markup) ? markup.toString() : markup
  if (scriptModule) {
    component = component.replace(dummyScriptModule, scriptModule)
  }
  if (script) {
    component = component.replace(dummyScript, script)
  }
  if (style) {
    component = component.replace(dummyStyle, style)
  }
  return component
}
