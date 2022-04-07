import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { quizThunk } from '../redux/actions';
import '../assets/Question.css';

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
            ? (
              <div className="loading">
                <h1>Caregando...</h1>
              </div>
            )
            : (
              <div className="question-container">
                <p
                  className="question-category"
                  data-testid="question-category"
                >
                  Categoria:
                  <span>{questionRender.category}</span>
                </p>
                <p
                  className="question-type"
                >
                  Tipo:
                  <span>{questionRender.type}</span>
                </p>
                <p
                  className="question-difficulty"
                >
                  Dificuldade:
                  <span>{questionRender.difficulty}</span>
                </p>
                <p
                  className="question-question"
                >
                  Pergunta:
                  <span data-testid="question-text">{questionRender.question}</span>
                </p>
                <div
                  className="options-container"
                >
                  <p className="options-title">
                    Alternativas:
                  </p>
                  <div className="button-container" data-testid="answer-options">
                    {renderAnswers.map((answer, index) => (
                      answer === correctAnswer
                        ? (
                          <button
                            className="correct-one"
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
                            className="wrong-one"
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
