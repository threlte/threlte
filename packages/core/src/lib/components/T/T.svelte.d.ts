/* eslint-disable @typescript-eslint/ban-types */

/**
 * This file is a copy of the compiled d.ts file. It needs to be updated
 * manually to export the $$IsomorphicComponent interface for Typescript to be
 * able to do `typeof T`.
 *
 * TODO: At some point we need to get rid of this!
 */

/// <reference types="svelte" />
import type { TProps } from './types'
declare class __sveltets_Render<Type> {
  props(): TProps<Type>
  events(): {}
  slots(): {}
  bindings(): 'ref'
  exports(): {}
}
export interface $$IsomorphicComponent {
  new <Type>(
    options: import('svelte').ComponentConstructorOptions<
      ReturnType<__sveltets_Render<Type>['props']>
    >
  ): import('svelte').SvelteComponent<
    ReturnType<__sveltets_Render<Type>['props']>,
    ReturnType<__sveltets_Render<Type>['events']>,
    ReturnType<__sveltets_Render<Type>['slots']>
  > & {
    $$bindings?: ReturnType<__sveltets_Render<Type>['bindings']>
  } & ReturnType<__sveltets_Render<Type>['exports']>
  <Type>(
    internal: unknown,
    props: ReturnType<__sveltets_Render<Type>['props']> & {}
  ): ReturnType<__sveltets_Render<Type>['exports']>
  z_$$bindings?: ReturnType<__sveltets_Render<any>['bindings']>
}
declare const T: $$IsomorphicComponent
type T<Type> = InstanceType<typeof T<Type>>
export default T
