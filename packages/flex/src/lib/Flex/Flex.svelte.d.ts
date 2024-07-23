import { SvelteComponent } from 'svelte'
import type { ComponentProps } from 'svelte'
import type InnerFlex from './InnerFlex.svelte'

type FlexProps = Omit<ComponentProps<InnerFlex>, 'yoga'>

export default class Flex extends SvelteComponent<FlexProps> {}
