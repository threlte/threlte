/* eslint-disable @typescript-eslint/no-empty-object-type */

import type { Component } from 'svelte'
import * as THREE from 'three'
import TComp from './T.svelte'
import type { Props } from './types'
import { setIs } from './utils/useIs'

// ========== 🧠 Type Safety Infrastructure ==========

/**
 * Users can augment this interface to declare custom classes.
 * @example
 * declare global {
 *   namespace Threlte {
 *     interface UserCatalogue {
 *       OrbitControls: typeof OrbitControls
 *     }
 *   }
 * }
 */
declare global {
  namespace Threlte {
    interface UserCatalogue {}
  }
}

type ThreeCatalogue = {
  [K in keyof typeof THREE]: (typeof THREE)[K]
}

type ExtendedCatalogue = ThreeCatalogue & Threlte.UserCatalogue

type TComponentProxy = {
  [K in keyof ExtendedCatalogue]: Component<Props<ExtendedCatalogue[K]>, {}, 'ref'>
}

const catalogue: Partial<Threlte.UserCatalogue> = {}

export function extend<const T extends Partial<Threlte.UserCatalogue>>(extensions: T): void {
  Object.assign(catalogue, extensions)
}

export const T = new Proxy(TComp, {
  get(_target, is: string) {
    const module = catalogue[is] || (THREE as any)[is]

    if (!module) {
      throw new Error(`No Three.js module found for "${is}". Did you forget to call extend()?`)
    }

    setIs(module)
    return TComp
  }
}) as typeof TComp & TComponentProxy
