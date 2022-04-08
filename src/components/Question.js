import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../assets/Question.css';
import { quizThunk } from '../redux/actions';

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
      this.handleTimeout();
    }

    handleTimeout = () => {
      const trintaSec = 30000;
      const oneSec = 1000;
      const interval = setInterval(() => {
        this.setState((previousState) => ({
          contador: previousState.contador - 1,
        }));
      }, oneSec);
      setTimeout(() => {
        this.setState({ next: false });
        this.handleClickAnswer();
        clearInterval(interval);
      }, trintaSec);
    }

    handleClickAnswer = () => {
      this.setState({
        correctClass: { border: '3px solid rgb(6, 240, 15)' },
        wrongClass: { border: '3px  solid red' },
        display: { display: '' },
        next: false,
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

      console.log(allAnswers);
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
                    {allAnswers.map((answer, index) => {
                      console.log(answer);
                      return (
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
                      );
                    })}
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
