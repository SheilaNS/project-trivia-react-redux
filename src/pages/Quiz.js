import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Question from '../components/Question';

class Quiz extends Component {
  render() {
    return (
      <div>
        <Header />
        <Question />
      </div>
    );
  }
}

Quiz.propTypes = {
  history: PropTypes.objectOf(PropTypes.any),
}.isRequired;

export default connect()(Quiz);
