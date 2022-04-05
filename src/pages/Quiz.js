import PropTypes from 'prop-types';
import React, { Component } from 'react';

class Quiz extends Component {
  render() {
    return (
      <div>
        Quiz
      </div>
    );
  }
}

Quiz.propTypes = {
  history: PropTypes.objectOf(PropTypes.any),
}.isRequired;

export default Quiz;
