import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import { clearToken } from '../redux/actions/token';
import '../assets/Feedback.css';

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
        <div className="ranking-container">
          <h3 className="ranking-title">Placar final</h3>
          <p className="ranking-paragraph">
            Nome do Jogador:
            <span className="ranking-span">{playerName}</span>
          </p>
          <p className="ranking-paragraph">
            Perguntas corretas:
            <span
              data-testid="feedback-total-question"
              className="ranking-span"
            >
              {Number(playerAssertions)}
            </span>
          </p>
          <p className="ranking-paragraph">
            Pontuação final:
            <span
              data-testid="feedback-total-score"
              className="ranking-span"
            >
              {Number(playerScore)}
            </span>
          </p>
        </div>
        <button
          className="btn-play-again"
          type="button"
          data-testid="btn-play-again"
          onClick={ this.handlePlayAgainBtn }
        >
          Play again
        </button>
        <button
          className="btn-ranking"
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
