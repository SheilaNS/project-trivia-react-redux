import { RECEIVE_QUIZ_FAILURE, RECEIVE_QUIZ_SUCCESS } from '../actions';

const INITIAL_STATE = {
  response_code: 3,
  results: [],
};

const quiz = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case RECEIVE_QUIZ_SUCCESS:
    return {
      response_code: action.quiz.response_code,
      results: action.quiz.results,
    };
  case RECEIVE_QUIZ_FAILURE:
    return {
      ...state,
    };
  default:
    return state;
  }
};

export default quiz;
