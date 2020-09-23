import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { loginUser, logoutUser, getUser } from '../../ducks/reducer'
import Axios from 'axios'

class Nav extends Component {

    componentDidMount() {
        this.handleCurrentUser()
    }

    handleCurrentUser() {
        Axios.get('/auth/user').then(res => {
            this.props.getUser(res.data)
        }).catch(err => console.log(err.message))

    }

    handleLogout() {
        Axios.post('/auth/logout').then(res => {
            this.props.logoutUser()
        })
    }


    render() {

        const { username, profilePicture } = this.props
        return (
            <nav className='navbar'>
                <div className='current-user'>
                    <img className='profile-pic' src={profilePicture} alt='user' />
                    <h3 className='username'>{username}</h3>
                </div>
                <div className='nav-links'>
                    <Link className='links' to='/dashboard'>Dashboard</Link>
                    <Link className='links' to='/new'>New post</Link>
                </div>
                <Link onClick={() => this.handleLogout()} className='logout' to='/'>Logout</Link>
            </nav>
        )
    }
}

const mapStateToProps = (reduxState) => reduxState

export default connect(mapStateToProps, { loginUser, logoutUser, getUser })(Nav)