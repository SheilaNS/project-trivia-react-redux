import { fetchQuiz, fetchToken } from '../../services/triviaAPI';

// token types
export const RECEIVE_TOKEN_SUCCESS = 'RECEIVE_TOKEN_SUCCESS';
export const RECEIVE_TOKEN_FAILURE = 'RECEIVE_TOKEN_FAILURE';

// player types
export const CREATE_PLAYER = 'CREATE_PLAYER';
export const SAVE_PLAYER_SCORE = 'SAVE_PLAYER_SCORE';

// quiz types
export const RECEIVE_QUIZ_SUCCESS = 'RECEIVE_QUIZ_SUCCESS';
export const RECEIVE_QUIZ_FAILURE = 'RECEIVE_QUIZ_FAILURE';

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

export const savePlayerScore = (score) => ({
  type: SAVE_PLAYER_SCORE,
  points: score,
});

// quiz actions

export const receiveQuizSuccess = (quiz) => ({
  type: RECEIVE_QUIZ_SUCCESS,
  quiz,
});

export const receiveQuizFailure = (quiz) => ({
  type: RECEIVE_QUIZ_FAILURE,
  quiz,
});

export const quizThunk = (tokenPlayer) => (
  async (dispatch, getState) => {
    const quizObj = await fetchQuiz(tokenPlayer);
    const failureCode = 3;
    try {
      dispatch(receiveQuizSuccess(quizObj));
      const state = getState(quizObj);
      if (state.respose_code === failureCode) {
        try {
          dispatch(receiveQuizFailure(quizObj));
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
);
