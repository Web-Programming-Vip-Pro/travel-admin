import AdminNavbar from '@/components/Shared/Navbars/AdminNavbar.js'
import Sidebar from '@/components/Shared/Sidebar/Sidebar.js'
import HeaderStats from '@/components/Shared/Headers/HeaderStats.js'
import FooterAdmin from '@/components/Shared/Footers/FooterAdmin.js'
import { useSession } from 'next-auth/react'

export default function Admin({ children }) {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return <p>Loading</p>
  }

  if (status !== 'loading') {
    if (!session) {
      return (window.location.href = '/api/auth/signin')
    }
  }

  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-blueGray-100">
        <AdminNavbar />
        <HeaderStats />
        <div className="w-full px-4 mx-auto -m-24 md:px-10">
          {children}
          <FooterAdmin />
        </div>
      </div>
    </>
  )
}
