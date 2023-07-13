import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { fetchAPIThunk, saveData } from '../redux/actions';
import fetchAPI from '../services/fecthAPIWallet';

class WalletForm extends React.Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      exchangeRates: '',
    };
  }

  async componentDidMount() {
    const { getCoins } = this.props;
    getCoins();
  }

  handleChange = ({ target }) => {
    const { name } = target;
    this.setState(({
      [name]: target.value,
    }));
  }

  handleClick = async () => {
    const { sendSaveData } = this.props;
    const { id } = this.state;
    const getExchangeRates = await fetchAPI();
    delete getExchangeRates.USDT;
    this.setState({
      exchangeRates: getExchangeRates,
    });
    sendSaveData(this.state);
    this.setState(
      { id: id + 1,
        value: '',
        description: '',
      },
    );
  }

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { currencies } = this.props;
    return (
      <>
        <form>
          <label htmlFor="expenses">
            Despesas
            <input
              data-testid="value-input"
              id="expenses"
              name="value"
              value={ value }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="description">
            Descrição
            <input
              data-testid="description-input"
              id="description"
              name="description"
              value={ description }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="options-coins">
            <select
              data-testid="currency-input"
              id="options-coins"
              name="currency"
              value={ currency }
              onChange={ this.handleChange }
            >
              {currencies.map((coin) => (
                <option
                  key={ coin }
                  value={ coin }
                >
                  {coin}
                </option>))}
            </select>
          </label>
          <label htmlFor="select-method">
            <select
              data-testid="method-input"
              id="select-method"
              name="method"
              value={ method }
              onChange={ this.handleChange }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="select-category">
            <select
              data-testid="tag-input"
              id="select-category"
              name="tag"
              value={ tag }
              onChange={ this.handleChange }
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
        </form>
        <button type="button" onClick={ this.handleClick }>Adicionar Despesas</button>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getCoins: () => dispatch(fetchAPIThunk()),
  sendSaveData: (payload) => dispatch(saveData(payload)),
});

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

WalletForm.propTypes = {
  getCoins: PropTypes.func.isRequired,
  sendSaveData: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
