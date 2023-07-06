export const events: Record<string, ((event: any) => void)[]> = {}

export const on = <Type>(name: string, cb: (event: Type) => void) => {
  if (events.name === undefined) {
    events[name] = [cb]
  } else {
    events[name]!.push(cb)
  }
}

export const off = <Type>(name: string, cb: (event: Type) => void) => {
  const arr = events[name]

  if (arr === undefined) return

  arr.splice(arr.indexOf(cb), 1)

  if (arr.length === 0) delete events[name]
}

export const fire = <Type>(name: string, payload: Type) => {
  const arr  = events[name]

  if (arr === undefined) return

  for (let i = 0, l = arr.length; i < l; i += 1) {
    arr[i]!(payload)
  }
}
