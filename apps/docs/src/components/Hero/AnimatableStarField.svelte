<script lang="ts">
  import { T } from '@threlte/core'
  import { SheetObject } from '@threlte/theatre'
  import StarField from './StarField/StarField.svelte'

  interface Props {
    key: string
  }

  let { key }: Props = $props()
</script>

<SheetObject {key}>
  {#snippet children({ Transform, Declare })}
    <Transform>
      <T.Group>
        <Declare
          props={{
            amount: 1000,
            radius: 100,
            size: 0,
            speed: 0,
            direction: {
              x: 0,
              y: 0,
              z: 1
            },
            opacity: 0
          }}
        >
          {#snippet children({ values })}
            {#key `${values.amount}-${values.radius}`}
              <StarField
                amount={values.amount}
                radius={values.radius}
                size={values.size}
                speed={values.speed}
                direction={[values.direction.x, values.direction.y, values.direction.z]}
                opacity={values.opacity}
              />
            {/key}
          {/snippet}
        </Declare>
      </T.Group>
    </Transform>
  {/snippet}
</SheetObject>
