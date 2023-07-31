import { getContext } from 'svelte'
import type { Writable } from 'svelte/store'

type CarContext = {
	speed: Writable<number>
}

export const useCar = () => {
	return getContext<CarContext>('threlte-car-context')
}
