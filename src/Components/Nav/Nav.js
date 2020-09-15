import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Nav extends Component {

    render() {

        return (
            <div className='navbar'>
                <Link to='/dashboard'>Dashboard</Link>
                <Link to='/new'>New post</Link>
                <Link to='/'>Logout</Link>
            </div>
        )
    }
}

export default Nav