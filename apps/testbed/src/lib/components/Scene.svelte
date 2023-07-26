<script lang="ts">
	import type { ISheet } from '@theatre/core'
	import { T } from '@threlte/core'
	import { Sheet, SheetObject } from '@threlte/theatre'
	import { scrollPos } from './scrollPos'

	let sheet: ISheet | undefined

	$: sheet && (sheet.sequence.position = $scrollPos)
</script>

<Sheet bind:sheet>
	<SheetObject key="Box" let:Transform>
		<Transform>
			<T.Mesh>
				<T.BoxGeometry />
				<T.MeshBasicMaterial />
			</T.Mesh>
		</Transform>
	</SheetObject>
</Sheet>
