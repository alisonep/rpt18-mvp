import React from 'react';

class Params extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      start: props.start,
      length: props.length
    }

    this.onInputChange = this.onInputChange.bind(this);
    this.setParams = this.setParams.bind(this);
  }

  onInputChange(input) {
    var newState = {};
    newState[input.target.id] = input.target.value;
  
    this.setState(newState);
  }

  setParams() {
    this.props.setParams(this.state.start, this.state.length);
  }

  render() {
    var eatMessage = this.props.canEat ?  'YOU CAN EAT :)' : 'YOU CANT EAT :(';
    var eatID = this.props.canEat ?  'canEat' : 'cantEat';
    return (
      <div id="paramContainer">
  <div id="fieldHeader">Start of Eating Window</div><input id="start" type="time" onChange = {this.onInputChange} value={this.state.start}></input>
        <div id="fieldHeader">Eating Window Length</div><input id="length" type="number" onChange = {this.onInputChange} value={this.state.length}></input>
        <button onClick={this.setParams}>Set Parameters</button>
      <div id={eatID}>
        {eatMessage}
      </div>
      </div>
    );
  }
}

export default Params;