import fetchAPI from '../../services/fecthAPIWallet';

export function userData(email) {
  return {
    type: 'USER_DATA',
    email,
  };
}

export function walletData(wallet) {
  return {
    type: 'WALLET_DATA',
    wallet,
  };
}

export const getCurrenciesAll = (payload) => ({
  type: 'GET_CURRENCIES_ALL',
  payload,
});

export const saveData = (payload) => ({
  type: 'SAVE_EXPENSE',
  payload,
});

export const removeGlobalState = (remove) => ({
  type: 'REMOVE_STATE',
  remove,
});

export function fetchAPIThunk() {
  return async (dispatch) => {
    try {
      const response = await fetchAPI();
      const removeUSDT = Object.keys(response).filter((coin) => coin !== 'USDT');
      dispatch(getCurrenciesAll(removeUSDT));
    } catch (error) {
      console.log(error);
    }
  };
}
