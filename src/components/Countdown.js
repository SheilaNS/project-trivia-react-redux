import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../assets/Countdown.css';
import { remainingPathColor } from '../assets/TimerFunction';

class Countdown extends Component {
  render() {
    const { contador } = this.props;
    return (
      <div className="base-timer">
        <svg className="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <g className="base-timer__circle">
            <circle className="base-timer__path-elapsed" cx="50" cy="50" r="45" />
            <path
              id="base-timer-path-remaining"
              strokeDasharray="283"
              className={ `base-timer__path-remaining ${remainingPathColor}` }
              d="
          M 50, 50
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0
        "
            />
          </g>
        </svg>
        <span id="base-timer-label" className="base-timer__label">
          {contador}
        </span>
      </div>
    );
  }
}

Countdown.propTypes = {
  contador: PropTypes.number,
}.isRequired;

export default connect()(Countdown);
