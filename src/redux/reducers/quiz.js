import { RECEIVE_QUIZ_FAILURE, RECEIVE_QUIZ_SUCCESS, REQUEST_QUIZ_API } from '../actions';

const INITIAL_STATE = {
  // response_code: 3,
  // results: [],
  allQuestions: '',
};

const quiz = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_QUIZ_API:
    return state;
  case RECEIVE_QUIZ_SUCCESS:
    return {
      // response_code: action.quiz.response_code,
      // results: action.quiz.results,
      allQuestions: action.allQuestions,
    };
  case RECEIVE_QUIZ_FAILURE:
    return {
      ...state,
      error: action.error,
    };
  default:
    return state;
  }
};

export default quiz;
