import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userData } from '../redux/actions';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      disabled: true,
    };
  }

  handlechange = ({ target: { name, value } }) => {
    this.setState({ [name]: value }, () => this.handleEmail());
  }

  handleEmail = () => {
    const { email, password } = this.state;
    const minNumber = 6;
    if (password.length >= minNumber && email.includes('@' && '.com')) {
      this.setState({ disabled: false });
    } else {
      this.setState({ disabled: true });
    }
  }

  handleClick = () => {
    const { dispatchUserData, history } = this.props;

    dispatchUserData(this.state);// Salva no estado da aplicação.
    history.push('/carteira');
  }

  render() {
    const { email, password, disabled } = this.state;
    return (
      <div>
        <h1>TrybeWallet</h1>
        <input
          type="email"
          data-testid="email-input"
          value={ email }
          name="email"
          onChange={ this.handlechange }
        />
        <input
          type="password"
          data-testid="password-input"
          minLength={ 6 }
          name="password"
          value={ password }
          onChange={ this.handlechange }
        />
        <button
          type="button"
          disabled={ disabled }
          onClick={ this.handleClick }
        >
          Entrar
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchUserData: (user) => dispatch(userData(user)),
});

Login.propTypes = {
  dispatchUserData: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
