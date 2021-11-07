import React from 'react'

// components

import AdminNavbar from '@/components/Shared/Navbars/AdminNavbar.js'
import Sidebar from '@/components/Shared/Sidebar/Sidebar.js'
import HeaderStats from '@/components/Shared/Headers/HeaderStats.js'
import FooterAdmin from '@/components/Shared/Footers/FooterAdmin.js'

export default function Admin({ children }) {
  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-blueGray-100">
        <AdminNavbar />
        {/* Header */}
        <HeaderStats />
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          {children}
          <FooterAdmin />
        </div>
      </div>
    </>
  )
}
