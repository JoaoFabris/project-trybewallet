import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  sumValues = () => {
    const { expenses } = this.props;
    const sum = expenses.reduce((acc, curr) => (
      acc + (curr.exchangeRates[curr.currency].ask)
      * curr.value), 0).toFixed(2);
    // console.log(sum);
    return sum;
  };

  render() {
    const { userData: { email } } = this.props;
    return (
      <div>
        <header>
          <p data-testid="email-field">{ email }</p>
          <p data-testid="total-field">{this.sumValues()}</p>
          <p data-testid="header-currency-field">BRL</p>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userData: state.user,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  userData: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps)(Header);
