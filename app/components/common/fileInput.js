"use strict";

import React from "react";

export default class Input extends React.Component{
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div>
        <label htmlFor={this.props.name}>{this.props.label}</label>
        <input type="file"
          name={this.props.name}
          className="form-control"
          placeholder={this.props.placeholder}
          ref={this.props.name}
          onChange={this.props.onChange}
          value={this.props.value} />
        <div className="input">{this.props.error}</div>
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
