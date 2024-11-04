import { currentWritable } from '@threlte/core'
import type { BufferGeometry } from 'three'

export const debug = currentWritable(false)

export const cubeGeometry = currentWritable<BufferGeometry | undefined>(undefined)
