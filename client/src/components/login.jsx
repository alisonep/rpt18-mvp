import React from 'react';

class Login extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      profile: props.profile
    }

    this.setProfile = this.setProfile.bind(this);
    this.onProfileChange = this.onProfileChange.bind(this);
  }

  onProfileChange(input) {
    this.setState({
      profile:input.target.value
    });
  }

  setProfile() {
    this.props.setProfile(this.state.profile);
  }

  render() {
    return (
      <div id="loginContainer">
        <input id="profileInput" value={this.state.profile} onChange={this.onProfileChange}></input>
        <button onClick={this.props.setProfile}>Set Profile</button>
      </div>
    );
  }
}

export default Login;