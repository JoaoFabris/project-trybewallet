const INITIAL_STATE = {
  email: '',
};

const user = (state = INITIAL_STATE, action) => {
  const { email } = action;
  switch (action.type) {
  case 'USER_DATA':
    return {
      ...state,
      ...email,
    };
  default:
    return state;
  }
};

export default user;
