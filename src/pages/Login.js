import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../assets/Login.css';
import { tokenThunk } from '../redux/actions';
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
      const { saveToken, history } = this.props;
      const userToken = await fetchToken();
      saveToken(userToken);
      return history.push('/quiz-game');
    }

    handleInputText = ({ target }) => {
      const { name, value } = target;

      this.setState({
        [name]: value,
      });
    }

    render() {
      const { email, name } = this.state;
      const validEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
      // Referência da validação do e-mail :
      // regex validação e-mail: https://pt.stackoverflow.com/questions/1386/express%C3%A3o-regular-para-valida%C3%A7%C3%A3o-de-e-mail
      const emailOk = validEmail.test(email);
      const nameOk = name.length > 0;
      const validation = nameOk && emailOk;

      return (
        <div>
          <form className="login-form">
            <label htmlFor="name-input">
              Nome:
              <input
                type="text"
                id="name-input"
                data-testid="input-player-name"
                name="name"
                value={ name }
                onChange={ this.handleInputText }
              />
            </label>
            <label htmlFor="login-input">
              E-mail:
              <input
                type="text"
                id="login-input"
                data-testid="input-gravatar-email"
                name="email"
                value={ email }
                onChange={ this.handleInputText }
              />
            </label>
            <button
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
          >
            Configurações
          </button>
        </div>
      );
    }
}

const mapDispatchToProps = (dispatch) => ({
  saveToken: (user) => dispatch(tokenThunk(user)),
});

Login.propTypes = {
  history: PropTypes.objectOf(PropTypes.any),
  saveToken: PropTypes.func,
}.isRequired;

export default connect(null, mapDispatchToProps)(Login);
