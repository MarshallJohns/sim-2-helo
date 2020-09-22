import Axios from "axios";
import React, { Component } from "react";
import { connect } from 'react-redux'

class Post extends Component {
  constructor() {
    super();
    this.state = {
      post: {}
    };
  }

  componentDidMount() {
    Axios.get(`/api${this.props.location.pathname}`).then((res) => {
      this.setState({
        post: res.data

      });
      console.log(res.data)
    });
  }

  handleDeletePost = () => {
    const { id } = this.state.post
    Axios.delete(`/api/posts/${id}`).then(res => {
      this.props.history.push('/dashboard')
    })
  }

  render() {
    const { title, image, content, username, profile_pic, author_id } = this.state.post;
    const { user_id } = this.props
    return (
      <div className="post">
        <h2>{title}</h2>
        <img src={image} alt="post" />
        <p>{content}</p>
        <h3>{username}</h3>
        <img src={profile_pic} alt="user" />
        {user_id === author_id ? <button onClick={() => this.handleDeletePost()}>Delete</button> : null}
      </div>
    );
  }
}
const mapStateToProps = reduxState => reduxState
export default connect(mapStateToProps)(Post);
