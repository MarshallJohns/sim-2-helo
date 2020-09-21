import Axios from "axios";
import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class Post extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      image: "",
      content: "",
      username: "",
      profilePic: "",
    };
  }

  componentDidMount() {
    Axios.get(`/api${this.props.location.pathname}`).then((res) => {
      console.log(res.data);
    });
  }

  render() {
    console.log(this.props.location.pathname);
    const { title, image, content, username, profilePic } = this.state;
    return (
      <div className="post">
        <h2>{title}</h2>
        <img src={image} alt="post" />
        <p>{content}</p>
        <h3>{username}</h3>
        <img src={profilePic} alt="user" />
      </div>
    );
  }
}
export default withRouter(Post);
