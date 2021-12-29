import React, { Component } from "react";
import { getCurrentUserProfile } from "../../services/userService";

class Profile extends React.Component {
  state = { user: {} };
  async componentDidMount() {
    const { data: user } = await getCurrentUserProfile();
    this.setState({ user: user });
  }
  render() {
    const { user } = this.state;
    return <div style={{ marginTop: "20rem" }}>{user.email}</div>;
  }
}

export default Profile;
