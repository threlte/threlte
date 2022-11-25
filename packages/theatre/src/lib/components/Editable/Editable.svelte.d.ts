import { SvelteComponentTyped } from 'svelte'
type Props = import('./props').AllProps
export default class Editable extends SvelteComponentTyped<
  Props,
  Record<string, unknown>,
  Record<string, unknown>
> {}
export {}
