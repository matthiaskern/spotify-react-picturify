"use strict";

import React from "react";

export default class DropZone extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null
    };
    this.prevent = this.prevent.bind(this);
    this.fileHandler = this.fileHandler.bind(this);
    this.clickHandler = this.clickHandler.bind(this);
  }

  prevent(event){
    event.stopPropagation();
    event.preventDefault();
  }

  fileHandler(event){
    event.preventDefault();
    let transfer = event.dataTransfer;
    let file;
    if(transfer) {
      file = transfer.files[0];
    }
    else{
      file = event.target.files[0];
    }
    this.props.handler(file);

  }

  clickHandler(){
    this.input.click();
  }

  render() {
    return (
      <div className="twelve columns">
        <input type="file" accept="image/*" style={{display: "none"}} onChange={this.fileHandler} ref={(ref) => this.input = ref}/>
        <div onDragEnter={this.prevent}
           onDragOver={this.prevent}
           onDrop={this.fileHandler}
           className="u-max-full-width"
           style={{ height: "50rem", background: "url(\"image-icon.png\") center no-repeat", margin: "0 auto", cursor: "pointer"}}
           onClick={this.clickHandler}>
        </div>
        <p style={{textAlign: "center"}} >Drag an Image(png or jpeg) here or just <a href="#" onClick={this.clickHandler}>click</a>!</p>
    </div>
    );
  }
}
