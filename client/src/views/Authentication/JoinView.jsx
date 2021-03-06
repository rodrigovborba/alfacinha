import React, { Component } from "react";
import Image from "react-bootstrap/Image";

import { join as joinService } from "../../services/authentication";

import "./style.css";

class AuthenticationJoinView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      username: "",
      aboutMe: "",
      email: "",
      password: "",
      // image: null,
      error: false
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    // this.handleFileChange = this.handleFileChange.bind(this);
    this.handleFormSubmission = this.handleFormSubmission.bind(this);
  }

  handleInputChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      ...this.state,
      [name]: value
    });
  }

  // handleFileChange(event) {
  //   console.dir(event.target.files);
  //   const file = event.target.files[0];
  //   this.setState({
  //     image: file
  //   });
  // }

  async handleFormSubmission(event) {
    event.preventDefault();
    const {
      email,
      password,
      username,
      name,
      /* image, */ aboutMe
    } = this.state;
    try {
      const user = await joinService({
        email,
        password,
        username,
        name,
        // image,
        aboutMe
      });
      this.props.changeAuthenticationStatus(user);
      this.props.history.push(`/`);
    } catch (error) {
      this.setState({ error: true });
      console.log(error);
    }
  }

  render() {
    window.scrollTo(0, 0);

    // const user = this.state.user;
    return (
      <div className="BgColor pt-5">
        <main className="pt-5 mx-5 text-center d-flex justify-content-center">
          <form
            onSubmit={this.handleFormSubmission}
            className="form-signin LoginJoinForm"
          >
            <Image
              fluid
              className="mb-4 LoginJoinImg"
              src="/images/alfacinha-logo1.png"
              alt=""
            />
            <label htmlFor="name" className="sr-only">
              Name
            </label>
            <input
              type="name"
              placeholder="Name"
              value={this.state.name}
              name="name"
              className="form-control mb-3"
              onChange={this.handleInputChange}
              required
            />
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <input
              type="email"
              placeholder="Email"
              value={this.state.email}
              name="email"
              className="form-control mb-3"
              onChange={this.handleInputChange}
              required
            />
            <label htmlFor="username" className="sr-only">
              Username
            </label>
            <input
              type="username"
              placeholder="Username"
              value={this.state.username}
              name="username"
              className="form-control mb-3"
              onChange={this.handleInputChange}
              required
            />
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              type="password"
              placeholder="Password"
              value={this.state.password}
              name="password"
              className="form-control mb-3"
              onChange={this.handleInputChange}
              required
            />
            <label htmlFor="name" className="sr-only">
              About Me
            </label>
            <textarea
              type="text"
              placeholder="Write something about yourself here"
              value={this.state.aboutMe}
              name="aboutMe"
              className="form-control mb-3"
              onChange={this.handleInputChange}
              required
            ></textarea>
            {/* <label htmlFor="image" className="sr-only">
            Image
          </label>
          <input
            type="file"
            placeholder="Profile Picture"
            name="image"
            className="form-control mb-3"
            onChange={this.handleFileChange}
          /> */}

            {this.state.error && (
              <div class="alert alert-danger" role="alert">
                Ops.. Email or username already exist!
              </div>
            )}
            <button className="btn btn-lg MyBtn btn-block mb-5">Join</button>
            {/* <p class="mt-5 mb-3 text-muted">&copy; 2019</p> */}
          </form>
        </main>
      </div>
    );
  }
}

export default AuthenticationJoinView;
