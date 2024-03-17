declare type LeftSidebarMenuItem = {
  title: string
  slug: string
  isDivider?: boolean
  isSubDivider?: boolean
}

declare type LeftSidebarMenuCategory = {
  urlPrefix: string
  title: string
  menuItems: LeftSidebarMenuItem[]
}

declare type LeftSidebarMenu = {
  categories: LeftSidebarMenuCategory[]
}
