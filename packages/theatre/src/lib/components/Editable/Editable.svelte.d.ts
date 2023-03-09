import { SvelteComponentTyped } from 'svelte'

export default class Editable<T> extends SvelteComponentTyped<
  import('./types').Props<T>,
  import('./types').Events<T>,
  import('./types').Slots<T>
> {}
