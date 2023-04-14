import type { IProject, ISheet, ISheetObject } from '@theatre/core'
import type { IStudio } from '@theatre/studio'
import { currentWritable } from '@threlte/core'

export const globalProjects = new Map<string, IProject>()
export const globalSheets = new Map<string, ISheet>()
export const globalObjects = new Map<string, ISheetObject>()

export const globalStudio = currentWritable<IStudio | undefined>(undefined)
