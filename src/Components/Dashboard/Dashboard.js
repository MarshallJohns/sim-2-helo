import React, { Component } from 'react'

class Dashboard extends Component {
    constructor() {
        super()
        this.state = {
            posts: [],
            search: '',
            userPosts: true
        }
    }

    handleSearch = (e) => {
        this.setState({ search: e.target.value })
    }

    render() {
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
            </div >
        )
    }
}

export default Dashboard