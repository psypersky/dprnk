/* eslint-disable prefer-stateless-function */

import React from 'react';

class InputSearch extends React.Component {

  componentDidMount() {
    this.textInput.focus();
  }

  render() {
    return (
      <input
        ref={(input) => this.textInput = input}
        {...this.props}
      />
    );
  }
}

module.exports = InputSearch;
