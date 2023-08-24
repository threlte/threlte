import { getCollection, CollectionEntry } from 'astro:content'

type ReferenceCategoryKey = NonNullable<CollectionEntry<'reference'>['data']['category']>

const referenceSidebarMenuCategoryOrder: ReferenceCategoryKey[] = [
  '@threlte/core',
  '@threlte/extras',
  '@threlte/gltf',
  '@threlte/rapier',
  '@threlte/theatre',
  'Documentation'
]

const getReferenceSidebarMenu = async (): Promise<LeftSidebarMenu> => {
  const referenceCollection = await getCollection('reference')

  const categoryNames = [...new Set(referenceCollection.map((item) => item.data.category))]

  const categories = categoryNames.map((category): LeftSidebarMenuCategory => {
    const menuItems = referenceCollection
      .filter((item) => item.data.showInSidebar && item.data.category === category)
      .sort((a, b) => (a.data.order || 0) - (b.data.order || 0))
      .map((item): LeftSidebarMenuItem => {
        return {
          title: item.data.name,
          slug: item.slug,
          isDivider: item.data.isDivider ?? false
        }
      })
    return {
      urlPrefix: '/docs/reference',
      menuItems,
      title: category
    }
  })

  categories.sort((a, b) => {
    return (
      referenceSidebarMenuCategoryOrder.indexOf(a.title as ReferenceCategoryKey) -
      referenceSidebarMenuCategoryOrder.indexOf(b.title as ReferenceCategoryKey)
    )
  })

  return {
    categories
  }
}

type LearnCategoryKey = CollectionEntry<'learn'>['data']['category']

const learnSidebarMenuCategoryOrder: LearnCategoryKey[] = [
  'Getting Started',
  'Basics',
  'Advanced',
  'Preprocessing'
]

const getLearnSidebarMenu = async (): Promise<LeftSidebarMenu> => {
  const learnCollection = await getCollection('learn')

  const categoryNames = [...new Set(learnCollection.map((item) => item.data.category))]

  const categories = categoryNames.map((category): LeftSidebarMenuCategory => {
    const menuItems = learnCollection
      .filter((item) => item.data.showInSidebar && item.data.category === category)
      .sort((a, b) => (a.data.order || 0) - (b.data.order || 0))
      .map((item): LeftSidebarMenuItem => {
        return {
          title: item.data.title,
          slug: item.slug,
          isDivider: item.data.isDivider ?? false
        }
      })
    return {
      urlPrefix: '/docs/learn',
      menuItems,
      title: category
    }
  })

  categories.sort((a, b) => {
    return (
      learnSidebarMenuCategoryOrder.indexOf(a.title as LearnCategoryKey) -
      learnSidebarMenuCategoryOrder.indexOf(b.title as LearnCategoryKey)
    )
  })

  return {
    categories
  }
}

type ExamplesCategoryKey = Exclude<CollectionEntry<'examples'>['data']['category'], undefined>

const examplesSidebarMenuCategoryOrder: ExamplesCategoryKey[] = [
  'Animation',
  'Camera',
  'Geometry',
  'Postprocessing',
  'Shaders'
]

const getExamplesSidebarMenu = async (): Promise<LeftSidebarMenu> => {
  const learnCollection = await getCollection('examples')

  const categoryNames = [...new Set(learnCollection.map((item) => item.data.category))]

  const categories = categoryNames
    .filter((category) => {
      return !!category
    })
    .map((category): LeftSidebarMenuCategory => {
      const menuItems = learnCollection
        .filter((item) => item.data.category && item.data.category === category)
        .sort((a, b) => (a.data.order || 0) - (b.data.order || 0))
        .map((item): LeftSidebarMenuItem => {
          return {
            title: item.data.title,
            slug: item.slug,
            isDivider: false
          }
        })
      return {
        urlPrefix: '/docs/examples',
        menuItems,
        title: category as Exclude<typeof category, undefined>
      }
    })

  categories.sort((a, b) => {
    return (
      examplesSidebarMenuCategoryOrder.indexOf(a.title as ExamplesCategoryKey) -
      examplesSidebarMenuCategoryOrder.indexOf(b.title as ExamplesCategoryKey)
    )
  })

  return {
    categories
  }
}

export const getLeftSidebarMenu = async (): Promise<
  Record<'learn' | 'reference' | 'examples', LeftSidebarMenu>
> => {
  const reference = await getReferenceSidebarMenu()
  const learn = await getLearnSidebarMenu()
  const examples = await getExamplesSidebarMenu()

  return {
    reference,
    learn,
    examples
  }
}
