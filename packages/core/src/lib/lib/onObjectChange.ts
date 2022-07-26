/**
 * Callback to object changes.
 *
 * ### Example
 *
 * ```ts
 * const set = onObjectChange(object, (newObject, oldObject) => {
 *   console.log(newObject, oldObject)
 * })
 * set(sameObject) // will not trigger callback
 * set(otherObject) // will trigger callback
 * ```
 *
 * @param object
 * @returns store
 */
export function onObjectChange<T extends { uuid: string } | undefined>(
  object: T,
  onChange?: (newObject: T, oldObject: T) => void
): (object: T) => void
export function onObjectChange<T extends { uuid: string }>(
  object: T,
  onChange?: (newObject: T, oldObject: T) => void
): (object: T) => void
export function onObjectChange<T extends { uuid: string } | undefined>(
  object: T,
  onChange?: (newObject: T, oldObject: T) => void
): (object: T) => void {
  let currentObject = object

  const set = (newObject: T) => {
    if (currentObject === undefined && newObject === undefined) return
    if (newObject?.uuid === currentObject?.uuid) return
    onChange?.(newObject, currentObject)
    currentObject = newObject
  }

  return set
}
