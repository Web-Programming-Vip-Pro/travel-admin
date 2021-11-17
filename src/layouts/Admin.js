import AdminNavbar from '@/components/Shared/Navbars/AdminNavbar.js'
import Sidebar from '@/components/Shared/Sidebar/Sidebar.js'
import HeaderStats from '@/components/Shared/Headers/HeaderStats.js'
import FooterAdmin from '@/components/Shared/Footers/FooterAdmin.js'
import { useUserStore } from '@/store/user'
import { useRouter } from 'next/router'

export default function Admin({ children }) {
  const router = useRouter()
  const user = useUserStore((state) => state.user)
  if (!user) {
    router.push('/')
    return null
  }
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
