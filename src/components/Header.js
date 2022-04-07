import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import fetchGravatar from '../services/gravatarAPI';
import '../assets/Header.css';

class Header extends Component {
  render() {
    const { gravatarURL, playerName, playerScore } = this.props;
    const gravatarHash = fetchGravatar(gravatarURL);
    return (
      <header className="header-container">
        <div className="player-data">
          <img
            className="player-avatar"
            data-testid="header-profile-picture"
            src={ gravatarHash }
            alt={ gravatarURL }
          />
          <div className="player-info">
            <p data-testid="header-player-name">
              Jogador:
              <span>{playerName}</span>
            </p>
            <p data-testid="header-score">
              Pontuação:
              <span>{playerScore}</span>
            </p>
          </div>
        </div>
        <h1 className="project-title">TRIVIA REACT-REDUX</h1>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  gravatarURL: state.player.gravatarEmail,
  playerName: state.player.name,
  playerScore: state.player.score,
});

Header.propTypes = {
  gravatarURL: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps)(Header);
