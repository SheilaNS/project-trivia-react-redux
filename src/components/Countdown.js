import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Countdown extends Component {
  render() {
    const { contador } = this.props;
    return (
      <span>
        {contador}
      </span>
    );
  }
}

Countdown.propTypes = {
  contador: PropTypes.number,
}.isRequired;

export default connect()(Countdown);
