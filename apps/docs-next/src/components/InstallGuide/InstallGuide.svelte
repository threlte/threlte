<script lang="ts">
  import { c } from '../../lib/classes'
  import CopyCodeButton from '../Code/CopyCodeButton.svelte'
  import InstallButton from './InstallButton.svelte'

  let installExtras = false
  let installRapier = false
  let installTheatre = false
  let installTypes = false

  $: installCode = [
    `npm install three @threlte/core${
      installExtras || installRapier || installTheatre || installTypes ? ' \\' : ''
    }`,
    installExtras &&
      `            @threlte/extras${installRapier || installTheatre || installTypes ? ' \\' : ''}`,
    installRapier &&
      `            @threlte/rapier @dimforge/rapier3d-compat${
        installTypes || installTheatre ? ' \\' : ''
      }`,
    installTheatre &&
      `            @threlte/theatre @theatre/core @theatre/studio${installTypes ? ' \\' : ''}`,
    installTypes && '            @types/three'
  ]
    .filter(Boolean)
    .join('\n')
</script>

<InstallButton
  disabled
  active
  class="cursor-not-allowed">@threlte/core</InstallButton
>

<p class="mt-1">
  Compose three.js scenes declaratively and state-driven. Three.js and Threlte's core the library
  are required.
</p>

<InstallButton
  on:click={() => {
    installExtras = !installExtras
  }}
  active={installExtras}>@threlte/extras</InstallButton
>

<p class="mt-1">Components, helpers, hooks and more that extend the core functionality.</p>

<InstallButton
  on:click={() => {
    installRapier = !installRapier
  }}
  active={installRapier}>@threlte/rapier</InstallButton
>

<p class="mt-1">Components and hooks to use the Rapier physics engine in Threlte.</p>

<InstallButton
  on:click={() => {
    installTheatre = !installTheatre
  }}
  active={installTheatre}>@threlte/theatre</InstallButton
>

<p class="mt-1">Components and hooks to use the animation library Theatre.js in Threlte.</p>

<InstallButton
  on:click={() => {
    installTypes = !installTypes
  }}
  active={installTypes}>@types/three</InstallButton
>

<p class="mt-1">TypeScript types for three.js.</p>

<p>Install the packages with npm, pnpm, yarn or any other package manager you prefer.</p>

<div
  class="relative not-prose group overflow-x-auto rounded-md border border-white/20 bg-blue-900 text-sm shadow-xl [&>*]:!bg-transparent p-3 whitespace-pre-wrap"
>
  <code class="text-[1em] p-0">
    {installCode}
  </code>

  <CopyCodeButton code={installCode} />
</div>
