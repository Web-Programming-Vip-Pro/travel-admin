import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export function useMenuSidebar(defaultState) {
  const [menus, setMenus] = useState(defaultState)
  const router = useRouter()
  useEffect(() => {
    setMenus(
      menus.map((menu) => {
        menu.active = menu.link === router.pathname
        return menu
      })
    )
  }, [router.pathname])
  return { menus }
}
