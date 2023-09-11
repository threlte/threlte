class LogEntry {
  public value: any
  public changed = false
  constructor(value: any) {
    this.value = value
  }

  setValue(value: any) {
    this.changed = this.value !== value
    this.value = value
  }
}

const entries: Map<string, LogEntry> = new Map()

type LogTableOptions = {
  show: 'all' | 'changed' | 'changed and initial'
}

export const logTable = (obj: Record<string, any>, options?: LogTableOptions) => {
  const currentLogEntries: Map<string, LogEntry> = new Map()

  Object.entries(obj).forEach(([key, value]) => {
    const entry = entries.get(key)

    if (!entry) {
      const newEntry = new LogEntry(value)
      entries.set(key, newEntry)

      switch (options?.show) {
        case 'all':
          currentLogEntries.set(key, newEntry)
          break
        case 'changed':
          break
        case 'changed and initial':
          currentLogEntries.set(key, newEntry)
          break
        default:
          currentLogEntries.set(key, newEntry)
          break
      }
    } else {
      entry.setValue(value)
      const s = options?.show ?? 'all'
      switch (s) {
        case 'all':
          currentLogEntries.set(key, entry)
          break
        case 'changed':
          if (entry.changed) currentLogEntries.set(key, entry)
          break
        case 'changed and initial':
          if (entry.changed) currentLogEntries.set(key, entry)
          break
        default:
          break
      }
    }
  })

  const logObj = Object.fromEntries(currentLogEntries)
  if (Object.keys(logObj).length < 1) {
    return
  }
  console.table(
    logObj,
    options?.show === 'changed' || options?.show === 'changed and initial'
      ? ['value', 'changed']
      : ['value', 'changed']
  )
}
