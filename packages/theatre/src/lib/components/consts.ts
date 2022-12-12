import type { IProject, ISheet, ISheetObject } from '@theatre/core'
import type { IStudio } from '@theatre/studio'
import { writable } from 'svelte/store'

export const globalProjects = new Map<string, IProject>()
export const globalSheets = new Map<string, ISheet>()
export const globalObjects = new Map<string, ISheetObject>()

export const globalStudio = writable<IStudio | undefined>(undefined)
