import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Header from '../components/Header';

class Quiz extends Component {
  render() {
    return (
      <div>
        <Header />
        Quiz
      </div>
    );
  }
}

Quiz.propTypes = {
  history: PropTypes.objectOf(PropTypes.any),
}.isRequired;

export default Quiz;
