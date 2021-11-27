import { useState } from 'react'
import Link from 'next/link'

import NotificationDropdown from '@/components/Shared/Dropdowns/NotificationDropdown.js'
import UserDropdown from '@/components/Shared/Dropdowns/UserDropdown.js'
import { useMenuSidebar } from '@/hooks/useMenuSidebar'

export default function Sidebar() {
  const [collapseShow, setCollapseShow] = useState('hidden')
  const { menus } = useMenuSidebar([
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
      title: 'Places',
      icon: 'fas fa-paper-plane',
      link: '/dashboard/places',
      active: false,
    },
    {
      title: 'Transactions',
      icon: 'fas fa-money-check',
      link: '/dashboard/transactions',
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
      <nav className="relative z-10 flex flex-wrap items-center justify-between px-6 py-4 bg-white shadow-xl md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden md:w-64">
        <div className="flex flex-wrap items-center justify-between w-full px-0 mx-auto md:flex-col md:items-stretch md:min-h-full md:flex-nowrap">
          <button
            className="px-3 py-1 text-xl leading-none text-black bg-transparent border border-transparent border-solid rounded opacity-50 cursor-pointer md:hidden"
            type="button"
            onClick={() => setCollapseShow('bg-white m-2 py-3 px-6')}
          >
            <i className="fas fa-bars"></i>
          </button>
          <p className="inline-block p-4 px-0 mr-0 text-sm font-bold text-left uppercase md:block md:pb-2 text-blueGray-600 whitespace-nowrap">
            <Link href="/dashboard">Fleety Admin</Link>
          </p>
          <ul className="flex flex-wrap items-center list-none md:hidden">
            <li className="relative inline-block">
              <NotificationDropdown />
            </li>
            <li className="relative inline-block">
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
            <div className="block pb-4 mb-4 border-b border-solid md:min-w-full md:hidden border-blueGray-200">
              <div className="flex flex-wrap">
                <div className="w-6/12">
                  <p className="inline-block p-4 px-0 mr-0 text-sm font-bold text-left uppercase md:block md:pb-2 text-blueGray-600 whitespace-nowrap">
                    <Link href="/dashboard">Fleety Admin</Link>
                  </p>
                </div>
                <div className="flex justify-end w-6/12">
                  <button
                    type="button"
                    className="px-3 py-1 text-xl leading-none text-black bg-transparent border border-transparent border-solid rounded opacity-50 cursor-pointer md:hidden"
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
            <h6 className="block pt-1 pb-4 text-xs font-bold no-underline uppercase md:min-w-full text-blueGray-500">
              Overview
            </h6>
            {/* Navigation */}

            <ul className="flex flex-col list-none md:flex-col md:min-w-full">
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
