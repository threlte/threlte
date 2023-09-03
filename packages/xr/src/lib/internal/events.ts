type Callback<T = any, O = any> = (event: T, metadata?: O) => void

const events: Record<string, Callback[]> = {}

export const on = <T, O = any>(name: string, cb: Callback<T, O>): () => void => {
  const fns = events[name]

  if (fns === undefined) {
    events[name] = [cb]
  } else {
    fns.push(cb)
  }

  return () => off(name, cb)
}

export const off = <T>(name: string, cb: Callback<T>): void => {
  const arr = events[name]

  if (arr === undefined) return

  arr.splice(arr.indexOf(cb), 1)

  if (arr.length === 0) delete events[name]
}

export const fire = <T, O = any>(name: string, payload: T, metadata?: O): void => {
  const fns = events[name]

  if (fns === undefined) return

  for (const fn of fns) fn(payload, metadata)
}
