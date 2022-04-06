import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { quizThunk } from '../redux/actions';

class Question extends Component {
    state = {
      questionRender: {},
      allAnswers: [],
      correctAnswer: '',
      incorrectAnswers: [],
    }

    componentDidMount= async () => {
      const { getQuiz, tokenPlayer } = this.props;
      await getQuiz(tokenPlayer);
      const { quizResults } = this.props;
      const findIndex = quizResults.find((_question, index) => index === 0);
      this.setState({
        questionRender: findIndex,
        allAnswers: [...findIndex.incorrect_answers, findIndex.correct_answer],
        correctAnswer: findIndex.correct_answer,
        incorrectAnswers: [...findIndex.incorrect_answers],
      });
    }

    // Metodo para ramdomizar array:
    // https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    shuffleArray =(array) => {
      for (let i = array.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
      return array;
    }

    render() {
      const { questionRender, allAnswers, correctAnswer, incorrectAnswers } = this.state;
      const renderAnswers = this.shuffleArray(allAnswers);
      return (
        <div>
          {!questionRender
            ? <div>Caregando...</div>
            : (
              <div>
                <p
                  data-testid="question-category"
                >
                  {questionRender.category}
                </p>
                <p>{questionRender.type}</p>
                <p>{questionRender.difficulty}</p>
                <p
                  data-testid="question-text"
                >
                  Question:
                  {questionRender.question}
                </p>
                <div
                  data-testid="answer-options"
                >
                  Alternativas
                  {renderAnswers.map((answer, index) => (
                    answer === correctAnswer
                      ? (
                        <button
                          key={ index }
                          type="button"
                          value={ correctAnswer }
                          data-testid="correct-answer"
                        >
                          {correctAnswer}
                        </button>
                      )
                      : (
                        <button
                          type="button"
                          value={ incorrectAnswers }
                          data-testid={ `wrong-answer-${index}` }
                          key={ index }
                        >
                          {incorrectAnswers}
                        </button>
                      )
                  ))}
                </div>

              </div>
            )}
        </div>
      );
    }
}

const mapDispatchToProps = (dispatch) => ({
  getQuiz: (tokenPlayer) => dispatch(quizThunk(tokenPlayer)),
});

const mapStateToProps = (state) => ({
  quizResults: state.quiz.results,
  tokenPlayer: state.token,
  responseCode: state.quiz.response_code,
});

Question.propTypes = {
  quizResults: PropTypes.arrayOf(PropTypes.any),
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Question);
