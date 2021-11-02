import React from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'

const DefaultLayout = ({ children }: { children?: React.ReactChild }) => {
  return (
    <div className="app align-content-stretch d-flex flex-wrap">
      <Sidebar />
      <div className="app-container">
        <div className="app-header">
          <Navbar />
        </div>
        {children}
      </div>
    </div>
  )
}

export default DefaultLayout
