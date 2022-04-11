import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import logo from '../images/trivia.png';
import fetchGravatar from '../services/gravatarAPI';
import '../assets/Header.css';

class Header extends Component {
  render() {
    const { gravatarURL, playerName, playerScore } = this.props;
    return (
      <header className="header-container">
        <img className="header-logo-image" src={ logo } alt="trivia logo" />
        <div className="player-header-info">
          <img
            className="player-image"
            data-testid="header-profile-picture"
            src={ fetchGravatar(gravatarURL) }
            alt="player avatar"
          />
          <div className="header-player-data">
            <p className="header-player-name" data-testid="header-player-name">
              {playerName}
            </p>
            <p className="header-score">
              Pontuação:
              <span data-testid="header-score">{playerScore}</span>
            </p>
          </div>
        </div>
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
