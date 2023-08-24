<script lang="ts">
	import { T, useFrame } from '@threlte/core'
	import {
	  BufferAttribute, BufferGeometry, Color, Points, ShaderMaterial, Vector2,
	  Vector3,
	  Vector4, type ColorRepresentation
	} from 'three'
	import { randFloatSpread } from 'three/src/math/MathUtils'
	import { SparkleShader } from './Shader'
	import type { SparklesProps } from './Sparkles.svelte'

	export let count: SparklesProps['count'] = 100;
	export let speed: SparklesProps['speed'] = 1;
	export let opacity: SparklesProps['opacity'] = 1;
	export let color: SparklesProps['color'] = 100;
	export let size: SparklesProps['size']= Math.random();
	export let scale: SparklesProps['scale'] = 1;
	export let noise: SparklesProps['noise'] = 1;

	const isVector = (v: any): v is Vector2 | Vector3 | Vector4 =>
		v instanceof Vector2 || v instanceof Vector3 || v instanceof Vector4;

	const isFloat32Array = (def: any): def is Float32Array =>
		def && (def as Float32Array).constructor === Float32Array;

	const normalizeVector = (v: any): number[] => {
		if (Array.isArray(v)) return v;
		else if (isVector(v)) return v.toArray();
		return [v, v, v] as number[];
	};

	const expandColor = (v: Color) => [v.r, v.g, v.b];

	const positions = Float32Array.from(
		Array.from({ length: count }, () => normalizeVector(scale).map(randFloatSpread)).flat()
	);

	const usePropAsIsOrAsAttribute = <T extends any>(
		count: number,
		prop?: T | Float32Array,
		setDefault?: (v: T) => number
	) => {
		if (prop !== undefined) {
			if (isFloat32Array(prop)) {
				return prop as Float32Array;
			} else {
				if (prop instanceof Color) {
					const a = Array.from({ length: count * 3 }, () => expandColor(prop)).flat();
					return Float32Array.from(a);
				} else if (isVector(prop) || Array.isArray(prop)) {
					const a = Array.from({ length: count * 3 }, () => normalizeVector(prop)).flat();
					return Float32Array.from(a);
				}

				return Float32Array.from({ length: count }, () => prop as unknown as number);
			}
		}
		return Float32Array.from({ length: count }, setDefault!);
	};

	const geometry = new BufferGeometry()

	const setAttribute = (name: string, value: any, size: number) => {
  	geometry.setAttribute(name, new BufferAttribute(value, size))
	}

	$: setAttribute('position', positions, 3);
	$: setAttribute('size', usePropAsIsOrAsAttribute<number>(count, size, Math.random), 1)
	$: setAttribute('speed', usePropAsIsOrAsAttribute<number>(count, speed), 1);
	$: setAttribute('opacity', usePropAsIsOrAsAttribute<number>(count, opacity), 1)
	$: setAttribute('noise', usePropAsIsOrAsAttribute<typeof noise>(count * 3, noise), 3);
	$: setAttribute('color', usePropAsIsOrAsAttribute<ColorRepresentation>(
				color === undefined ? count * 3 : count,
				!isFloat32Array(color) ? new Color(color) : color,
				() => 1
			), 3)

	const material = new ShaderMaterial({
		uniforms: SparkleShader.uniforms,
		vertexShader: SparkleShader.vertextShader,
		fragmentShader: SparkleShader.fragmentShader,
		transparent: true,
		depthWrite: false,
	})

	useFrame((state) => (material.uniforms.time.value = state.clock.elapsedTime));

</script>

<T.Points
{material}
{geometry}
{...$$restProps}
let:ref
>
	<slot {ref} />
</T.Points>
