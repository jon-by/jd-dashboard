import React from 'react'
import { Link } from 'react-router-dom'

const routes = [{ title: 'login', path: '/login' }, { title: 'panel', path: '/panel' }]

const Nav = () => {
    return (
        <nav>
            <ul>
                {routes.map(({ title, path }) => {
                    return <li> <Link to={path}>{title}</Link> </li>
                })}
            </ul>
        </nav>
    )
}

export default Nav
