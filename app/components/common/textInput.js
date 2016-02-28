"use strict";

import React from "react";

export default class Input extends React.Component{
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div >
        <label htmlFor={this.props.name}>{this.props.label}</label>
        <input type="text"
          name={this.props.name}
          placeholder={this.props.placeholder}
          ref={this.props.name}
          onChange={this.props.onChange}
          value={this.props.value} />
        <div className="error">{this.props.error}</div>
      </div>
    );
  }
}

Input.propTypes = {
    name: React.PropTypes.string.isRequired,
    label: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func.isRequired,
    placeholder: React.PropTypes.string,
    value: React.PropTypes.string,
    error: React.PropTypes.string
};
