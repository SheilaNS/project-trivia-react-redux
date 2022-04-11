import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import { clearToken } from '../redux/actions/token';

class Feedback extends Component {
  state = {
    playAgain: false,
    ranking: false,
  }

  handleRakinBtn = () => {
    this.setState({ ranking: true });
  };

  handlePlayAgainBtn = () => {
    const { clearTokenPlayer } = this.props;
    clearTokenPlayer();
    this.setState({ playAgain: true });
  }

  render() {
    const { playerAssertions, playerName, playerScore } = this.props;
    const { ranking, playAgain } = this.state;
    const assertNumber = 3;

    return (
      <>
        {playAgain && <Redirect to="/" /> }
        {ranking && <Redirect to="ranking" />}
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
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ this.handlePlayAgainBtn }
        >
          Play again
        </button>
        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ this.handleRakinBtn }
        >
          Ranking
        </button>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  playerAssertions: state.player.assertions,
  playerName: state.player.name,
  playerScore: state.player.score,
});

const mapDispatchToProps = (dispatch) => ({
  clearTokenPlayer: () => dispatch(clearToken()),
});

Feedback.propTypes = {
  playerAssertions: PropTypes.number,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
