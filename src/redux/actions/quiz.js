import { RECEIVE_QUIZ_FAILURE, RECEIVE_QUIZ_SUCCESS, REQUEST_QUIZ_API } from '.';
import { fetchQuiz } from '../../services/triviaAPI';

const requestQuizAPI = () => ({ type: REQUEST_QUIZ_API });

const receiveQuizSuccess = (quiz) => ({
  type: RECEIVE_QUIZ_SUCCESS,
  allQuestions: quiz.results,
});

const receiveQuizFailure = (quiz) => ({
  type: RECEIVE_QUIZ_FAILURE,
  quiz,
});

// export const quizThunk = (tokenPlayer) => (
//   async (dispatch) => {
//     const quizObj = await fetchQuiz(tokenPlayer);
//     const failureCode = 3;
//     try {
//       dispatch(receiveQuizSuccess(quizObj));
//       const state = getState(quizObj);
//       if (state.respose_code === failureCode) {
//         try {
//           dispatch(receiveQuizFailure(quizObj));
//         } catch (error) {
//           console.log(error);
//         }
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   }
// );

const quizThunk = (token) => async (dispatch) => {
  try {
    dispatch(requestQuizAPI());
    const questions = await fetchQuiz(token);
    return dispatch(receiveQuizSuccess(questions));
  } catch (error) {
    dispatch(receiveQuizFailure(error));
  }
};

export default quizThunk;
