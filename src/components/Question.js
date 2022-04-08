import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../assets/Question.css';
import { quizThunk, savePlayerScore } from '../redux/actions';

class Question extends Component {
  state = {
    questionRender: {},
    allAnswers: [],
    correctAnswer: '',
    incorrectAnswers: [],
    wrongClass: {},
    correctClass: {},
    contador: 30,
    next: true,
    display: { display: 'none' },
    // totalPoints: 0,
  }

  componentDidMount= async () => {
    const { getQuiz, tokenPlayer } = this.props;
    await getQuiz(tokenPlayer);
    const { quizResults } = this.props;
    const findIndex = quizResults.find((_question, index) => index === 0);
    const answers = [...findIndex.incorrect_answers, findIndex.correct_answer];
    this.setState({
      questionRender: findIndex,
      allAnswers: this.shuffleArray(answers),
      correctAnswer: findIndex.correct_answer,
      incorrectAnswers: [...findIndex.incorrect_answers],
    });
    this.pageInterval();
  }

  pageInterval = () => {
    const oneSec = 1000;
    this.interval = setInterval(() => {
      const { contador } = this.state;
      if (contador > 0) {
        this.setState({
          contador: contador - 1,
        });
      } else {
        this.handleAnswers();
        clearInterval(this.interval);
      }
    }, oneSec);
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

  handleAnswers = () => {
    this.setState({
      correctClass: { border: '3px solid rgb(6, 240, 15)' },
      wrongClass: { border: '3px  solid red' },
      display: { display: '' },
      next: false,
    });
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
    this.handlePoints(target);
    this.handleAnswers();
    this.setState({
      contador: 0,
      display: { display: '' },
      next: false,
    });
  };

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
    const { questionRender,
      allAnswers,
      correctAnswer,
      incorrectAnswers,
      wrongClass,
      correctClass,
      contador,
      next,
      display,
    } = this.state;
    return (
      <div>
        {!questionRender
          ? (
            <div className="loading">
              <h1>Caregando... </h1>
            </div>
          )
          : (
            <div className="question-container">
              <span>
                {contador}
              </span>
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
  getQuiz: (tokenPlayer) => dispatch(quizThunk(tokenPlayer)),
  saveScore: (score) => dispatch(savePlayerScore(score)),
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
