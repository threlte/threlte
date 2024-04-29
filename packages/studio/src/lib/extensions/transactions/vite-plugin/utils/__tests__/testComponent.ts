/* eslint-disable max-len */
import MagicString from 'magic-string'
import { toMagicString } from '../magicStringUtils'

export const scriptModule = `<script lang="ts" context="module">
  const foo = 'bar'
</script>`

export const script = `<script lang="ts">
  import { T } from '@threlte/core'
  import { MeshStandardMaterial } from 'three'

  const scale = 1
</script>`

export const markup = `<T.Mesh
  position={[0, 1, 0]}
  {scale}
>
  <!-- Comment -->
  <T.BoxGeometry args={[1, 1, 1]} />
  <T is={MeshStandardMaterial} color="red" />
  <T.MeshBasicMaterial />
</T.Mesh>`

export const markupWithUpdatedProps = `<T.Mesh
  position={[1, 1, 1]}
  {scale}
>
  <!-- Comment -->
  <T.BoxGeometry args={[1, 1, 1]} />
  <T is={MeshStandardMaterial} color="red" />
  <T.MeshBasicMaterial />
</T.Mesh>`

export const markupWithRemovedProps = `<T.Mesh
  {scale}
>
  <!-- Comment -->
  <T.BoxGeometry args={[1, 1, 1]} />
  <T is={MeshStandardMaterial} color="red" />
  <T.MeshBasicMaterial />
</T.Mesh>`

export const markupWithStudioProps = `<T.Mesh
  position={[0, 1, 0]}
  {scale}
  threlteStudio={{"moduleId":"Test.svelte","index":0,"signature":"051f94d43d58fa73caa0fc4006d0e5f09c745f6e2a17dcaea951765ea50a3840"}}
>
  <!-- Comment -->
  <T.BoxGeometry args={[1, 1, 1]} threlteStudio={{"moduleId":"Test.svelte","index":1,"signature":"65e59a586b177472fc71dc31ad2725235988cbebe58407222f23f0199c11abe0"}} />
  <T is={MeshStandardMaterial} color="red" threlteStudio={{"moduleId":"Test.svelte","index":2,"signature":"f6c84eeb0b99307bb78708ac9846f79d43711c5f986de3d7599d849817abcb56"}} />
  <T.MeshBasicMaterial threlteStudio={{"moduleId":"Test.svelte","index":3,"signature":"829a9ea1270c0fdd8ff2e1d4464d260a9191fb817e9f9c5c597809b70f0f8364"}} />
</T.Mesh>`

export const markupWithProps = `<T.Mesh
  position={[0, 1, 0]}
  {scale}
  visible={false}
  renderOrder={1}
>
  <!-- Comment -->
  <T.BoxGeometry args={[1, 1, 1]} />
  <T is={MeshStandardMaterial} color="red" metalness={1} roughness={0} />
  <T.MeshBasicMaterial color="black" />
</T.Mesh>`

export const style = `<style>
  :global(body) {
    height: 100vh;
    margin: 0;
  }
</style>`

export const dummyScriptModule = '<script context="module">"ABC"</script>'
export const dummyScript = '<script>"ABC"</script>'
export const dummyStyle = '<style></style>'

type TestComponentOptions = {
  scriptModule?: string
  script?: string
  markup?: string
  style?: string
  as?: 'string' | 'magic-string'
}

type BuildTestComponentReturn<Options extends TestComponentOptions> = Options extends {
  as: 'magic-string'
}
  ? MagicString
  : string

const asMagicString = (options: TestComponentOptions): options is { as: 'magic-string' } => {
  return options.as === 'magic-string'
}

export const buildTestComponent = <Options extends TestComponentOptions>(
  options: Options,
): BuildTestComponentReturn<Options> => {
  const str = [options.scriptModule, options.script, options.markup, options.style]
    .filter(Boolean)
    .join('\n\n')
  if (asMagicString(options)) {
    return toMagicString(str) as BuildTestComponentReturn<Options>
  }
  return str as BuildTestComponentReturn<Options>
}

export const updatePropsMarkup = `<T.Mesh
  mustache1={[1]}
  mustache2={[2]}
  mustache3={[3]}
  bool1
  bool2
  bool3
  bool4
  string1="string1"
  string2="string2"
  string3="string3"
  {shorthand1}
  {shorthand2}
  {shorthand3}
/>
`

export const expectedUpdatePropsMarkup = `<T.Mesh
  mustache1
  mustache2="string"
  mustache3={["mustache value"]}
  bool1
  bool2={false}
  bool3="string in bool prop"
  bool4={["mustache value in bool prop"]}
  string1
  string2="string2"
  string3={["mustache value in string prop"]}
  shorthand1
  shorthand2="string in shorthand prop"
  shorthand3={["mustache value in shorthand prop"]}
/>
`

export const insertPropsMarkup = `<T.Mesh
  {position}
  scale={1}
>
  <T.BoxGeometry />
  <T.MeshStandardMaterial color="red" />
</T.Mesh>
`

export const expectedInsertPropsMarkup = `<T.Mesh
  {position}
  scale={1}
  insert1={1}
  insert2
  insert3="test"
>
  <T.BoxGeometry insert4={4} />
  <T.MeshStandardMaterial color="red" insert5={5} />
</T.Mesh>
`
