export const events: Record<string, ((event: any) => void)[]> = {}

export const on = <Type>(name: string, cb: (event: Type) => void): void => {
  const fns = events[name]

  if (fns === undefined) {
    events[name] = [cb]
    return
  }

  fns.push(cb)
}

export const off = <Type>(name: string, cb: (event: Type) => void): void => {
  const arr = events[name]

  if (arr === undefined) return

  arr.splice(arr.indexOf(cb), 1)

  if (arr.length === 0) delete events[name]
}

export const fire = <Type>(name: string, payload: Type): void => {
  const fns = events[name]

  if (fns === undefined) return

  fns.forEach((fn) => fn(payload))
}
