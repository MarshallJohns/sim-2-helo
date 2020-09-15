import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

class Nav extends Component {

    render() {

        const { username, profilePicture } = this.props
        return (
            <nav className='navbar'>
                <div className='current-user'>
                    {profilePicture ? <img className='profile-pic' src={profilePicture} alt='user' /> : <div className='profile-pic'></div>}
                    <h3 className='username'>{username}</h3>
                </div>
                <div className='nav-links'>
                    <Link className='links' to='/dashboard'>Dashboard</Link>
                    <Link className='links' to='/new'>New post</Link>
                </div>
                <Link className='logout' to='/'>Logout</Link>
            </nav>
        )
    }
}

const mapStateToProps = (reduxState) => reduxState

export default connect(mapStateToProps)(Nav)