import { GET_TOKEN_API, RECEIVE_TOKEN_FAILURE, RECEIVE_TOKEN_SUCCESS } from '../actions';

const INITIAL_STATE = '';

const token = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_TOKEN_API:
    return state;
  case RECEIVE_TOKEN_SUCCESS:
    return action.token;
  case RECEIVE_TOKEN_FAILURE:
    return action.error;
  default:
    return state;
  }
};

export default token;
