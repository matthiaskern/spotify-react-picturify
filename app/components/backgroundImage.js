"use strict";

import React from "react";

export default class backgroundImage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let img = this.container;
    let file = this.props.image;
    img.file = file;
    let reader = new FileReader();
    reader.onload = (function(aImg) { return function(e) { aImg.src = e.target.result; }; })(img);
    reader.readAsDataURL(file);
    setTimeout(this.props.onImageLoad, 200);
  }

  render() {
    return (
      <img ref={(ref) => this.container = ref} style={{maxWidth:"250px", height:"250px"}}/>
    );
  }
}
