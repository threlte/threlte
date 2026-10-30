import { render } from '@threlte/test'
import { tick } from 'svelte'
import { Group } from 'three'
import { describe, expect, it } from 'vitest'
import BoundRef from './__fixtures__/BoundRef.svelte'

describe('<TransformControls>', () => {
  it('binds ref to the attached group', async () => {
    let boundRef: Group | undefined
    let boundGroup: Group | undefined

    render(BoundRef, {
      props: {
        onbind: (ref: Group | undefined, group: Group | undefined) => {
          boundRef = ref
          boundGroup = group
        }
      }
    })

    await tick()

    expect(boundRef).toBeInstanceOf(Group)
    expect(boundRef).toBe(boundGroup)
  })
})
