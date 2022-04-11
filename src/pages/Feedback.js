import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends Component {
  render() {
    const { getAssertions } = this.props;
    const assertNumber = 3;
    console.log(getAssertions);
    return (
      <>
        <Header />
        { getAssertions >= assertNumber
          ? (
            <div
              className="feedback-text"
            >
              <h2 data-testid="feedback-text">
                Well Done!
              </h2>
            </div>)
          : (
            <div
              className="feedback-text"
            >
              <h2 data-testid="feedback-text">
                Could be better...
              </h2>
            </div>)}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  getAssertions: state.player.assertions,
});

Feedback.propTypes = {
  getAssertions: PropTypes.number,
}.isRequired;

export default connect(mapStateToProps)(Feedback);
