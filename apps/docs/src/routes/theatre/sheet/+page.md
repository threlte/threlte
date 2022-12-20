---
title: Sheet
---

!!!module_summary title=Sheet|sourcePath=components/Sheet/Sheet.svelte|name=Sheet|from=theatre|type=component|relatedDocs={[{name:"Theatre.js Sheet Docs",url:"https://www.theatrejs.com/docs/latest/api/core#sheet"}]}

Theatre.js sheets contain one or more Theatre.js objects (which can be created with [`<Editable>`](/theatre/editable) components), that can be animated together.

!!!

## Creating Sheets

You can create a sheet by placing the component `<Sheet>` as a child of a [`<Project>`](/theatre/project) component. If a sheet with the given name already exists, it will represent the existing sheet instead of creating a new one.

```svelte
<script>
	import { Project, Sheet, Editable } from '@threlte/theatre'
</script>

<Project>
	<!-- Will create a sheet with the name "Sheet A" -->
	<Sheet name="Sheet A">
		<Editable name="Editable A" />
	</Sheet>

	<!-- Will create a sheet with the name "Sheet B" -->
	<Sheet name="Sheet B">
		<Editable name="Editable A" />
	</Sheet>

	<!-- Will NOT create a sheet but reference "Sheet A" -->
	<Sheet name="Sheet A">
		<Editable name="Editable A" />
	</Sheet>
</Project>
```

## Playing a Sheet's animation

Each Theatre.js sheet has a sequence attached to it.

#### Binding to the Sequence

You can access a sheet's sequence by binding to the sheet or its sequence directly. You can then use the playback controls on the sequence to play back the animation.

```svelte
<script lang="ts">
	import { Sheet } from '@threlte/theatre'
	import type { ISequence } from '@theatre/core'

	let sequence: ISequence | undefined = undefined

	const runAnimation = () => {
		sequence?.play()
	}
</script>

<Sheet bind:sequence>
	<!-- … -->
</Sheet>
```

#### Using the property `autoPlay`

If you want your animation to play as soon as the Sheet is mounted or with a set delay, use the property `autoPlay`.

```svelte
<script lang="ts">
	import { Sheet } from '@threlte/theatre'
</script>

<!-- Plays immediately -->
<Sheet autoPlay>
	<!-- … -->
</Sheet>

<!-- Plays the sequence with a delay of 300ms -->
<Sheet autoPlay={{ delay: 300 }}>
	<!-- … -->
</Sheet>

<!-- Plays the sequence in reverse -->
<Sheet autoPlay={{ direction: 'reverse' }}>
	<!-- … -->
</Sheet>

<!-- Plays the sequence 3 times -->
<Sheet autoPlay={{ iterationCount: 3 }}>
	<!-- … -->
</Sheet>

<!-- Plays the sequence from second 1 to 3 -->
<Sheet autoPlay={{ range: [1, 3] }}>
	<!-- … -->
</Sheet>

<!-- Plays the sequence in half speed -->
<Sheet autoPlay={{ rate: 0.5 }}>
	<!-- … -->
</Sheet>
```

#### Using a Slot Prop

When using the sequence or sheet in a child component, a slot prop can come in handy.

```svelte
<script lang="ts">
	import { T, InteractiveObject } from '@threlte/core'
	import { Sheet, Editable } from '@threlte/theatre'
</script>

<Sheet let:play>
	<T.Mesh>
		<Editable name="Cube" transform controls />
		<InteractiveObject interactive on:click={play}>
		<T.BoxGeometry />
		<T.MeshStandardMaterial />
	</T.Mesh>
</Sheet>
```

## Playback Controls

#### autoReset

The underlying Theatre.js sheets are persisted even when unmounting a `<Sheet>` component. That's why the sequence of a sheet does not reset itself to the initial playback position when unmounting a `<Sheet>` component. Provide the property `autoReset` to reset the playback to the position 0 of the sequence.

```svelte
<script lang="ts">
	import { Sheet } from '@threlte/theatre'
</script>

<!-- Resets the sequence position onMount and onDestros -->
<Sheet autoReset>
	<!-- … -->
</Sheet>

<!-- Resets the sequence position only on onMount -->
<Sheet autoReset="onMount">
	<!-- … -->
</Sheet>

<!-- Resets the sequence position only on onDestroy -->
<Sheet autoReset="onDestroy">
	<!-- … -->
</Sheet>
```

#### autoPause

Similarly, when you want to pause a sequence as soon as a `<Sheet>` is unmounted, provide the flag `autoPause`.

```svelte
<script lang="ts">
	import { Sheet } from '@threlte/theatre'
</script>

<!-- Pauses the sequence as soon as it's unmounted -->
<Sheet autoPause>
	<!-- … -->
</Sheet>
```
