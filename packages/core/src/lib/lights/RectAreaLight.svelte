<script lang="ts">
    import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib'
    import {RectAreaLight as ThreeRectAreaLight} from 'three'
		import { useThrelte } from '../hooks/useThrelte'
		import LightInstance from '../instances/LightInstance.svelte'
		import type { RectAreaLightProperties } from '../types/components'

    export let position: RectAreaLightProperties['position'] = undefined
    export let scale: RectAreaLightProperties['scale'] = undefined
    export let rotation: RectAreaLightProperties['rotation'] = undefined
    export let lookAt: RectAreaLightProperties['lookAt'] = undefined
    export let viewportAware: RectAreaLightProperties['viewportAware'] = false
    export let inViewport: RectAreaLightProperties['inViewport'] = false
    export let frustumCulled: RectAreaLightProperties['frustumCulled'] = undefined
    export let renderOrder: RectAreaLightProperties['renderOrder'] = undefined
    export let visible: RectAreaLightProperties['visible'] = undefined
    export let userData: RectAreaLightProperties['userData'] = undefined
    export let dispose: RectAreaLightProperties['dispose'] = undefined
    export let intensity: RectAreaLightProperties['intensity'] = undefined
    export let color: RectAreaLightProperties['color'] = undefined
    export let width: RectAreaLightProperties['width'] = undefined
    export let height: RectAreaLightProperties['height'] = undefined
    export let power: RectAreaLightProperties['power'] = undefined

    export const light = new ThreeRectAreaLight(color, intensity, width, height)

    const {invalidate} = useThrelte()
		RectAreaLightUniformsLib.init()

    $: {
        if (width !== undefined) light.width = width
        if (height !== undefined) light.height = height
        if (power !== undefined) light.power = power
        invalidate('RectAreaLight: props changed')
    }
</script>

<LightInstance
        {light}
        {lookAt}
        {position}
        {scale}
        {rotation}
        {frustumCulled}
        {renderOrder}
        {visible}
        {userData}
        {dispose}
        {viewportAware}
        bind:inViewport
        on:viewportenter
        on:viewportleave
        {color}
        {intensity}
>
    <slot/>
</LightInstance>
