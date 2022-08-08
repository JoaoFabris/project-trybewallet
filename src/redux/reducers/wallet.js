// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  id: 0,
  editor: false,
};
const walletUser = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case 'GET_CURRENCIES_ALL':
    return {
      ...state,
      currencies: payload,
    };
  case 'SAVE_EXPENSE':
    return {
      ...state,
      expenses: [...state.expenses, payload],
    };
  default:
    return state;
  }
};
export default walletUser;
