"use strict";

import React from "react";
import HomePage from "./homePage";


export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container" style={{marginTop: "3rem"}}>
        <div className="row" style={{textAlign: "center"}}>
          <h1><strong>Picturify</strong></h1>
          <h3>Upload an image and get a playlist in return</h3>
          <HomePage/>
        </div>
      </div>
    );
  }
}
