function Notification() {
  return (
    <div
      className="dropdown-menu dropdown-menu-end notifications-dropdown"
      aria-labelledby="notificationsDropDown"
    >
      <h6 className="dropdown-header">Notifications</h6>
      <div className="notifications-dropdown-list">
        <a href="#">
          <div className="notifications-dropdown-item">
            <div className="notifications-dropdown-item-image">
              <span className="notifications-badge bg-info text-white">
                <i className="material-icons-outlined">campaign</i>
              </span>
            </div>
            <div className="notifications-dropdown-item-text">
              <p className="bold-notifications-text">
                Donec tempus nisi sed erat vestibulum, eu suscipit ex laoreet
              </p>
              <small>19:00</small>
            </div>
          </div>
        </a>
      </div>
    </div>
  )
}

const Navbar = () => {
  return (
    <nav className="navbar navbar-light navbar-expand-lg">
      <div className="container-fluid">
        <div className="navbar-nav" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link hide-sidebar-toggle-button" href="#">
                <i className="material-icons">first_page</i>
              </a>
            </li>
            <li className="nav-item dropdown hidden-on-mobile">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="addDropdownLink"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="material-icons">add</i>
              </a>
              <ul className="dropdown-menu" aria-labelledby="addDropdownLink">
                <li>
                  <a className="dropdown-item" href="#">
                    New City
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    New Country
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    New Blog
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <div className="d-flex">
          <ul className="navbar-nav">
            <li className="nav-item hidden-on-mobile">
              <a
                className="nav-link nav-notifications-toggle"
                id="notificationsDropDown"
                href="#"
                data-bs-toggle="dropdown"
              >
                4
              </a>
              <Notification />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
