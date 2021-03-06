import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { isAdmin } from '@/utils'

export function useMenuSidebar(defaultState) {
  const { data } = useSession()
  const user = data && data.user

  const [menus, setMenus] = useState(defaultState)
  const router = useRouter()
  useEffect(() => {
    setMenus(
      menus
        .map((menu) => {
          menu.active = menu.link === router.pathname
          if (user && isAdmin(user)) {
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
