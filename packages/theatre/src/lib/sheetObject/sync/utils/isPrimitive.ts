import type { Primitive } from 'type-fest'

export const isPrimitive = (value: any): value is Primitive => {
  return (
    value === null ||
    typeof value === 'string' ||
    typeof value === 'number' ||
    typeof value === 'boolean'
  )
}
