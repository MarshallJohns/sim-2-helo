import Axios from "axios";
import React, { Component } from "react";


class Form extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      imgUrl: "",
      content: "",
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handlePost = () => {
    const { title, imgUrl, content } = this.state;
    Axios.post(`/api/posts`, { title, imgUrl, content }).then(
      (res) => {
        this.handleReset();
        this.props.history.push("/dashboard");
      }
    );
  };

  handleReset = () => {
    this.setState({
      title: "",
      imgUrl: "",
      content: "",
    });
  };

  render() {
    const { title, imgUrl, content } = this.state;
    return (
      <div className="form">
        <div>
          Title:
          <input
            onChange={(e) => this.handleChange(e)}
            name="title"
            type="text"
            value={title}
          />
        </div>
        <img
          src={
            imgUrl
              ? imgUrl
              : "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT3f0jzlQxiDeJfx1BxwyCSAcMvygM3TvO05w&usqp=CAU"
          }
          alt="preview"
        />
        <div>
          image url:
          <input
            onChange={(e) => this.handleChange(e)}
            name="imgUrl"
            type="text"
            value={imgUrl}
          />
        </div>
        <div>
          content:
          <input
            onChange={(e) => this.handleChange(e)}
            name="content"
            type="text"
            value={content}
          />
        </div>
        <button onClick={() => this.handlePost()}>Post</button>
      </div>
    );
  }
}

export default Form;
