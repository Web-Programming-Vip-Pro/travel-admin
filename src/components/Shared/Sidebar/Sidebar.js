import { useState } from 'react'
import Link from 'next/link'

import NotificationDropdown from '@/components/Shared/Dropdowns/NotificationDropdown.js'
import UserDropdown from '@/components/Shared/Dropdowns/UserDropdown.js'
import { useMenuSidebar } from '@/hooks/useMenuSidebar'

export default function Sidebar() {
  const [collapseShow, setCollapseShow] = useState('hidden')
  const { menus } = useMenuSidebar([
    {
      title: 'Dashboard',
      icon: 'fas fa-tv',
      link: '/dashboard',
      active: true,
    },
    {
      title: 'Users',
      icon: 'fas fa-users',
      link: '/dashboard/users',
      active: false,
    },
    {
      title: 'Agencies',
      icon: 'fas fa-user-tie',
      link: '/dashboard/agencies',
      active: false,
    },
    {
      title: 'Countries',
      icon: 'fas fa-globe-europe',
      link: '/dashboard/countries',
      active: false,
    },
    {
      title: 'Cities',
      icon: 'fas fa-city',
      link: '/dashboard/cities',
      active: false,
    },
    {
      title: 'Blogs',
      icon: 'fas fa-blog',
      link: '/dashboard/blogs',
      active: false,
    },
    {
      title: 'Pages',
      icon: 'fas fa-pager',
      link: '/dashboard/pages',
      active: false,
    },
    {
      title: 'Reports',
      icon: 'fas fa-flag',
      link: '/dashboard/reports',
      active: false,
    },
    {
      title: 'Settings',
      icon: 'fas fa-tools',
      link: '/dashboard/settings',
      active: false,
    },
  ])
  return (
    <>
      <nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6">
        <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
          <button
            className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
            type="button"
            onClick={() => setCollapseShow('bg-white m-2 py-3 px-6')}
          >
            <i className="fas fa-bars"></i>
          </button>
          <p className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0">
            <Link href="/dashboard">Fleety Admin</Link>
          </p>
          <ul className="md:hidden items-center flex flex-wrap list-none">
            <li className="inline-block relative">
              <NotificationDropdown />
            </li>
            <li className="inline-block relative">
              <UserDropdown />
            </li>
          </ul>
          <div
            className={
              'md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded ' +
              collapseShow
            }
          >
            {/* Collapse header */}
            <div className="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-blueGray-200">
              <div className="flex flex-wrap">
                <div className="w-6/12">
                  <p className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0">
                    <Link href="/dashboard">Fleety Admin</Link>
                  </p>
                </div>
                <div className="w-6/12 flex justify-end">
                  <button
                    type="button"
                    className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                    onClick={() => setCollapseShow('hidden')}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              </div>
            </div>

            {/* Divider */}
            <hr className="my-4 md:min-w-full" />
            {/* Heading */}
            <h6 className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
              Overview
            </h6>
            {/* Navigation */}

            <ul className="md:flex-col md:min-w-full flex flex-col list-none">
              {menus.map((menu, index) => (
                <li key={index} className="items-center hover:cursor-pointer">
                  <Link href={menu.link} passHref>
                    <p
                      className={`
                        text-xs uppercase py-3 font-bold block ${
                          menu.active
                            ? 'text-sky-500 hover:text-sky-600'
                            : 'text-blueGray-700 hover:text-blueGray-500'
                        }
                      `}
                    >
                      <i
                        className={`${menu.icon} mr-2 text-sm ${
                          menu.active ? 'opacity-75' : 'text-blueGray-300'
                        }`}
                      ></i>
                      {menu.title}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}
