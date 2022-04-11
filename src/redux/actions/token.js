import { fetchToken } from '../../services/triviaAPI';
import { GET_TOKEN_API,
  RECEIVE_TOKEN_SUCCESS,
  RECEIVE_TOKEN_FAILURE,
  CLEAR_TOKEN } from '.';

const requestTokenAPI = () => ({ type: GET_TOKEN_API });

const receiveTokenSuccess = (token) => ({
  type: RECEIVE_TOKEN_SUCCESS,
  token,
});

const receiveTokenFailure = (error) => ({
  type: RECEIVE_TOKEN_FAILURE,
  error,
});

export const clearToken = () => ({
  type: CLEAR_TOKEN,
});

// export const tokenThunk = () => (
//   async (dispatch, getState) => {
//     const tokenObj = await fetchToken();
//     try {
//       dispatch(receiveTokenSuccess(tokenObj));
//       const state = getState(tokenObj);
//       await fetchQuiz(state);
//     } catch (error) {
//       dispatch(receiveTokenFailure(error));
//     }
//   }
// );

export const tokenThunk = () => async (dispatch) => {
  try {
    dispatch(requestTokenAPI());
    const token = await fetchToken();
    return dispatch(receiveTokenSuccess(token));
  } catch (error) {
    dispatch(receiveTokenFailure(error));
  }
};
