import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import fetchGravatar from '../services/gravatarAPI';

class Header extends Component {
  render() {
    const { gravatarURL, playerName, playerScore } = this.props;
    const gravatarHash = fetchGravatar(gravatarURL);
    return (
      <div>
        <p data-testid="header-player-name">{`Jogador: ${playerName}`}</p>
        <p data-testid="header-score">{ `Pontuação: ${playerScore}` }</p>
        <img
          data-testid="header-profile-picture"
          src={ gravatarHash }
          alt={ gravatarURL }
        />
      </div>
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
