// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  id: 0,
  editor: false,
};

const walletUser = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'GET_CURRENCIES_ALL':
    return {
      ...state,
      currencies: action.payload,
    };
  case 'SAVE_EXPENSE':
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  case 'REMOVE_STATE':
    return {
      ...state,
      expenses: state.expenses.filter((expense) => expense.id !== action.remove),
    };
  default:
    return state;
  }
};
export default walletUser;
