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
    render() {
        return (
            <div className='dashboard'>
                <div className='search'>
                    <div className='search-bar'>
                        <input name='search' type='text' value={this.state.search} />
                        <button>Search</button>
                        <button>Reset</button>
                    </div>
                    <div className='checkbox'> My Posts <input type='checkbox' checked /></div>
                </div>
            </div >
        )
    }
}

export default Dashboard