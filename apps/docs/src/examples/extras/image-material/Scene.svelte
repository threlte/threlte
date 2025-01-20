<script lang="ts">
  import { T } from '@threlte/core'
  import { OrbitControls, Suspense, interactivity } from '@threlte/extras'
  import Card from './Card.svelte'
  import { textureOverrideEnabled } from './props'
  import RgbaTexture from './rgbaProcessingTexture/RgbaTexture.svelte'

  interactivity()

  let urls = [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Caravaggio_-_Boy_Bitten_by_a_Lizard.jpg/762px-Caravaggio_-_Boy_Bitten_by_a_Lizard.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/The_Large_Plane_Trees_%28Road_Menders_at_Saint-R%C3%A9my%29%2C_by_Vincent_van_Gogh%2C_Cleveland_Museum_of_Art%2C_1947.209.jpg/963px-The_Large_Plane_Trees_%28Road_Menders_at_Saint-R%C3%A9my%29%2C_by_Vincent_van_Gogh%2C_Cleveland_Museum_of_Art%2C_1947.209.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/KlimtDieJungfrau.jpg/803px-KlimtDieJungfrau.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/The_Denial_of_St._Peter_-_Gerard_Seghers_-_Google_Cultural_Institute.jpg/1024px-The_Denial_of_St._Peter_-_Gerard_Seghers_-_Google_Cultural_Institute.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Antoine_Vollon_-_Mound_of_Butter_-_National_Gallery_of_Art.jpg/935px-Antoine_Vollon_-_Mound_of_Butter_-_National_Gallery_of_Art.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/De_bedreigde_zwaan_Rijksmuseum_SK-A-4.jpeg/911px-De_bedreigde_zwaan_Rijksmuseum_SK-A-4.jpeg'
  ]
  const count = urls.length
  const radius = 1.4
</script>

<T.PerspectiveCamera
  makeDefault
  fov={20}
  position={[2, 2, 10]}
>
  <OrbitControls
    autoRotate
    enableDamping
    enableZoom={false}
  />
</T.PerspectiveCamera>

{#if $textureOverrideEnabled}
  <RgbaTexture />
{/if}

<Suspense>
  {#each urls as url, index (url)}
    <Card
      {url}
      position={[
        Math.sin((index / count) * Math.PI * 2) * radius,
        0,
        Math.cos((index / count) * Math.PI * 2) * radius
      ]}
      rotation={[0, Math.PI + (index / count) * Math.PI * 2, 0]}
    />
  {/each}
</Suspense>
