import Axios from 'axios'
import React, { Component } from 'react'
import { connect } from 'react-redux'


class Dashboard extends Component {
    constructor() {
        super()
        this.state = {
            posts: [],
            search: '',
            userPosts: true
        }
    }

    componentDidMount() {
        this.handlePosts()
    }

    handlePosts() {
        const { user_id } = this.props
        const { search, userPosts } = this.state

        Axios.get(`/api/posts/${user_id}?user_posts=true`).then(res => {
            this.setState({ posts: res.data })
        })


        if (userPosts && search) {
            Axios.get(`/api/posts/${user_id}?user_posts=${userPosts}&search=${search}`)
                .then(res => { this.setState({ posts: res.data }) })
                .catch(err => { console.log(err.message) })
        }

        if (!userPosts && search) {
            Axios.get(`/api/posts/${user_id}?search=${search}`)
                .then(res => { this.setState({ posts: res.data }) })
                .catch(err => console.log(err.message))
        }

        if (!userPosts) {
            Axios.get(`/api/posts/${user_id}?user_posts=false`)
                .then(res => this.setState({ posts: res.data }))
                .catch(err => console.log(err.message))
        }

    }

    handleSearch = (e) => {
        this.setState({ search: e.target.value })
    }

    render() {
        const posts = this.state.posts.map(post => {
            return (<div>{post.title}</div>)
        })
        { console.log(posts) }

        return (
            <div className='dashboard'>
                <div className='search'>
                    <div className='search-bar'>
                        <input onChange={(e) => this.handleSearch(e)} name='search' type='text' value={this.state.search} />
                        <button>Search</button>
                        <button>Reset</button>
                    </div>
                    <div className='checkbox'> My Posts <input type='checkbox' onClick={() => this.setState({ userPosts: !this.state.userPosts })} /></div>
                </div>
                <div>{posts}</div>
            </div >
        )
    }
}

const mapStateToProps = (reduxState) => reduxState

export default connect(mapStateToProps)(Dashboard)