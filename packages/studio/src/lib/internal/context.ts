import { currentWritable, type CurrentWritable } from '@threlte/core'
import { getContext, setContext } from 'svelte'
import type { ThemeUtils } from 'svelte-tweakpane-ui'
import { writable, type Writable } from 'svelte/store'
import { Object3D } from 'three'
import { persisted } from './persisted'

const internalKey = Symbol('three-inspect-internal-context')
const publicKey = Symbol('three-inspect-context')

export type SelectedObject =
  | THREE.Scene
  | THREE.Light
  | THREE.PerspectiveCamera
  | THREE.OrthographicCamera

export type DefaultPane = 'Toolbar' | 'SceneGraph' | 'Inspector'
export type OptionalPane = 'Console' | 'Monitor'

export interface StudioSettings {
  enabled: boolean
  keyboard: {
    enabled: boolean
  }
}

export interface ToolSettings {
  space: 'local' | 'world'
  snapping: {
    enabled: boolean
    translation: {
      step: number
    }
    rotation: {
      step: number
    }
    scale: {
      step: number
    }
  }
  transformControls: {
    enabled: boolean
    mode: 'translate' | 'rotate' | 'scale'
    inUse: boolean
  }
  freeCamera: {
    enabled: boolean
  }
}

export interface GizmoSettings {
  viewportGizmo: {
    visible: boolean
  }
  grid: {
    visible: boolean
    color: string
    units: number
    plane: 'xz' | 'xy' | 'zy'
  }
  axes: {
    visible: boolean
  }
  helpers: {
    visible: boolean
  }
}

export interface ViewSettings {
  mode: 'rendered' | 'wireframe' | 'solid'
}

export interface Transaction {
  id: string
  time: number
  fileId: string
  componentIndex: number
  attributeName: string
  attributeValue: unknown
  path?: string[]
}

export interface SyncSettings {
  enabled: boolean
  mode: 'manual' | 'auto'
}

export interface Sync {
  transactions: Writable<Transaction[]>
  addTransaction: (t: Omit<Transaction, 'id' | 'time'>) => void
  staleTransactions: CurrentWritable<Transaction[]>
}

interface InternalContext {
  defaultCamera: CurrentWritable<THREE.Camera | undefined>
  usingRaycast: CurrentWritable<boolean>
  selectedObject: CurrentWritable<SelectedObject | undefined>
  studioObjects: CurrentWritable<Set<Object3D>>
  optionalPanes: Writable<Record<OptionalPane, boolean>>
  gizmoSettings: Writable<GizmoSettings>
  studioSettings: Writable<StudioSettings>
  toolSettings: Writable<ToolSettings>
  syncSettings: Writable<SyncSettings>
  viewSettings: Writable<ViewSettings>
  sync: Sync
}

interface PublicContext {
  position: Writable<'inline' | 'draggable'>
  theme: Writable<keyof typeof ThemeUtils.presets>
}

interface SetPublicContextOptions {
  position?: 'inline' | 'draggable'
  theme?: keyof typeof ThemeUtils.presets
}

export const setInternalContext = () => {
  const context: InternalContext = {
    defaultCamera: currentWritable(undefined),
    usingRaycast: currentWritable(false),
    selectedObject: currentWritable<SelectedObject | undefined>(undefined),
    studioObjects: currentWritable(new Set()),
    optionalPanes: persisted('internalContext.optionalPanes', {
      Console: false,
      Monitor: false,
    }),
    gizmoSettings: persisted('internalContext.gizmoSettings', {
      viewportGizmo: {
        visible: true,
      },
      grid: {
        visible: true,
        color: '#5f5f5f',
        units: 1,
        plane: 'xz',
      },
      axes: {
        visible: true,
      },
      helpers: {
        visible: true,
      },
    }),
    toolSettings: persisted('internalContext.toolSettings', {
      transformControls: {
        mode: 'translate',
        enabled: true,
        inUse: false,
      },
      freeCamera: {
        enabled: true,
      },
      snapping: {
        enabled: false,
        translation: {
          step: 0.1,
        },
        rotation: {
          step: 15,
        },
        scale: {
          step: 0.1,
        },
      },
      space: 'local',
    }),
    viewSettings: persisted('internalContext.viewSettings', {
      mode: 'rendered',
    }),
    studioSettings: persisted('internalContext.studioSettings', {
      enabled: true,
      keyboard: {
        enabled: true,
      },
    }),
    syncSettings: persisted('internalContext.syncSettings', {
      enabled: true,
      mode: 'auto',
      saving: false,
      transactions: [],
    }),
    sync: {
      transactions: persisted('internalContext.sync.transactions', []),
      addTransaction(t) {
        const time = Date.now()
        this.transactions.update((ts) => {
          // dedupe
          let deleteTransactionsIndicees: number[] = []
          for (let i = ts.length - 1; i >= 0; i -= 1) {
            const t2 = ts[i]
            const paths = (t.path ?? []).join('.')
            const paths2 = (t2.path ?? []).join('.')
            if (
              t.fileId === t2.fileId &&
              t.componentIndex === t2.componentIndex &&
              t.attributeName === t2.attributeName &&
              paths === paths2 &&
              time > t2.time
            ) {
              deleteTransactionsIndicees.push(i)
            }
          }
          // make unique
          deleteTransactionsIndicees = [...new Set(deleteTransactionsIndicees)]
          // sort in descending order
          deleteTransactionsIndicees.sort((a, b) => b - a)
          deleteTransactionsIndicees.forEach((i) => {
            ts.splice(i, 1)
          })
          // add new transaction
          ts.push({
            id: Math.random().toString(36).slice(2, 9),
            time,
            ...t,
          })
          return ts
        })
      },
      staleTransactions: currentWritable([]),
    },
  }

  // we don't want to persist this
  context.toolSettings.update((toolSettings) => {
    toolSettings.transformControls.inUse = false
    return toolSettings
  })

  setContext<InternalContext>(internalKey, context)
}

export const setPublicContext = (options: SetPublicContextOptions) => {
  setContext<PublicContext>(publicKey, {
    position: writable(options.position ?? 'inline'),
    theme: writable(options.theme ?? 'standard'),
  })
}

export const getInternalContext = () => {
  return getContext<InternalContext>(internalKey)
}

export const useInspector = () => {
  return getContext<PublicContext>(publicKey)
}
