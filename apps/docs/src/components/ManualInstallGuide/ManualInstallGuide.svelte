<script lang="ts">
import CopyCodeButton from './CopyCodeButton.svelte'
import InstallButton from './InstallButton.svelte'
import { URLs } from '../URLs'
import { onMount } from 'svelte'

let useGltf = $state(false)
let installExtras = $state(false)
let installRapier = $state(false)
let installTheatre = $state(false)
let installXR = $state(false)
let installFlex = $state(false)
let installTypes = $state(false)

let divider = ' \\'
let merger = '\n'
let space = '            '

const useDivider = (...args: boolean[]) => {
	return args.some(Boolean) ? divider : ''
}

let tag = '@next'

let coreDivider = $derived(
	useDivider(
		installExtras,
		useGltf,
		installRapier,
		installTheatre,
		installXR,
		installFlex,
		installTypes
	)
)

let extrasDivider = $derived(
	useDivider(installRapier, installTheatre, installXR, installFlex, installTypes)
)
let rapierDivider = $derived(useDivider(installTheatre, installXR, installFlex, installTypes))
let theatreDivider = $derived(useDivider(installXR, installFlex, installTypes))
let xrDivider = $derived(useDivider(installFlex, installTypes))
let flexDivider = $derived(useDivider(installTypes))

let installCode = $derived(
	[
		`npm install three @threlte/core${tag}${coreDivider}`,
		(installExtras || useGltf || installTheatre) && `${space}@threlte/extras${tag}${extrasDivider}`,
		installRapier && `${space}@threlte/rapier${tag} @dimforge/rapier3d-compat${rapierDivider}`,
		installTheatre &&
			`${space}@threlte/theatre${tag} @theatre/core @theatre/studio${theatreDivider}`,
		installXR && `${space}@threlte/xr${tag}${xrDivider}`,
		installFlex && `${space}@threlte/flex${tag}${flexDivider}`,
		installTypes && `${space}@types/three`
	]
		.filter(Boolean)
		.join(merger)
)

onMount(() => {
	if (window.navigator.userAgent.includes('Windows')) {
		divider = ' '
		merger = ''
		space = ''
	}
})
</script>

<div
	class="mt-6 grid grid-cols-1 items-start justify-start gap-x-4 gap-y-2 max-md:justify-items-start md:grid-cols-[auto_auto] md:gap-y-2"
>
	<InstallButton disabled active class="cursor-not-allowed">@threlte/core</InstallButton>

	<p class="my-0 self-center text-sm md:text-base">
		Compose Three.js scenes in a declarative and state-driven way. Three.js is required as a peer
		dependency.
	</p>

	<hr class="m-0 w-full p-0 opacity-50 max-md:my-3 md:col-span-2" />

	<InstallButton
		onclick={() => {
			console.log("hello extras");
      installExtras = !installExtras
    }}
		active={installExtras}
		passivelyActive={useGltf || installTheatre}>@threlte/extras</InstallButton
	>

	<p class="my-0 self-center text-sm md:text-base">
		<a href={URLs.docs.extras} target="_blank">Components, helpers, hooks</a>
		and more that extend the core functionality.
	</p>

	<hr class="m-0 w-full p-0 opacity-50 max-md:my-3 md:col-span-2" />

	<InstallButton onclick={() => {
      useGltf = !useGltf
    }} active={useGltf}
		>@threlte/gltf</InstallButton
	>

	<p class="my-0 self-center text-sm md:text-base">
		A <a href={URLs.docs.gltf} target="_blank">command-line tool</a>
		that turns GLTF assets into declarative and re-usable Threlte components. The generated Threlte components
		make use of the package <code>@threlte/extras</code>.
	</p>

	<hr class="m-0 w-full p-0 opacity-50 max-md:my-3 md:col-span-2" />

	<InstallButton onclick={() => {
      installRapier = !installRapier
    }} active={installRapier}
		>@threlte/rapier</InstallButton
	>

	<p class="my-0 self-center text-sm md:text-base">
		Components and hooks to use the <a href="https://rapier.rs/" target="_blank" rel="noreferrer"
			>Rapier physics engine</a
		> in Threlte.
	</p>

	<hr class="m-0 w-full p-0 opacity-50 max-md:my-3 md:col-span-2" />

	<InstallButton
		onclick={() => {
      installTheatre = !installTheatre
    }}
		active={installTheatre}>@threlte/theatre</InstallButton
	>

	<p class="my-0 self-center text-sm md:text-base">
		Components and hooks to use the animation library <a
			href="https://www.theatrejs.com/"
			target="_blank"
			rel="noreferrer">Theatre.js</a
		> in Threlte.
	</p>

	<hr class="m-0 w-full p-0 opacity-50 max-md:my-3 md:col-span-2" />

	<InstallButton onclick={() => {
      installXR = !installXR
    }} active={installXR}
		>@threlte/xr</InstallButton
	>

	<p class="my-0 self-center text-sm md:text-base">Components and hooks for VR and AR.</p>

	<hr class="m-0 w-full p-0 opacity-50 max-md:my-3 md:col-span-2" />

	<InstallButton onclick={() => {
      installFlex = !installFlex
    }} active={installFlex}
		>@threlte/flex</InstallButton
	>

	<p class="my-0 self-center text-sm md:text-base">
		Components and hooks to use the flex engine <a
			href="https://yogalayout.com/"
			target="_blank"
			rel="noreferrer">Yoga</a
		> in Threlte.
	</p>

	<hr class="m-0 w-full p-0 opacity-50 max-md:my-3 md:col-span-2" />

	<InstallButton onclick={() => {
      installTypes = !installTypes
    }} active={installTypes}
		>@types/three</InstallButton
	>

	<p class="my-0 self-center text-sm md:text-base">TypeScript types for Three.js.</p>
</div>

<p>Install the packages with npm, pnpm, yarn or any other package manager you prefer.</p>

<div
	class="not-prose group relative overflow-x-auto whitespace-pre-wrap rounded-md border border-white/20 bg-blue-900 p-3 text-sm shadow-xl [&>*]:!bg-transparent"
>
	<code class="p-0 text-[1em]">
		{installCode}
	</code>

	<CopyCodeButton code={installCode} />
</div>
