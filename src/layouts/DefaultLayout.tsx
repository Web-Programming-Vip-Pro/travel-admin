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
        <div className="app-content">
          <div className="content-wrapper">{children}</div>
        </div>
      </div>
    </div>
  )
}

export default DefaultLayout
