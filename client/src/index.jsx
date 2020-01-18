import React from 'react';
import ReactDOM from 'react-dom';
import Login from './components/login.jsx';
import Params from './components/fastParams.jsx';
import $ from 'jquery';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {profile: 'default', start: '12:00:00', length:8, canEat: 1};

    this.setProfile = this.setProfile.bind(this);
    this.setParams = this.setParams.bind(this);
    this.updateProfile = this.updateProfile.bind(this);
    this.canEat = this.canEat.bind(this);

    window.setInterval(this.canEat, 10);
  }

  setProfile(name) {
    var newProfile = document.getElementById('profileInput').value;
    this.setState(state => ({
      profile: newProfile
    }), this.updateProfile);
  }

  setParams(start, length) {
    this.setState(state => ({
      start: start,
      length: length
    }), this.updateProfile);
  }

  updateProfile() {
    var that = this;
    $.ajax({
      url:'http://localhost:3000/profile',
      method:'POST',
      data: that.state
    }).done(function(data){
      console.log('updated profile');
      // var newData = JSON.parse(data);
      // if (newData.start){
      //   that.setState(state => ({
      //     start:newData.start
      //   }));
      // }
      // if (newData.length){
      //   that.setState(state => ({
      //     length:newData.length
      //   }));
      // }
    });
  }

  canEat() {
    var start = this.state.start;
    var hours = +start.substring(0,2);
    var mins = +start.substring(3,5);
    var length = +this.state.length;

    var now = new Date();
    var fastingStart = new Date().setHours(hours,mins,0,0);
    var fastingEnd = new Date().setHours(hours+length,mins,0,0);

    this.setState(state => ({
      canEat: now >= fastingStart && now <= fastingEnd
    }));
  }

  render() {
    return (
      <div>
        <Login setProfile = {this.setProfile} profile = {this.state.profile}/>
        <Params setParams = {this.setParams} start = {this.state.start} length = {this.state.length} canEat = {this.state.canEat}/>
      </div>
    )
  }
}

ReactDOM.render(
  <App />, document.getElementById('appContainer')
)