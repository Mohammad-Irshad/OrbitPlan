import React from 'react'
import { Link } from 'react-router-dom'

const Header = ({heading}) => {
  return (
    <header>
      <nav className="navbar bg-body-secondary">
        <div className="container d-flex justify-content-center ">
            <Link className="navbar-brand fs-3" to="/dashboard">{heading}</Link>
        </div>
      </nav>
    </header>
  )
}

export default Header
