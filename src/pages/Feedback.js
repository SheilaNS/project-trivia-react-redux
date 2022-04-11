import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends Component {
  render() {
    const { playerAssertions, playerName, playerScore } = this.props;
    const assertNumber = 3;
    return (
      <>
        <Header />
        { playerAssertions >= assertNumber
          ? (
            <div className="feedback-text">
              <h2 data-testid="feedback-text">
                Well Done!
              </h2>
            </div>)
          : (
            <div className="feedback-text">
              <h2 data-testid="feedback-text">
                Could be better...
              </h2>
            </div>
          )}
        <div>
          <h3>Placar final</h3>
          <p>
            Nome do Jogador:
            <span>{playerName}</span>
          </p>
          <p>
            Perguntas corretas:
            <span data-testid="feedback-total-question">{Number(playerAssertions)}</span>
          </p>
          <p>
            Pontuação final:
          </p>
          <p data-testid="feedback-total-score">{Number(playerScore)}</p>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  playerAssertions: state.player.assertions,
  playerName: state.player.name,
  playerScore: state.player.score,
});

Feedback.propTypes = {
  playerAssertions: PropTypes.number,
}.isRequired;

export default connect(mapStateToProps)(Feedback);
