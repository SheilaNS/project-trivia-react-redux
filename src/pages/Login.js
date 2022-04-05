import React, { Component } from 'react';
import '../assets/Login.css';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      name: '',
    };
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
      // Referência da validação do e-mail:
      // regex validação e-mail: https://pt.stackoverflow.com/questions/1386/express%C3%A3o-regular-para-valida%C3%A7%C3%A3o-de-e-mail
      const emailOk = validEmail.test(email);
      const nameOk = name.length > 0;
      const validation = nameOk && emailOk;

      return (
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
          >
            Play
          </button>
        </form>
      );
    }
}

export default Login;
