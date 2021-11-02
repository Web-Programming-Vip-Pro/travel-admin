import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

export interface Menu {
  title: string
  icon: string
  path: string
  active: boolean
}

export function useMenuDashboard(defaultState: Menu[]) {
  const [menus, setMenus] = useState<Menu[]>(defaultState)
  const location = useLocation()

  function setActiveMenu(activeIndex: number) {
    setMenus(
      menus.map((menu, index) => ({ ...menu, active: index === activeIndex }))
    )
  }

  useEffect(() => {
    const activeIndex = menus.findIndex(
      (menu) => menu.path === location.pathname
    )
    setActiveMenu(activeIndex)
  }, [location])

  return [menus, setActiveMenu] as const
}
