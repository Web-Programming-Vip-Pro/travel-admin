import React from 'react'
import Sidebar from './components/Sidebar'

const DefaultLayout = ({ children }: { children?: React.ReactChild }) => {
  return (
    <div className="app align-content-stretch d-flex flex-wrap">
      <Sidebar />
      <div className="app-container">{children}</div>
    </div>
  )
}

export default DefaultLayout
