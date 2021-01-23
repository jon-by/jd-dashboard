import React from 'react'
import './Nav.css';

import { Link } from 'react-router-dom'

const routes = [{ title: 'login', path: '/login' }, { title: 'panel', path: '/' }]

const Nav = ({user}) => {
    return (
        <nav className="nav-wrapper">
            <ul className="nav-list-conainer">
                {routes.map(({ title, path }, idx) => {
                    return <li className="nav-list-item" key={idx}> <Link to={path}>{title}</Link> </li>
                })}
            </ul>
            {user && <div className="user-display">
                <img className="user-avatar" src={user.profile_image_url} alt={user.display_name + ' avatar'}/>
                <div className="user-displayname">{user.display_name}</div>
            </div>}
        </nav>
    )
}

export default Nav



// broadcaster_type: "affiliate"
// created_at: "2017-02-17T15:29:54.662237Z"
// description: "Olá eu sou a Beatriz Xavier, tenho 29 anos sou brasileira do estado de MG, o foco do canal é o jogo Just dance mas também vou trazer outros jogos que gosto e compartilhar essa experiência com vocês! 🎮♥️"
// display_name: "BeatrizXavierjd"
// email: "beatriz.ved@gmail.com"
// id: "148003044"
// login: "beatrizxavierjd"
// offline_image_url: ""
// profile_image_url: "https://static-cdn.jtvnw.net/jtv_user_pictures/b77aaca7-6937-4d16-903d-1853401c5820-profile_image-300x300.png"
// type: ""
// view_count: 6045