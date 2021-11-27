import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'

export function useMenuSidebar(defaultState) {
  const { data, status } = useSession()
  const user = data && data.user
  const role = user && parseInt(user.role)
  const [menus, setMenus] = useState(defaultState)
  const router = useRouter()
  useEffect(() => {
    setMenus(
      menus
        .map((menu) => {
          menu.active = menu.link === router.pathname
          if (role && role === 0) {
            return menu
          } else {
            return menu.isAdmin ? null : menu
          }
        })
        .filter((menu) => menu !== null)
    )
  }, [router.pathname])
  return { menus }
}
