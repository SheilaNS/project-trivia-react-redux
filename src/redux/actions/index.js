import { fetchQuiz, fetchToken } from '../../services/triviaAPI';

export const RECEIVE_TOKEN_SUCCESS = 'RECEIVE_TOKEN_SUCCESS';
export const RECEIVE_TOKEN_FAILURE = 'RECEIVE_TOKEN_FAILURE';

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
      console.log(tokenObj);
      await fetchQuiz(state);
    } catch (error) {
      dispatch(receiveTokenFailure(error));
    }
  }
);
