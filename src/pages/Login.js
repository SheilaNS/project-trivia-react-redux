import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import '../assets/Login.css';
import { createUserPlayer } from '../redux/actions/player';
import { tokenThunk } from '../redux/actions/token';
import fetchGravatar from '../services/gravatarAPI';
import { fetchToken } from '../services/triviaAPI';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      name: '',
    };
  }

  handleSettings = () => {
    const { history } = this.props;
    return history.push('/settings');
  }

  handleLogin = async () => {
    const { saveToken, saveUserData } = this.props;
    saveUserData(this.state);
    const userToken = await fetchToken();
    fetchGravatar();
    saveToken(userToken);
  }

    handleInputText = ({ target }) => {
      const { name, value } = target;

      this.setState({
        [name]: value,
      });
    }

    render() {
      const { email, name } = this.state;
      const { tokenPlayer } = this.props;
      // Referência da validação do e-mail :
      // regex validação e-mail: https://pt.stackoverflow.com/questions/1386/express%C3%A3o-regular-para-valida%C3%A7%C3%A3o-de-e-mail
      const validEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
      const emailOk = validEmail.test(email);
      const nameOk = name.length > 0;
      const validation = nameOk && emailOk;
      return (
        <>
          {tokenPlayer && <Redirect to="quiz-game" />}
          <div>
            <form className="login-form">
              <label className="login-label" htmlFor="name-input">
                <input
                  className="login-input"
                  type="text"
                  id="name-input"
                  data-testid="input-player-name"
                  name="name"
                  value={ name }
                  onChange={ this.handleInputText }
                  placeholder="Nome"
                />
              </label>
              <label className="login-label" htmlFor="login-input">
                E-mail:
                <input
                  className="login-input"
                  type="text"
                  id="login-input"
                  data-testid="input-gravatar-email"
                  name="email"
                  value={ email }
                  onChange={ this.handleInputText }
                  placeholder="E-mail"
                />
              </label>
              <button
                className="btn-play"
                type="button"
                data-testid="btn-play"
                disabled={ !validation }
                onClick={ this.handleLogin }
              >
                Play
              </button>
            </form>
            <button
              type="button"
              onClick={ this.handleSettings }
              data-testid="btn-settings"
              className="btn-settings"
            >
              Configurações
            </button>
          </div>

        </>

      );
    }
}

const mapDispatchToProps = (dispatch) => ({
  saveToken: () => dispatch(tokenThunk()),
  saveUserData: (userData) => dispatch(createUserPlayer(userData)),
});

const mapStateToProps = (state) => ({
  tokenPlayer: state.token,
});

Login.propTypes = {
  history: PropTypes.objectOf(PropTypes.any),
  saveToken: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Login);
