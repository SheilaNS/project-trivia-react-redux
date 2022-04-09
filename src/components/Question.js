import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../assets/Question.css';
import { savePlayerScore } from '../redux/actions';

class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allAnswers: [],
      correctAnswer: '',
      incorrectAnswers: [],
      wrongClass: {},
      correctClass: {},
      contador: 30,
      next: true,
      display: { display: 'none' },
      questionIndex: 0,
      // totalPoints: 0,
    };
  }

  componentDidMount = () => {
    const { question } = this.props;
    console.log(question);
    const answers = [question.incorrect_answers, question.correct_answer];
    this.setState({
      allAnswers: this.shuffleArray(answers),
      correctAnswer: question.correct_answer,
      incorrectAnswers: question.incorrect_answers,
    });
  }

  handleDificulty = (question) => {
    let questionPoint = 0;
    const hard = 3;
    const medium = 2;
    const easy = 1;
    if (question.difficulty === 'hard') {
      questionPoint = hard;
      return questionPoint;
    }
    if (question.difficulty === 'medium') {
      questionPoint = medium;
      return questionPoint;
    }
    questionPoint = easy;
    return questionPoint;
  }

  handlePoints = ({ value }) => {
    const { contador, correctAnswer, questionRender } = this.state;
    const { saveScore } = this.props;
    const questionPoint = this.handleDificulty(questionRender);
    const ten = 10;
    if (value === correctAnswer) {
      const score = ten + (contador * questionPoint);
      saveScore(score);
    }
  }

  handleClickAnswer = ({ target }) => {
    const { handleAnswers } = this.props;
    this.handlePoints(target);
    handleAnswers();
    this.setState({
      contador: 0,
      display: { display: '' },
      next: false,
    });
  };

  handleNextQuestion = () => {
    this.setState((previousState) => ({
      questionIndex: previousState.questionIndex + 1,
    }));
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
    const {
      allAnswers,
      correctAnswer,
      incorrectAnswers,
      wrongClass,
      correctClass,
      next,
      display,
    } = this.state;
    const { question } = this.props;
    console.log(allAnswers);
    return (
      <div>
        {!question
          ? (
            <div className="loading">
              <h1>Caregando... </h1>
            </div>
          )
          : (
            <div className="question-container">
              <p
                className="question-category"
                data-testid="question-category"
              >
                Categoria:
                <span>{question.category}</span>
              </p>
              <p
                className="question-type"
              >
                Tipo:
                <span>{question.type}</span>
              </p>
              <p
                className="question-difficulty"
              >
                Dificuldade:
                <span>{question.difficulty}</span>
              </p>
              <p
                className="question-question"
              >
                Pergunta:
                <span data-testid="question-text">{question.question}</span>
              </p>
              <div
                className="options-container"
              >
                <p className="options-title">
                  Alternativas:
                </p>
                <div className="button-container" data-testid="answer-options">
                  {allAnswers.map((answer, index) => (
                    answer === correctAnswer
                      ? (
                        <button
                          style={ correctClass }
                          key={ index }
                          type="button"
                          value={ answer }
                          data-testid="correct-answer"
                          onClick={ this.handleClickAnswer }
                          disabled={ !next }
                        >
                          {answer}
                        </button>
                      )
                      : (
                        <button
                          style={ wrongClass }
                          type="button"
                          value={ answer }
                          data-testid={ `wrong-answer-${incorrectAnswers.length}` }
                          key={ index }
                          onClick={ this.handleClickAnswer }
                          disabled={ !next }
                        >
                          {answer}
                        </button>
                      )
                  ))}
                  <button
                    className="btn-next"
                    type="button"
                    disabled={ next }
                    data-testid="btn-next"
                    style={ display }
                    onClick={ this.handleNextQuestion }
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveScore: (score) => dispatch(savePlayerScore(score)),
});

Question.propTypes = {
  question: PropTypes.objectOf(PropTypes.any),
}.isRequired;

export default connect(null, mapDispatchToProps)(Question);
