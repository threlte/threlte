export type ExtensionState = Record<string, unknown>

export type ExtensionAction<State extends ExtensionState> = (
  params: {
    state: State
  },
  ...args: any[]
) => Promise<void> | void

export type ExtensionActions<State extends ExtensionState> = Record<string, ExtensionAction<State>>
