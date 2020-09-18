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
        this.getPosts()
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.userPosts !== prevState.userPosts) {
            this.getPosts()
        }
        if (this.state.search !== prevState.search) {
            this.getPosts()
        }

    }


    getPosts() {
        const { user_id } = this.props
        const { search, userPosts } = this.state

        if (userPosts && search) {
            return Axios.get(`/api/posts/${user_id}?user_posts=true&search=${search}`)
                .then(res => { this.setState({ posts: res.data }) })
                .catch(err => { console.log(err.message) })
        }

        if (!userPosts && search) {
            return Axios.get(`/api/posts/${user_id}?user_posts=false?search=${search}`)
                .then(res => { this.setState({ posts: res.data }) })
                .catch(err => console.log(err.message))
        }

        if (!userPosts) {
            return Axios.get(`/api/posts/${user_id}?user_posts=false`)
                .then(res => this.setState({ posts: res.data }))
                .catch(err => console.log(err.message))
        }

        Axios.get(`/api/posts/${user_id}?user_posts=${userPosts}`).then(res => {
            this.setState({ posts: res.data })
        })
    }

    handleSearch = (e) => {
        this.setState({ search: e.target.value })
    }

    handleCheckbox = () => {
        this.setState({ userPosts: !this.state.userPosts })
    }

    handleReset = () => {
        this.setState({ search: '', userPosts: true })

    }

    render() {
        const posts = this.state.posts.map((post, index) => {
            return (<div key={index} className='posts'>
                <h1>{post.title}</h1>
                <h2>{post.username}</h2>
            </div>)
        })


        return (
            <div className='dashboard'>
                <div className='search'>
                    <div className='search-bar'>
                        <input onChange={(e) => this.handleSearch(e)} name='search' type='text' value={this.state.search} />
                        <button onclick={() => this.getPosts()}>Search</button>
                        <button onClick={() => this.handleReset()}>Reset</button>
                    </div>
                    <div className='checkbox'> My Posts <input checked={this.state.userPosts} type='checkbox' onChange={() => this.handleCheckbox()} /></div>
                </div>
                <div>{posts}</div>
            </div >
        )
    }
}

const mapStateToProps = (reduxState) => reduxState

export default connect(mapStateToProps)(Dashboard)