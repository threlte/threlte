import type { ClassParser } from '../lib/props.js'

/**
 * This function is a type helper for creating a class parser. A class parser is
 * a function that takes a class name and returns a NodeProps object. This can
 * be used to create Tailwind-like class names that resolve to yoga-layout
 * props.
 */
export const createClassParser = (callback: ClassParser) => {
  return callback
}
