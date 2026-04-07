const HmrIgnoredModuleTimeouts = new Map<string, ReturnType<typeof setTimeout>>()
const HmrIgnoredModuleIds = new Set<string>()

const cancelModuleHmrAvailability = (moduleId: string) => {
  const timneout = HmrIgnoredModuleTimeouts.get(moduleId)
  if (timneout) {
    clearTimeout(timneout)
    HmrIgnoredModuleTimeouts.delete(moduleId)
  }
}

export const disableModuleHmr = (moduleId: string) => {
  cancelModuleHmrAvailability(moduleId)
  HmrIgnoredModuleIds.add(moduleId)
}

export const scheduleModuleHmrAvailability = (moduleId: string) => {
  if (!HmrIgnoredModuleIds.has(moduleId)) return
  cancelModuleHmrAvailability(moduleId)
  HmrIgnoredModuleTimeouts.set(
    moduleId,
    setTimeout(() => {
      HmrIgnoredModuleIds.delete(moduleId)
      HmrIgnoredModuleTimeouts.delete(moduleId)
    }, 500)
  )
  return []
}
