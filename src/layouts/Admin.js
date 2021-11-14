import AdminNavbar from '@/components/Shared/Navbars/AdminNavbar.js'
import Sidebar from '@/components/Shared/Sidebar/Sidebar.js'
import HeaderStats from '@/components/Shared/Headers/HeaderStats.js'
import FooterAdmin from '@/components/Shared/Footers/FooterAdmin.js'
import { useUserStore } from '@/store/user'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function Admin({ children }) {
  const router = useRouter()
  const isLoading = useUserStore((state) => state.isLoading)
  const isUserLoggedIn = useUserStore((state) => state.user)
  useEffect(() => {
    if (!isLoading && !isUserLoggedIn) {
      router.push('/')
    }
  }, [isUserLoggedIn, isLoading])
  if (isLoading) return <p>Loading...</p>

  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-blueGray-100">
        <AdminNavbar />
        {/* Header */}
        <HeaderStats />
        <div className="w-full px-4 mx-auto -m-24 md:px-10">
          {children}
          <FooterAdmin />
        </div>
      </div>
    </>
  )
}
