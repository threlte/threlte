<script lang="ts">
  import { types } from '@theatre/core'
  import { T } from '@threlte/core'
  import { SheetObject } from '@threlte/theatre'
  import StarField from './StarField/StarField.svelte'

  export let key: string
</script>

<SheetObject {key}>
  {#snippet children({ Transform, Declare })}
    <Transform>
      <T.Group>
        <Declare
          props={{
            amount: 1000,
            radius: 100,
            size: types.number(0, {
              range: [0, 0.5]
            }),
            speed: types.number(0, {
              range: [0, 5]
            }),
            direction: {
              x: types.number(0, {
                range: [-1, 1]
              }),
              y: types.number(0, {
                range: [-1, 1]
              }),
              z: types.number(1, {
                range: [-1, 1]
              })
            },
            opacity: types.number(0, {
              range: [0, 1]
            })
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
