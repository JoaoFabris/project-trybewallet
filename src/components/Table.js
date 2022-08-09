import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { removeGlobalState } from '../redux/actions';

class Table extends Component {
  handleDeleteClick = (expense) => {
    const { clearStore } = this.props;
    clearStore(expense);
  }

  render() {
    const { expenses } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        { expenses
          .map(({ id, value, description, method, tag, currency, exchangeRates }) => (
            <tbody key={ id }>
              <tr>
                <td>{description}</td>
                <td>{tag}</td>
                <td>{method}</td>
                <td>{Number(value).toFixed(2)}</td>
                <td>{exchangeRates[currency].name}</td>
                <td>{Number(exchangeRates[currency].ask).toFixed(2)}</td>
                <td>{(value * Number(exchangeRates[currency].ask)).toFixed(2)}</td>
                <td>Real</td>
                <td>
                  <button
                    data-testid="delete-btn"
                    id={ id }
                    onClick={ () => this.handleDeleteClick(id) }
                    type="button"
                  >
                    Excluir

                  </button>
                </td>
              </tr>
            </tbody>))}
      </table>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.any),
  clearStore: PropTypes.func,
}.isRequired;
const mapStateToProps = (state) => ({
  ...state.wallet,
});
const mapDispatchToProps = (dispatch) => ({
  clearStore: (clear) => dispatch(removeGlobalState(clear)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Table);
