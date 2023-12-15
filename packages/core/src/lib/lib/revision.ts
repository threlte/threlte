import { REVISION } from 'three'

// REVISION can be '{number}' or '{number}dev'
const normalizedRevision = REVISION.replace('dev', '')

/**
 * The current Three.js revision.
 */
export const revision = Number.parseInt(normalizedRevision)
