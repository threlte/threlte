import { writable } from 'svelte/store'
import type { IClippyHistoryMetaEntry } from './clippyHistory'

const clippyStatus = writable()
const clippyRect = writable<HTMLElement | undefined>()
const clippyRectEl = writable<HTMLElement | undefined>()
const clippyDialogueRect = writable<HTMLElement | undefined>()

const clippyHistory = writable<IClippyHistoryMetaEntry[]>([])

export const clippyStores = {
  clippyStatus,
  clippyRect,
  clippyHistory,
  clippyRectEl,
  clippyDialogueRect
}
