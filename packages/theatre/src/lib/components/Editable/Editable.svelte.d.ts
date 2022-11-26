import { SvelteComponentTyped } from 'svelte'
type Props = import('./types').AllProps
type Slots = import('./types').Slots

export default class Editable extends SvelteComponentTyped<Props, Record<string, unknown>, Slots> {}
export {}
