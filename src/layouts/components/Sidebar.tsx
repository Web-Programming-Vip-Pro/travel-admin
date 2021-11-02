import { Link } from 'react-router-dom'
import { useMenuDashboard } from '@/hooks/useMenuDashboard'

const Sidebar = () => {
  const [menus] = useMenuDashboard([
    {
      title: 'Dashboard',
      icon: 'dashboard',
      path: '/',
      active: true,
    },
  ])
  return (
    <div className="app-sidebar">
      <div className="app-menu">
        <ul className="accordion-menu">
          <li className="sidebar-title">Apps</li>
          {menus.map((menu, index) => (
            <li key={index} className={menu.active ? 'active-page' : ''}>
              <Link to={menu.path} className={menu.active ? 'active' : ''}>
                <i className="material-icons-two-tone">{menu.icon}</i>
                {menu.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Sidebar
