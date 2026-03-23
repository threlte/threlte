export const helpersScope = 'helpers'

export type HelpersState = {
  enabled: boolean
}

export type HelpersActions = {
  toggleEnabled: () => void
  setEnabled: (enabled: boolean) => void
}
