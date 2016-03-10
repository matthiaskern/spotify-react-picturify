"use strict";

import React from "react";
import Input from "./common/textInput";

export default class savePlaylist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInput: null
    };
    this._onChange = this._onChange.bind(this);
    this._onClick = this._onClick.bind(this);

  }

  _onChange(event){
    const userInput = event.target.value;
    this.setState({userInput: userInput});
  }
  _onClick(){
    if(this.state.userInput){
      this.props.handler(this.state.userInput);
    }
  }

  render() {
    return (
      <div>
        <Input label="Playlist Name" name="playlistName" onChange={this._onChange.bind(this)} value={this.state.userInput}/>
        <a href="#" onClick={this._onClick} className="button" style={{backgroundColor: "#5cb85c"}}>Save as Playlist</a>
      </div>
    );
  }
}
