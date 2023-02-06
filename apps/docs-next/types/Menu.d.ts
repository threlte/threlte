declare type LeftSidebarMenuItem = {
  title: string
  slug: string
}

declare type LeftSidebarMenuCategory = {
  urlPrefix: string
  title: string
  menuItems: LeftSidebarMenuItem[]
}

declare type LeftSidebarMenu = {
  categories: LeftSidebarMenuCategory[]
}
