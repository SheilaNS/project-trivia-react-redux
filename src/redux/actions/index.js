import { fetchQuiz, fetchToken } from '../../services/triviaAPI';
// type constantes
export const RECEIVE_TOKEN_SUCCESS = 'RECEIVE_TOKEN_SUCCESS';
export const RECEIVE_TOKEN_FAILURE = 'RECEIVE_TOKEN_FAILURE';

export const CREATE_PLAYER = 'CREATE_PLAYER';

// token actions
export const receiveTokenSuccess = (token) => ({
  type: RECEIVE_TOKEN_SUCCESS,
  token,
});

export const receiveTokenFailure = (error) => ({
  type: RECEIVE_TOKEN_SUCCESS,
  error,
});

export const tokenThunk = () => (
  async (dispatch, getState) => {
    const tokenObj = await fetchToken();
    try {
      dispatch(receiveTokenSuccess(tokenObj));
      const state = getState(tokenObj);
      await fetchQuiz(state);
    } catch (error) {
      dispatch(receiveTokenFailure(error));
    }
  }
);
// player actions

export const createUserPlayer = ({ name, assertions, score, email }) => ({
  type: CREATE_PLAYER,
  name,
  assertions,
  score,
  email,
});
